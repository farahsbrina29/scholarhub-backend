import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

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
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.authService.login(dto);

      if (!result) {
        throw new UnauthorizedException('Invalid credentials');
      }

      this.logger.log(`${result.user.role} login: ${dto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Login failed');
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refresh_token: string }) {
    try {
      if (!body.refresh_token) {
        throw new UnauthorizedException('Refresh token required');
      }

      const result = await this.authService.refresh(body.refresh_token);

      if (!result) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return result;
    } catch (error) {
      this.logger.error(`Refresh failed: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Token refresh failed');
    }
  }
}
