import {
  Get,
  Req,
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

// 👇 Tambahan penting untuk role guard
import { Roles } from './roles.decorator';
import { Role } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    try {
      const result = await this.authService.register(dto);
      return {
        message: 'User registered successfully',
        user: result.user,
      };
    } catch (error) {
      this.logger.error(`Register error: ${error.message}`);
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.authService.login(dto, res);
      if (result && result.user) {
        this.logger.log(`${result.user.role} login: ${dto.email}`);
      } else {
        throw new UnauthorizedException('Login failed - invalid response');
      }

      return {
        message: 'Login successful',
        user: result.user,
      };
    } catch (error) {
      this.logger.error(`Login failed for ${dto.email}: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Login failed');
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken = request.cookies?.refresh_token ||
        (request.headers.authorization?.startsWith('Bearer ') ? request.headers.authorization.slice(7) : undefined) ||
        request.body?.refresh_token;

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token required');
      }

      const result = await this.authService.refresh(refreshToken, res);
      return {
        message: 'Token refreshed successfully',
        user: result.user,
      };
    } catch (error) {
      this.logger.error(`Refresh failed: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Token refresh failed');
    }
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() request: Request) {
    try {
      const accessToken = request.cookies?.access_token;
      if (!accessToken) throw new UnauthorizedException('Access token not found');

      const user = await this.authService.getMe(accessToken);
      return {
        message: 'User data retrieved successfully',
        user,
      };
    } catch (error) {
      this.logger.error(`Get me failed: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get user data');
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      path: '/',
    };

    res.clearCookie('access_token', cookieOptions);
    res.clearCookie('refresh_token', cookieOptions);
    this.logger.log('User logged out successfully');

    return {
      message: 'Logout successful',
    };
  }

  @Get('status')
  @HttpCode(HttpStatus.OK)
  async checkAuthStatus(@Req() request: Request) {
    const accessToken = request.cookies?.access_token;
    const refreshToken = request.cookies?.refresh_token;

    return {
      isAuthenticated: !!(accessToken || refreshToken),
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    };
  }

  
  @Get('admin-only')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN) 
  @HttpCode(HttpStatus.OK)
  async adminOnlyEndpoint() {
    return {
      message: 'This route is only accessible by ADMIN',
    };
  }
}
