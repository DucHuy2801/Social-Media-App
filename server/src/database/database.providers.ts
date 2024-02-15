import { Sequelize } from "sequelize-typescript";
import { CommentEntity, PostEntity } from "src/entity";
import { LikeEntity } from "src/entity/like.entity";
import { StoryEntity } from "src/entity/story.entity";
import { UserEntity } from "src/entity/user.entity";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
            sequelize.addModels([
                UserEntity, 
                CommentEntity, 
                LikeEntity, 
                PostEntity, 
                StoryEntity
            ]);
            await sequelize.sync();
            return sequelize
        }
    }
]