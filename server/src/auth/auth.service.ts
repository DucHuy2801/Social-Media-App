import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
            message: "Register successfully!"
        }
    }

    async login(dto: LoginDto) {
        const { username, password } = dto
        const user = await this.userRepository
            .createQueryBuilder()
            .where('username = :username', { username })
            .getOne();

        if (!user) throw new ErrorException("Username doesn't exist!", HttpStatus.BAD_REQUEST,)

        const match_password = await bcrypt.compare(password, user.password)
        if (!match_password) throw new ErrorException("Password is wrong!", HttpStatus.BAD_REQUEST)

        const token = this.jwtService.sign({
            id: user.id,
            user_name: user.username,
            email: user.email,
        });

        return {
            access_token: token
        }
    }

    async verifyTokenAndGetUser(token: string): Promise<UserEntity> {
        const decoded_token = this.verifyToken(token)
        const user = await this.userRepository.findOne(decoded_token.id)

        if (!user) {
            throw new UnauthorizedException("Token is not valid!")
        }
        return user
    }

    private verifyToken(token: string): any {
        try {
            const decoded_token = this.jwtService.verify(token)
            return decoded_token
        } catch (error) {
            throw new UnauthorizedException("Token is not valid")
        }
    }

    async validateUser(payload: any) {
        const userId = payload.sub

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!user)
            return null
        return user
    }
}
