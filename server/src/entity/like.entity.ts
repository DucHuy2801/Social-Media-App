import { Table, Model } from 'sequelize-typescript'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'

@Table
@Entity('like')
export class LikeEntity extends Model {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.likes)
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @JoinColumn({ name: "post_id"})
    @ManyToOne(() => PostEntity, post => post.likes)
    post: PostEntity;
}