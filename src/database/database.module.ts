import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database.config';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

const entities = TypeOrmModule.forFeature([User, Post], 'blog');

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig()),
    entities,
  ],
  exports: [entities],
})
export class DatabaseModule {}
