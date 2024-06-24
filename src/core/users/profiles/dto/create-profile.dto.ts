import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @IsNumber({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  languageIds: number[];

  @IsNumber({}, { each: true })
  @IsArray()
  @IsNotEmpty()
  subjectIds: number[];

  @IsString()
  @IsOptional()
  education?: string;
}
