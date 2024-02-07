import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { ErrorException } from 'src/utils/error';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async register(dto: RegisterDto) {
        const existUsername = await this.userRepository.findOne({
            where: { username: dto.username }
        })
        if (existUsername) throw new ErrorException("Username is existed!", HttpStatus.BAD_REQUEST)

        const existEmail = await this.userRepository.findOne({
            where: { email: dto.email }
        })
        if (existEmail) throw new ErrorException("Email is existed!", HttpStatus.BAD_REQUEST)

        const hashed_password = await this.hashData(dto.password)

        const new_user = this.userRepository.create({
            ...dto,
            password: hashed_password
        })

        const result = await this.userRepository.save(new_user)

        return {
            message: "Register successfully!",
            data: result
        }
    }

    async login(dto: LoginDto) {
        const { username, password } = dto
        const existUsername = await this.userRepository.findOne({
            where: { username: username }
        })
        if (existUsername) throw new ErrorException("Username is existed!", HttpStatus.BAD_REQUEST)


    }
}
