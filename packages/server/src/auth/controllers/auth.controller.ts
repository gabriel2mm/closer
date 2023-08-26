import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { RefreshTokenAuthGuard } from "../guards/refresh-token.guard";
import { Request } from "express";
import { User } from "@server/users/models/entity/user.entity";
import { AuthDto } from "../models/auth.dto";
import { RegisterUserDto } from "../models/register-user.dto";
import { PasswordRecoveryDto } from "../models/password-recovery.dto";
import { PasswordRecoveryService } from "@server/users/services/password-recovery.service";
import { TokenRecoveryDto } from "@server/users/models/dto/token-recovery.dto";

@Controller('/api/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly passwordRecoveryService: PasswordRecoveryService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() body: AuthDto) {
        return this.authService.login(body);
    }

    @UseGuards(RefreshTokenAuthGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Req() request: Request) {
        const user = request.user as User;
        return this.authService.refreshToken(user.email, request.body.refresh_token);
    }

    @Post('sign-up')
    @HttpCode(201)
    async signUp(@Body() registerUser: RegisterUserDto){
        return this.authService.singUp(registerUser);
    }

    @Post('create-recovery')
    @HttpCode(201)
    async passwordRecovery(@Body() passwordRecovery: PasswordRecoveryDto){
        return this.passwordRecoveryService.createRecovery(passwordRecovery);
    }

    @Post('validate-recovery')
    @HttpCode(200)
    async validateRecovery(@Body() tokenRecoveryDto: TokenRecoveryDto){
        return this.passwordRecoveryService.validateRecovery(tokenRecoveryDto);
    }

}