import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  updateProfile(id: string, filename: string) {
      throw new Error('Method not implemented.');
  }
  remove(id: string) {
      throw new Error('Method not implemented.');
  }
  update(id: string, updateUserDto: UpdateUserDto): User | PromiseLike<User | null> | null {
      throw new Error('Method not implemented.');
  }
  findAll(arg0: { page: number; limit: number; }) {
      throw new Error('Method not implemented.');
  }
  findOne(id: string): User | PromiseLike<User> {
      throw new Error('Method not implemented.');
  }
  findByEmail(username: string) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Este método reemplaza al antiguo "findByEmail"
  async findByTeamName(teamName: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { teamName } });
  }
}
