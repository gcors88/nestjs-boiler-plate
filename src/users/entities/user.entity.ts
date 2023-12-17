import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Roles } from '../../commons/enums/roles';

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    enum: Roles,
    array: true,
    type: 'enum',
    enumName: 'Roles',
    default: [Roles.USER],
  })
  roles: Array<Roles>;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'is_password_change' })
  isPasswordChange: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt?: Date;
}
