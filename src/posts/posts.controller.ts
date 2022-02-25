import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Post as PostEntity } from 'src/database/entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User('id') user: number) {
    return this.postsService.create(createPostDto, user);
  }

  @Get(':id')
  findOne(@Param('id') postId: number) {
    return this.postsService.getSinglePost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') postId: number,
    @Body() payload: UpdatePostDto,
    @User('id') userId: number,
  ) {
    return this.postsService.updatePost(postId, payload, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') postId: number, @User('id') userId: number) {
    return this.postsService.deletePost(postId, userId);
  }

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('deleted', new DefaultValuePipe(false), ParseBoolPipe)
    deleted = false,
  ): Promise<Pagination<PostEntity>> {
    limit = limit > 10 ? 10 : limit;

    return this.postsService.paginate(deleted, {
      page,
      limit,
      route: 'http://localhost:3001/posts/',
    });
  }
}
