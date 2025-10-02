// src/profile/dto/create-profile.dto.ts
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Goal, ActivityLevel } from '../entities/profile.entity';

export class CreateProfileDto {
  @IsEnum(Goal)
  goal: Goal;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
