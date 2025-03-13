import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvestmentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  projectId: string;
}