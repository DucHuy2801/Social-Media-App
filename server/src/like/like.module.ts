import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from 'src/entity/like.entity';
import { PostEntity, UserEntity } from 'src/entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([LikeEntity, UserEntity, PostEntity])
    ],
    providers: [LikeService],
    controllers: [LikeController]
})
export class LikeModule {}
