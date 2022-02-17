import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from 'src/database/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepo: PostsRepository) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const postData = new Post({
      ...createPostDto,
      created_at: new Date(),
      created_by: userId,
    });
    return await this.postsRepo.create(postData);
  }

  async findFiltered(queryParams?: FilterPostDto): Promise<Post[]> {
    return await this.postsRepo.find(!!queryParams?.deleted);
  }

  async getSinglePost(id: number): Promise<Post> {
    const post = await this.postsRepo.findOne(id);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }
    return post;
  }

  async updatePost(
    postId: number,
    payload: UpdatePostDto,
    userId: number,
  ): Promise<Post> {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }
    Object.keys(payload).forEach((key) => (post[key] = payload[key]));
    post.edited_at = new Date();
    post.edited_by = userId;
    return await this.postsRepo.create(new Post({ ...post }));
  }

  async deletePost(postId: number, userId: number) {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }
    post.deleted_at = new Date();
    post.deleted_by = userId;
    return await this.postsRepo.create(new Post({ ...post }));
  }
}
