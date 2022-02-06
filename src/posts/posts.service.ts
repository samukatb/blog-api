import { Injectable } from '@nestjs/common';
import { Post } from 'src/database/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepo: PostsRepository) {}

  async create(createPostDto: CreatePostDto, user: number) {
    const postData = new Post({
      ...createPostDto,
      created_at: new Date(),
      created_by: user,
    });
    return await this.postsRepo.create(postData);
  }

  async findAll(): Promise<Array<Post>> {
    return await this.postsRepo.findPosts();
  }

  async update(postId: number): Promise<Post> {
    return await this.postsRepo.findOne(postId);
  }
}
