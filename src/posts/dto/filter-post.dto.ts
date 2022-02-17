import { IsOptional } from 'class-validator';

export class FilterPostDto {
  @IsOptional()
  deleted: string;
}
