import { ProfileDto } from "../dto/propfile.dto";
import { Profile } from "../entity/profile.entity";

export class ProfileMapper{ 

    static toDto(profile: Profile | null): ProfileDto{
        if(profile)
            return {'_id': undefined, ...profile};

        return {} as ProfileDto;
    }

    static fromDto(profileDto: ProfileDto): Profile{ 
        const profile = new Profile();
        Object.assign(profile, profileDto);
        return profile;
    }
}