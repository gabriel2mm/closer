import { Injectable } from "@nestjs/common";
import { UserDto } from "../dto/user.dto";
import { User } from "../entity/user.entity";

export class UserMapper{

    static toDto(user: User): UserDto{ 
        return {'_id': undefined, ...user};
    }

    static fromDto(userDto: UserDto): User{ 
        const user = new User();
        Object.assign(user, userDto);
        
        return user;
    }
}