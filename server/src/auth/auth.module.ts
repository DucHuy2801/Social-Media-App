import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.SECRET_KEY || 'secret_key',
            signOptions: { expiresIn: '1h' }
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
