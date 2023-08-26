import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { AuthService } from "@server/auth/services/auth.service";
import { UserModule } from "@server/users/user.module";
import { AuthController } from "./controllers/auth.controller";

@Module({
    imports: [
        PassportModule.register({
            defaultStrateg: 'local'
        }),
        JwtModule.register({}),
        UserModule.register()
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        RefreshTokenStrategy,
        JwtStrategy,
        LocalStrategy,
    ],
    exports: [
        AuthService,
        RefreshTokenStrategy,
        JwtStrategy,
        LocalStrategy,
    ]
})
export class AuthModule {

}
