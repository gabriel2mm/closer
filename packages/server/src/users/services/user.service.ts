import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../models/entity/user.entity";
import { UserDto } from "../models/dto/user.dto";
import { UserMapper } from "../models/mapper/user.mapper";
import { EmailValidate } from "../validations/email.validate";
import { UserHttpException } from "../exceptions/user-http.exception";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private readonly repository: Model<User>
    ) { }

    async create(userDto: UserDto) {
        try {
            const user = UserMapper.fromDto(userDto);

            const salts = await bcrypt.genSalt(12);
            user.password = await bcrypt.hash(user.password, salts);

            EmailValidate.ValidateEmail(user.email);

            const userSaved = await new this.repository(user).save();
            return await this.getUserById(userSaved._id.toString());
        } catch (err) {
            this.logger.error('ocorreu um erro ao criar usuário '.concat(err));
            throw new UserHttpException('Usuário inválido', HttpStatus.BAD_REQUEST);
        }
    }

    async getUserByEmail(email: string): Promise<User | null>{
        const user = await this.repository.findOne<User>({ email }).lean();
        return user;
    }

    async getUserByCPF(CPF: string): Promise<UserDto>{
        const user = await this.repository.findOne<User>({ CPF }).lean();
        
        if(!user)
            throw new UserHttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        return UserMapper.toDto(user);
    }

    async getUserById(id: string): Promise<UserDto> {
        const user = await this.repository.findById<User>(id).lean();
        if(!user)
            throw new UserHttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        return UserMapper.toDto(user);
    }

    async getAllUsers() {
        return (await this.repository.find()).map(user => UserMapper.toDto(user));
    }

    async disableUser(id: string) {
        await this.repository.findByIdAndUpdate(id, { active: false });
    }

    async updatePassword(id: string, password: string){
        if(!password){
            throw new UserHttpException('Password vazio!', HttpStatus.NOT_FOUND);
        }
        const salts = await bcrypt.genSalt(12);
        const newPassword = await bcrypt.hash(password, salts);
        return await this.repository.findByIdAndUpdate(id, { password : newPassword });
    }
}