import { IsBooleanString, IsOptional } from 'class-validator';

export class GetSubjectQuery {
  @IsBooleanString()
  @IsOptional()
  isLanguage?: boolean;
}
