import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity, UserEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create_post.dto';

@Injectable()
export class PostService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async getPosts(userId: number, token: string): Promise<PostEntity[]> {
        const user = await this.verifyTokenAndGetUser(token)

        const queryBuilder = this.postRepository
            .createQueryBuilder('p')
            .select(['p', 'u.id AS userId', 'u.name', 'u.profile_picture'])
            .innerJoin('p.user', 'u')
            .orderBy('p.createdAt', 'DESC');

        if (!userId) {
            queryBuilder.where('p.userId = :userId', { userId });
        } else {
            queryBuilder
                .leftJoin('u.relationship', 'r', 'p.userId = r.follower_id')
                .where('r.follower_id = :follower_id OR p.userId = :user_id', {
                    follower_id: user.id,
                    user_id: user.id,
                });
        }
        return queryBuilder.getMany()
    }

    async addPost(dto: CreatePostDto, userId: number): Promise<string> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        if (!user) throw new Error("User not found!")

        const new_post = this.postRepository.create({
            ...dto,
            user
        })

        try {
            await this.postRepository.save(new_post)
            return "Create post successfully!"
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async deletePost(postId: number, userId: number) {
        return this.postRepository
            .createQueryBuilder()
            .delete()
            .from(PostEntity)
            .where('id = :postId AND user_id = :userId', { postId, userId })
            .execute()
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
}
