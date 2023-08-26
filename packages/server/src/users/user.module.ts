import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./models/entity/user.entity";
import { UserService } from "./services/user.service";
import { Profile, ProfileSchema } from "./models/entity/profile.entity";
import { Permission, PermissionSchema } from "./models/entity/permission.entity";
import { ProfileService } from "./services/profile.service";
import { ProfileController } from "./controllers/profile.controller";
import { Recovery, RecoverySchema } from "./models/entity/recovery.entity";
import { PasswordRecoveryService } from "./services/password-recovery.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule
    ],
    controllers:[
        ProfileController
    ],
    providers: [
        UserService,
        ProfileService,
        PasswordRecoveryService,
    ],
    exports: [ 
        UserService,
        ProfileService,
        PasswordRecoveryService,
    ]
})
export class UserModule{

    private static readonly monooseFeature =  MongooseModule.forFeature([
        {name: User.name, schema: UserSchema},
        {name: Profile.name, schema: ProfileSchema},
        {name: Permission.name, schema: PermissionSchema},
        {name: Recovery.name, schema: RecoverySchema}
    ]);


   static register(): DynamicModule{
        return { 
            module: UserModule,
            imports: [ 
                this.monooseFeature,
            ],
            exports: [
                this.monooseFeature
            ]
        }
    }
}