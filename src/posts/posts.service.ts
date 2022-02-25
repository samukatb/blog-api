import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Post } from 'src/database/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepo: PostsRepository) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const postData = new Post({
      ...createPostDto,
      created_by: userId,
    });
    return await this.postsRepo.create(postData);
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

  async deletePost(postId: number, userId: number): Promise<Post> {
    const post = await this.postsRepo.findOne(postId);
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NO_CONTENT);
    }
    if (post.deleted_at) {
      throw new HttpException('Post already deleted', HttpStatus.BAD_REQUEST);
    }
    post.deleted_by = userId;
    await this.postsRepo.create(new Post({ ...post }));
    return await this.postsRepo.softDelete(post);
  }

  async paginate(
    deleted: boolean,
    options: IPaginationOptions,
  ): Promise<Pagination<Post>> {
    const queryBuilder = this.postsRepo.createQueryBuilder('p');
    deleted ? queryBuilder.withDeleted() : '';
    queryBuilder.leftJoinAndSelect('p.created_by', 'created_by');
    queryBuilder.orderBy('p.id', 'DESC');

    return paginate<Post>(queryBuilder, options);
  }
}
