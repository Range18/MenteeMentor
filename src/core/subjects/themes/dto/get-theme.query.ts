import { IsOptional, IsString } from 'class-validator';

export class GetThemeQuery {
  @IsString()
  @IsOptional()
  readonly subject?: string;
}
