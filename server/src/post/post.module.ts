import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity, UserEntity } from 'src/entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([PostEntity, UserEntity])
    ],
    controllers: [ PostController ],
    providers: [ PostService ]
})
export class PostModule {}
