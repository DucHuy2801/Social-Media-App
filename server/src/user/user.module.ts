import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([UserEntity])
    ],
    // controllers: [UserController],
    // providers: [UserService]
})
export class UserModule {}
