import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: UserDto) {
    const newUser = new User({ ...createUserDto });
    return await this.userRepo.create(newUser);
  }

  async update(id: number, updateUserDto: UserDto) {
    const user: User = await this.userRepo.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.keys(updateUserDto).forEach(
      (key) => (user[key] = updateUserDto[key]),
    );

    await this.userRepo.create(new User({ ...user }));
  }
}
