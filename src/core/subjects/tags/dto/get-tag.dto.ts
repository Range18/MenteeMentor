import { IsOptional, IsString } from 'class-validator';

export class GetTagDto {
  @IsString()
  @IsOptional()
  readonly subject?: string;
}
