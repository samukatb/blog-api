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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User('id') user: number) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  get(@Query() queryParams?: FilterPostDto) {
    return this.postsService.findFiltered(queryParams);
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
}
