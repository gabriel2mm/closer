import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){

    constructor(){
        const secret = process.env.JWT_SECRET;
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, 
            secretOrKey: secret
        })
    }

    async validate(payload : any) : Promise<any>{ 
        return { id: payload.sub, email: payload.email, permissions: payload.permissions};
    }
}