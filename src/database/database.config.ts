import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from './entities/user.entity';

const dbConfig = (): TypeOrmModuleOptions => ({
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  name: 'blog',
  type: 'mysql',
  entities: [User, Post],
  synchronize: true,
});

export default dbConfig;
