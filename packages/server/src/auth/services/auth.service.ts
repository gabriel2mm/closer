import { HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "../../users/models/dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../../users/services/user.service";
import { User } from "../../users/models/entity/user.entity";
import { UserMapper } from "../../users/models/mapper/user.mapper";
import { UserHttpException } from "../../users/exceptions/user-http.exception";
import { AuthDto } from "../models/auth.dto";
import { RegisterUserDto } from "../models/register-user.dto";
import { ProfileService } from "@server/users/services/profile.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    private readonly secret: string | undefined;
    private readonly secretRefreshToken: string | undefined;

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly profileService: ProfileService
    ) {
        this.secret = process.env.JWT_SECRET;
        this.secretRefreshToken = process.env.JWT_REFRESH_SECRET;
    }

    async validateUser(email: string, password: string): Promise<UserDto | null> {
        const user = (await this.userService.getUserByEmail(email)) as User;
        if (!user || !user.active) {
            throw new UserHttpException('Acesso negado', HttpStatus.BAD_REQUEST);
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword)
            throw new UserHttpException('Acesso negado', HttpStatus.BAD_REQUEST);

        if (user && comparePassword) {
            return UserMapper.toDto(user);
        }

        throw new UserHttpException('Acesso negado', HttpStatus.BAD_REQUEST);
    }

    async login(auth: AuthDto) {
        const userFromService = (await this.userService.getUserByEmail(auth.email)) as User;
        const userDto = UserMapper.toDto(userFromService);
        const payload = { email: userDto.email, sub: userDto._id, permissions: userFromService.profile?.permissions.map(p => p.description) };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.secret, expiresIn: '30s' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '2h', secret: this.secretRefreshToken }),
        };
    }

    async refreshToken(email: string, refresh_token: string) {
        const user = await this.userService.getUserByEmail(email);

        if (!user || !user.active)
            throw new UserHttpException('Acesso negado', HttpStatus.BAD_REQUEST);

        const userDto = UserMapper.toDto(user);
        const payload = { email: user.email, sub: userDto._id, permissions: user.profile?.permissions.map(p => p.description) };

        const verify = await this.jwtService.verifyAsync(refresh_token, { secret: this.secretRefreshToken });
        if (!verify)
            throw new UserHttpException('Acesso negado', HttpStatus.BAD_REQUEST);

        return {
            access_token: this.jwtService.sign(payload, { secret: this.secret, expiresIn: '60s' }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '1d', secret: this.secretRefreshToken }),
        };
    }

    async singUp(registerUserDto: RegisterUserDto) {
        const user = new User();
        Object.assign(user, registerUserDto);
        user.active = true;
        user.contentCreator = false;
        user.avatarName = 'default';
        const profile = await this.profileService.getProfileByName('user');
        if (profile)
            user.profile = profile;

        return this.userService.create(user);
    }
}