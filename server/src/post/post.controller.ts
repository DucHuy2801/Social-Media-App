import { Controller, Post, Req, Res, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create_post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags("post")
@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addPost(@Req() req, @Res() res, @Body() createPost: CreatePostDto) {
        const access_token = req.cookies.accessToken

        jwt.verify(access_token, 'secret_key', (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!")

            try {
                const new_post = this.postService.addPost(createPost, userInfo.id)
                return res.status(200).json({
                    message: "Create post successfully!",
                    data: new_post
                })
            } catch (error) {
                return res.status(500).json(error.message)
            }
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deletePost(@Param('id') id: number, @Req() req, @Res() res) {
        try {
            const result = await this.postService.deletePost(id, req.user.id)

            if (result.affected > 0)
                return res.status(200).json({ message: "Post has been deleted!" })
            return res.status(403).json({ message: "You can delete only your post!" })
        } catch (error) {
            return res.status(500).json(error.message || "Internal server error!")
        }
    }
}
