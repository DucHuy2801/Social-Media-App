import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';

@ApiTags("like")
@Controller('like')
export class LikeController {
    constructor(
        private likeService: LikeService
    ) { }

    @Post(':userId/:postId')
    async addLike(@Param('userId') userId: number, @Param('postId') postId: number): Promise<void> {
        await this.likeService.addLike(userId, postId);
    }

    @Delete(':userId/:postId')
    async deleteLike(@Param('userId') userId: number, @Param('postId') postId: number): Promise<void> {
        await this.likeService.deleteLike(userId, postId);
    }

    @Get('post/:postId')
    async getLikesByPostId(@Param('postId') postId: number): Promise<number[]> {
        return this.likeService.getLikesByPostId(postId);
    }
}
