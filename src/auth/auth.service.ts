import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      const error: any = new Error('Email already registered');
      error.code = 'P2002';
      throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return { user };
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      this.logger.warn(`Login attempt with unregistered email: ${dto.email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Incorrect password attempt for email: ${dto.email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '2h',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      });

      // ✅ Cookie settings untuk development (localhost)
      const cookieOptions = {
        httpOnly: true,
        sameSite: 'lax' as const, // Ubah dari 'none' ke 'lax'
        secure: false, // Ubah ke false untuk development
        path: '/',
      };

      res.cookie('access_token', accessToken, {
        ...cookieOptions,
        maxAge: 2 * 60 * 60 * 1000, // 2 jam
      });

      res.cookie('refresh_token', refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      });

      this.logger.log(`Successful login: ${user.email}`);
      this.logger.debug(`Access token issued, length: ${accessToken.length}`);
      this.logger.debug(`Refresh token issued, length: ${refreshToken.length}`);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      this.logger.error(`JWT generation failed: ${error.message}`);
      throw new InternalServerErrorException('Token generation failed');
    }
  }

  async getMe(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async refresh(refreshToken: string, res: Response) {
    try {
      if (!refreshToken || typeof refreshToken !== 'string') {
        throw new UnauthorizedException('Refresh token format invalid');
      }

      const payload = await this.jwtService.verifyAsync(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        this.logger.warn(`Refresh failed: User not found for token payload ID ${payload.id}`);
        throw new UnauthorizedException('User not found');
      }

      const newAccessToken = await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        { expiresIn: '2h' },
      );

      // ✅ Set ulang access token cookie
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        sameSite: 'lax' as const,
        secure: false,
        path: '/',
        maxAge: 2 * 60 * 60 * 1000, // 2 jam
      });

      this.logger.log(`Access token refreshed for: ${user.email}`);
      return {
        access_token: newAccessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      this.logger.error(`Refresh token error: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const { password: _pass, ...result } = user;
    return result;
  }
}