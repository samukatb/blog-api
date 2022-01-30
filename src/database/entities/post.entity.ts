import { IsDate } from 'class-validator';
import { User } from 'src/database/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  @IsDate()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  created_by: number;

  @Column()
  @IsDate()
  edited_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  edited_by: number;

  @Column()
  @IsDate()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  deleted_by: number;
}
