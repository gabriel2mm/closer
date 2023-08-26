import { HttpStatus, Injectable } from "@nestjs/common";
import { Recovery } from "../models/entity/recovery.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { PasswordRecoveryDto } from "@server/auth/models/password-recovery.dto";
import { JwtService } from "@nestjs/jwt";
import { RecoveryDto } from "../models/dto/recovery.dto";
import { RecoveryHttpException } from "../exceptions/recovery-http.exception";
import { UserMapper } from "../models/mapper/user.mapper";
import { TokenRecoveryDto } from "../models/dto/token-recovery.dto";
import * as moment from 'moment';


@Injectable()
export class PasswordRecoveryService {

    private static readonly TOKEN_EXPIRATION_MINUTES = 5;
    private static readonly MESSAGE_PASSWORD_CHANGED: string = "Senha alterada com sucesso!";
    private static readonly MESSAGE_RECOVERY: string = "Caso possua cadastro conosco, você receberá um e-mail com maiores informações.";

    constructor(
        @InjectModel(Recovery.name) private readonly repository: Model<Recovery>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async createRecovery(passwordRecoveryDto: PasswordRecoveryDto): Promise<any> {
        //TODO: Enviar email com o token
        const user = await this.userService.getUserByEmail(passwordRecoveryDto.email);
        if (user) {
            const secret_public = process.env.JWT_PUBLIC_SESSION;
            const token = this.jwtService.sign({}, { secret: secret_public, expiresIn: '5M' });
            const recovery: Recovery = { email: user.email, token, valid: moment().add(PasswordRecoveryService.TOKEN_EXPIRATION_MINUTES, 'minutes').toDate(), used: false };
            await new this.repository(recovery).save();
        }
        return { message: PasswordRecoveryService.MESSAGE_RECOVERY }
    }

    async validateRecovery(tokenRecoveryDto: TokenRecoveryDto) {
        const recovery = await this.findRecovery(tokenRecoveryDto) as RecoveryDto;

        this.validateRecoveryExpiration(recovery);
        this.validateSignToken(tokenRecoveryDto);
        
        const user = await this.validateUserFromRecovery(tokenRecoveryDto);
       
        await this.userService.updatePassword(UserMapper.toDto(user)._id!.toString(), tokenRecoveryDto.newPassword);
        await this.repository.findByIdAndUpdate(recovery._id!.toString(), { used: true });

        return { message: PasswordRecoveryService.MESSAGE_PASSWORD_CHANGED };
    }

    private async findRecovery({ token, email} : { token: string, email: string}){
        const recovery = await this.repository.findOne<Recovery>({ token, email }).lean() as Recovery;
        if (!recovery) {
            throw new RecoveryHttpException('Token não encontrado!', HttpStatus.BAD_REQUEST);
        }

        if (recovery.used === true)
            throw new RecoveryHttpException('Token já utilizado!', HttpStatus.BAD_REQUEST);

        return recovery;
    }

    private validateRecoveryExpiration(recovery: Recovery){
        const currentDate = moment().toDate();
        if(currentDate > recovery.valid){
            throw new RecoveryHttpException('Token expirado!', HttpStatus.BAD_REQUEST);
        }
    }

    private async validateSignToken({ token }: { token: string }){
        const secret_public = process.env.JWT_PUBLIC_SESSION;
        try {
            const verified = this.jwtService.verify(token, { secret: secret_public });
            if (!verified)
                throw new RecoveryHttpException('Token inválido', HttpStatus.BAD_REQUEST);
        } catch (err) {
            throw new RecoveryHttpException('Token inválido', HttpStatus.BAD_REQUEST);
        }
    }

    private async validateUserFromRecovery({ email } : { email: string}){
        const user = await this.userService.getUserByEmail(email);
        if (!user)
            throw new RecoveryHttpException('Ocorreu um erro ao tentar realizar troca de senha', HttpStatus.BAD_REQUEST);

        return user;
    }
}