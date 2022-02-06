import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(6)
  title: string;

  @IsNotEmpty()
  content: string;
}
