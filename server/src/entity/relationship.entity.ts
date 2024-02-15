import { Table } from "sequelize-typescript";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Table
@Entity('relationship')
export class RelationshipEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, user => user.followings)
    @JoinColumn({ name: 'follwer_id' })
    follower: UserEntity

    @ManyToOne(() => UserEntity, user => user.followers)
    @JoinColumn({ name: 'follwing_id' })
    following: UserEntity
}