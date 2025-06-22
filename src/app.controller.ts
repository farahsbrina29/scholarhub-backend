import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginDto } from './auth/dto/login.dto';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
}