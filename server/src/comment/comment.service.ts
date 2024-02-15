import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>
    ) { }

    async getComments(postId: number): Promise<CommentEntity[]> {
        return this.commentRepository.find({
            where: {
                post: { id: postId }
            },
            order: { createdAt: 'DESC' }
        })
    }

    async addComment(desc: string, userId: number, postId: number): Promise<void> {
        const comment = this.commentRepository.create({
            description: desc,
            createdAt: new Date(),
            user: { id: userId },
            post: { id: postId }
        })

        await this.commentRepository.save(comment)
    }

    async deleteComment(commentId: number, userId: number): Promise<void> {
        await this.commentRepository.delete({ id: commentId, user: { id: userId }})
    }
}
