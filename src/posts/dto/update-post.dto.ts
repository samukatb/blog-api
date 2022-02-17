import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  content: string;
}
