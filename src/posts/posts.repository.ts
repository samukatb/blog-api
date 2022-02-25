import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/entities/post.entity';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post, 'blog')
    private postsRepository: Repository<Post>,
  ) {}

  async create(post: Post): Promise<Post> {
    return await this.postsRepository.save(post);
  }

  async findOne(id: number): Promise<Post> {
    return await this.postsRepository.findOne(id, { withDeleted: true });
  }

  async softDelete(post: Post) {
    return await this.postsRepository.softRemove(post);
  }

  createQueryBuilder(query: string) {
    return this.postsRepository.createQueryBuilder(query);
  }
}
