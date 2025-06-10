import { 
  Injectable, 
  UnauthorizedException, 
  ConflictException,
  InternalServerErrorException,
  Logger 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService
  ) {}

  async register(data: RegisterDto) {
    try {
      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({ 
        where: { email: data.email } 
      });
      
      if (existingUser) {
        throw new ConflictException('Email already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);
      
      // Create user
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
        }
      });

      this.logger.log(`User registered successfully: ${user.email}`);
      
      return { 
        message: 'User registered successfully', 
        user 
      };
    } catch (error) {
      this.logger.error(`Registration failed for ${data.email}:`, error.message);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(data: LoginDto) {
    try {
      this.logger.log(`Login attempt for: ${data.email}`);

      // Find user by email
      const user = await this.prisma.user.findUnique({ 
        where: { email: data.email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          role: true,
        }
      });

      if (!user) {
        this.logger.warn(`Login failed - user not found: ${data.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      
      if (!isPasswordValid) {
        this.logger.warn(`Login failed - invalid password: ${data.email}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      const payload = { 
        sub: user.id, // standard JWT claim
        id: user.id, 
        email: user.email, 
        role: user.role 
      };
      
      const token = await this.jwtService.signAsync(payload);

      this.logger.log(`Login successful for: ${user.email}`);

      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      };
    } catch (error) {
      this.logger.error(`Login failed for ${data.email}:`, error.message);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Login failed');
    }
  }
}