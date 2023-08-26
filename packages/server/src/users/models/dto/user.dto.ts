import { ProfileDto } from "./propfile.dto";

export type UserDto = {
    _id?: string;
    name: string;
    CPF: string;
    birthDate: Date;
    login: string;
    email: string;
    avatarName: string; 
    contentCreator: boolean;
    active: boolean;
    profile: ProfileDto;
    password?: string;
};