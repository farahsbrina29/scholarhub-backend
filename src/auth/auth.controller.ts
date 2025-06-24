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
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user.decorator'; // custom decorator

import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({
    description: 'User registered successfully',
  })
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
  @ApiOperation({ summary: 'Login pengguna' })
  @ApiOkResponse({
    description: 'Login berhasil.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login successful' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                email: { type: 'string', example: 'user@example.com' },
                name: { type: 'string', example: 'Farah Sabrina' },
                role: { type: 'string', example: 'USER' },
              },
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Gagal login karena kredensial tidak valid.',
  })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.authService.login(dto, res);
      if (result?.user) {
        this.logger.log(`${result.user.role} login: ${dto.email}`);
        return {
          message: 'Login successful',
          user: result.user,
        };
      } else {
        throw new UnauthorizedException('Login failed - invalid response');
      }
    } catch (error) {
      this.logger.error(`Login failed for ${dto.email}: ${error.message}`);
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Login failed');
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Req() request: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const refreshToken =
        request.cookies?.refresh_token ||
        request.headers.authorization?.replace('Bearer ', '') ||
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
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Token refresh failed');
    }
  }

  
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiOkResponse({
    description: 'User data retrieved successfully',
  })
  async getMe(@GetUser() user: any) {
    return {
      message: 'User data retrieved successfully',
      user,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
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
  @ApiOperation({ summary: 'Check auth status' })
  async checkAuthStatus(@Req() request: Request) {
    const accessToken = request.cookies?.access_token;
    const refreshToken = request.cookies?.refresh_token;

    return {
      isAuthenticated: !!(accessToken || refreshToken),
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    };
  }
}
