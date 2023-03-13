import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'Admin create a course with maximum capacity' })
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    /* @UseGuards(AuthGuard('client'))
    
    @Post('client')
    async client(@Request() req) {
        return this.authService.login(req.user);
    }*/
}
