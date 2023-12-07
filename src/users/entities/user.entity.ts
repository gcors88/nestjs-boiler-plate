import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt?: Date;
}
