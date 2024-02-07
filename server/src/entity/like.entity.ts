import { Table, Model } from 'sequelize-typescript'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'

@Table
@Entity('like')
export class LikeEntity extends Model {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.likes)
    user: UserEntity

    @ManyToOne(() => PostEntity, post => post.likes)
    post: PostEntity;
}