import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  languageIds?: number[];

  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  subjectIds?: number[];

  @IsString()
  @IsOptional()
  education?: string;
}
