import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoDbModule } from './shared/database/mongodb.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './shared/security/security.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SecurityModule,
    MongoDbModule.register(),
    AuthModule,
    UserModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
