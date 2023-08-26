import { HttpStatus, Injectable } from "@nestjs/common";
import { Profile } from "../models/entity/profile.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProfileDto } from "../models/dto/propfile.dto";
import { ProfileMapper } from "../models/mapper/profile.mapper";
import { ProfileHttpException } from "../exceptions/profile-http.exception";

@Injectable()
export class ProfileService {

    constructor(@InjectModel(Profile.name) private readonly repository: Model<Profile>) { }

    async getProfileByName(name: string, nulleable: boolean = false): Promise<ProfileDto | null> {
        const profile = await this.repository.findOne({ name }).lean();
        if (!profile && !nulleable)
            throw new ProfileHttpException('Perfil não encontrado', HttpStatus.BAD_REQUEST);

        return profile ? ProfileMapper.toDto(profile) : profile;
    }

    async getProfileById(id: string): Promise<ProfileDto | null> {
        return await this.repository.findById(id).lean();
    }

    async getProfiles(): Promise<ProfileDto[]> {
        const profiles = await this.repository.find<Profile>().lean();
        return profiles.map(profile => ProfileMapper.toDto(profile));
    }

    async createProfile(profileDto: ProfileDto): Promise<ProfileDto> {
        const profile = ProfileMapper.fromDto(profileDto);

        if (!profile.name)
            throw new ProfileHttpException('Perfil inválido', HttpStatus.BAD_REQUEST);

        if (profile.name.trim().toLocaleLowerCase() === 'admin')
            throw new ProfileHttpException('Não é possível criar perfil admin', HttpStatus.BAD_REQUEST);


        const nameEqualized = profile.name.trim().toLocaleLowerCase();
        const existsProfile = await this.getProfileByName(nameEqualized, true);

        if (existsProfile)
            throw new ProfileHttpException('Perfil já existente', HttpStatus.BAD_REQUEST);

        profile.name = nameEqualized;
        const profileCreated = await new this.repository(profile).save();
        const profileFromDataBase = await this.getProfileById(profileCreated._id.toString());
        return ProfileMapper.toDto(profileFromDataBase);
    }

    async updateProfile(id: string, profileDto: ProfileDto) {
        const profile = await this.repository.findByIdAndUpdate(id, profileDto).lean();
        if (!profile) {
            throw new ProfileHttpException('Perfil não existente', HttpStatus.BAD_REQUEST);
        }
        return ProfileMapper.toDto(profile);
    }

    async deleteProfile(id: string) {
        return await this.repository.findByIdAndDelete(id).lean();
    }
}