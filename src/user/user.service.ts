import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async create(createUserDto: UserDto): Promise<User> {
    if (
      createUserDto.password === undefined ||
      createUserDto.email === undefined ||
      createUserDto.fullname === undefined
    ) {
      throw new HttpException(
        'Email, password or fullname are not filled in',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = new User({ ...createUserDto });
    newUser.password = String(await bcrypt.hash(newUser.password, 10));
    return await this.userRepo.create(newUser);
  }

  async update(id: number, updateUserDto: UserDto): Promise<User> {
    try {
      const user: User = await this.userRepo.findOne(id);

      if (!user) {
        throw new Error('User not found');
      }

      Object.keys(updateUserDto).forEach(
        (key) => (user[key] = updateUserDto[key]),
      );

      return await this.userRepo.create(new User({ ...user }));
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
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
}
