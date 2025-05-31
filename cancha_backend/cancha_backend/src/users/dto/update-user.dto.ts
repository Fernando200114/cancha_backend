import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  teamName?: string;

  @IsOptional()
  @IsString()
  coachName?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  playersCount?: number;
}

