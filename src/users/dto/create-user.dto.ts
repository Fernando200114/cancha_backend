import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  teamName: string;

  @IsOptional()
  @IsString()
  coachName?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  playersCount?: number;
  password:string;
}
