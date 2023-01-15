import { Group } from '../../groups/entities';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];
}
