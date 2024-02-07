import { Table, Model } from 'sequelize-typescript'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { PostEntity } from './post.entity'
import { CommentEntity } from './comment.entity'
import { StoryEntity } from './story.entity'
import { LikeEntity } from './like.entity'

@Table
@Entity('user')
export class UserEntity extends Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 45, nullable: false })
    username: string

    @Column({ type: 'varchar', length: 45, nullable: false })
    email: string

    @Column({ type: 'varchar', length: 200, nullable: false })
    password: string

    @Column({ type: 'varchar', length: 45, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    cover_picture: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    profile_picture: string


    @Column({ type: 'varchar', length: 45, nullable: true})
    city: string

    @Column({ type: 'varchar', length: 45, nullable: true})
    website: string

    @OneToMany(() => PostEntity, post => post.user)
    posts: PostEntity[];

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[]

    @OneToMany(() => StoryEntity, story => story.user)
    stories: StoryEntity[]

    // @OneToMany(() => RelationshipEntity, follow => follow.follower)
    // followings: RelationshipEntity[];

    // @OneToMany(() => RelationshipEntity, follower => follower.following)
    // followers: RelationshipEntity[];

    @OneToMany(() => LikeEntity, like => like.user)
    likes: LikeEntity
}