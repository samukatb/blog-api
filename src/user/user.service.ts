import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: UserDto): Promise<User> {
    const newUser = new User({ ...createUserDto });
    newUser.password = String(await bcrypt.hash(newUser.password, 10));
    return await this.userRepo.create(newUser);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findByEmail(email);

    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, about, ...result } = user;
      return result;
    }
    return null;
  }

  async update(payload: UserDto, userId: number): Promise<User> {
    const user: User = await this.userRepo.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (payload.password) {
      payload.password = String(await bcrypt.hash(payload.password, 10));
    }

    Object.keys(payload).forEach((key) => (user[key] = payload[key]));

    return await this.userRepo.create(new User({ ...user }));
  }
}
