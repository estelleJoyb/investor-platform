import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestDto } from './create-interest.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInterestDto extends PartialType(CreateInterestDto) {
  @IsOptional()
  @IsString()
  name: string;
}