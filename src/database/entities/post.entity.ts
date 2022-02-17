import { IsDate } from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  constructor(params: Partial<Post>) {
    super();
    Object.assign(this, params);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  @IsDate()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  created_by: number;

  @Column({ nullable: true })
  @IsDate()
  edited_at: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  edited_by: number;

  @Column({ nullable: true })
  @IsDate()
  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  deleted_by: number;
}
