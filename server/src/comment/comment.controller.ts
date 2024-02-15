import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("comment")
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @Get(':postId')
    getComments(@Param('postId') postId: number) {
      return this.commentService.getComments(postId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    addComment(@Body() body: { desc: string; postId: number }, req: any) {
      return this.commentService.addComment(body.desc, req.user.id, body.postId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteComment(@Param('id') commentId: number, req: any) {
      return this.commentService.deleteComment(commentId, req.user.id);
    }
}
