import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../enums';
import { User } from '../../users/entities';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [],
  })
  permissions: Permission[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_group' })
  users: User[];
}
