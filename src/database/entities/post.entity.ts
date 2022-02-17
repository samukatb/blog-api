import { IsDate } from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({ type: 'longtext' })
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  created_by: number;

  @UpdateDateColumn()
  edited_at: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  edited_by: number;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn()
  deleted_by: number;
}
