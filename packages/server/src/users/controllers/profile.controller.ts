import { Body, Controller, HttpCode, HttpStatus, Injectable, Post } from "@nestjs/common";
import { ProfileDto } from "../models/dto/propfile.dto";
import { ProfileService } from "../services/profile.service";

@Controller('api/v1/profiles')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async createProfile(@Body() profileDto: ProfileDto) {
        delete profileDto._id;
        return this.profileService.createProfile(profileDto);
    }
}