import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';


@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  findAll() {
    return this.profileRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.preload({
      id,
      ...updateProfileDto,
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    return this.profileRepository.save(profile);
  }

async remove(id: string) {
  const profile = await this.findOne(id);
  if (!profile) {
    throw new NotFoundException(`Profile with id ${id} not found`);
  }
  return this.profileRepository.remove(profile);
}  }