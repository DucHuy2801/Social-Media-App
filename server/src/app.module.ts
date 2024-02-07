import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { StoryModule } from './story/story.module';
import { UserModule } from './user/user.module';
import { CommentEntity, PostEntity, UserEntity } from './entity';
import { LikeEntity } from './entity/like.entity';
import { StoryEntity } from './entity/story.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'duchuy28012002',
            database: 'social_media',
            entities: [
                UserEntity, 
                CommentEntity, 
                LikeEntity, 
                PostEntity, 
                StoryEntity
            ],
            synchronize: true,
        }),
        DatabaseModule,
        AuthModule,
        CommentModule,
        LikeModule,
        PostModule,
        StoryModule,
        UserModule
    ],
    controllers: [AppController, PostController],
    providers: [AppService, PostService],
})
export class AppModule { }
