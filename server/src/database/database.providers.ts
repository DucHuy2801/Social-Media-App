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
                password: 'duchuy28012002',
                database: 'social_media',
            });
            sequelize.addModels([
                UserEntity, 
                CommentEntity, 
                LikeEntity, 
                PostEntity, 
                StoryEntity,
                // RelationshipEntity
            ]);
            await sequelize.sync();
            return sequelize
        }
    }
]