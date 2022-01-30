import { IsEmail } from 'class-validator';
import { Post } from 'src/database/entities/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(params: Partial<User>) {
    super();
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  about: string;

  @OneToMany(() => Post, (post) => post.id)
  posts: Post[];
}
