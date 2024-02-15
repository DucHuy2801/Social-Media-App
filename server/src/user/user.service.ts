import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity';
import { ErrorException } from 'src/utils/error';
import { Repository, UpdateResult } from 'typeorm';
import { UserInfoDto } from './dto/update_user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async getInfo(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        })
        if (!user) throw new ErrorException("Not found user!", HttpStatus.BAD_REQUEST)

        const { id, username, email, name, cover_picture, profile_picture, city, website } = user
        return {
            status: "Get user's info successfully!",
            data: { id, username, email, name, cover_picture, profile_picture, city, website }
        }
    }

    async updateUser(userId: number, userInfo: UserInfoDto): Promise<UpdateResult> {
        const result = await this.userRepository.update({ id: userId }, userInfo)
        return result
    }
}
