import { Table, Model } from 'sequelize-typescript'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { CommentEntity } from './comment.entity'
import { LikeEntity } from './like.entity'

@Table
@Entity('post')
export class PostEntity extends Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 200, nullable: false })
    description: string

    @Column({ type: 'varchar', length: 200, nullable: false })
    image: string

    @ManyToOne(() => UserEntity, user => user.posts)
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[];

    @OneToMany(() => LikeEntity, like => like.post)
    likes: LikeEntity[];
}