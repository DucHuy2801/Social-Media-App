import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity, UserEntity } from 'src/entity';
import { LikeEntity } from 'src/entity/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
    constructor(
        // private jwtService: JwtService,
        @InjectRepository(LikeEntity)
        private readonly likeRepository: Repository<LikeEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>

    ) { }

    async getLikesByPostId(postId: number): Promise<number[]> {
        const likes = await this.likeRepository.find({
            where: { post: { id: postId } },
            select: ['user'],
            relations: ['user']
        })

        return likes.map((like) => like.user.id)
    }

    async addLike(userId: number, postId: number): Promise<LikeEntity> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        })
        const post = await this.postRepository.findOne({
            where: { id: postId }
        })

        if (!user || !post)
            throw new Error("User or post not found!")

        const new_like = this.likeRepository.create({ user, post })
        return await this.likeRepository.save(new_like)
    }

    async deleteLike(userId: number, postId: number): Promise<void> {
        const like = await this.likeRepository.findOne({
            where: {
                user: { id: userId },
                post: { id: postId }
            }
        })

        if (!like) {
            throw new NotFoundException("Like not found")
        }

        await this.likeRepository.remove(like)
    }
}
