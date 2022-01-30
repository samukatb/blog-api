import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User, 'blog')
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findOne(userId: number): Promise<User> {
    return await this.usersRepository.findOne(userId);
  }
}
