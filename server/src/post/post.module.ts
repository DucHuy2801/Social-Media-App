import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity';

@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([PostEntity])
    ],
    // controllers: [PostController],
    // providers: [PostService]
})
export class PostModule {}
