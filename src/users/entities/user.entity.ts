import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
