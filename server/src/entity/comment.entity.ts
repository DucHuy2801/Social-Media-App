import { Table, Model } from 'sequelize-typescript'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'

@Table
@Entity('comment')
export class CommentEntity extends Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 200, nullable: false })
    description: string

    @Column({ type: 'varchar', length: 200, nullable: true })
    image: string

    @ManyToOne(() => UserEntity, user => user.comments)
    user: UserEntity

    @ManyToOne(() => PostEntity, post => post.comments)
    post: PostEntity;
}