import { Profile } from "../entity/profile.entity";

export type ProfileDto = Profile & {
    _id?: string;
};