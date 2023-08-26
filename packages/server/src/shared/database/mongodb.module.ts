import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({})
export class MongoDbModule {

    static register(): DynamicModule {
        const domain = process.env.DATABASE_DOMAIN;
        const user = process.env.DATABASE_USER;
        const password = process.env.DATABASE_PASSWORD;
        const module = MongooseModule.forRoot(`mongodb+srv://${user}:${password}${domain}`);

        return {
            module: MongoDbModule,
            imports: [
                module
            ],
            exports: [module]
        }
    }

}