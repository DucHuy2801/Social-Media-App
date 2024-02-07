import { Table, Model } from 'sequelize-typescript'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Table
@Entity('story')
export class StoryEntity extends Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 200, nullable: false })
    description: string

    @Column({ type: 'varchar', length: 200, nullable: true })
    image: string

    @ManyToOne(() => UserEntity, user => user.stories)
    user: UserEntity
}