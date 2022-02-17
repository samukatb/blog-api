import { IsEmail, IsNotEmpty } from 'class-validator';
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

  toJSON() {
    delete this.id;
    delete this.password;
    delete this.email;
    return this;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ nullable: true })
  about: string;

  @OneToMany(() => Post, (post) => post.id)
  posts: Post[];
}
