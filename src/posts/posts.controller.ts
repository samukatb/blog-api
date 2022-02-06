import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/utils';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User('id') user: number) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') postId: number) {
    return this.postsService.update(postId);
  }
}
