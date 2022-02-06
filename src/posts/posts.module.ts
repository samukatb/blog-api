import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PostsRepository } from './posts.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, UserRepository],
})
export class PostsModule {}
