import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {

	constructor(){
        const secret = process.env.JWT_REFRESH_SECRET;
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: secret,
            ignoreExpiration: false, 
			passReqToCallback: true,
        })
    }

    async validate(req: Request, payload : any) : Promise<any>{ 
        const refreshToken = req.body?.refresh_token;
    	return { ...payload, refreshToken };
    }
};
