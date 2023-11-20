
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Brackets } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }


  async findAll(queryParams: any): Promise<User[]| {error:string}> {
  
    const queryBuilder = this.userRepository.createQueryBuilder('user');
  
    if (queryParams.username) {
      queryBuilder.andWhere('user.username LIKE :username', { username: `%${queryParams.username}%` });
    }
  
    if (queryParams.email) {
      queryBuilder.andWhere('user.email LIKE :email', { email: `%${queryParams.email}%` });
    }
  
    if (queryParams.state) {
      queryBuilder.andWhere('user.state LIKE :state', { state: `%${queryParams.state}%` });
    }
  
    if (queryParams.marks) {
      queryBuilder.andWhere('user.marks LIKE :marks', { marks: `%${queryParams.marks}%` });
    }
  
    if (queryParams.search) {
      const searchFields = ['username', 'email', 'state', 'marks'];
  
      queryBuilder.orWhere(
        new Brackets(qb => {
          searchFields.forEach((field, index) => {
            const condition = `${field} LIKE :search`;
            if (index === 0) {
              qb.where(condition, { search: `%${queryParams.search}%` });
            } else {
              qb.orWhere(condition, { search: `%${queryParams.search}%` });
            }
          });
        })
      );
    }
  
    const user= await queryBuilder
      .orderBy(this.buildOrder(queryParams))
      .getMany();
      if(user.length)
      return user;
      return {
        error:'User Not Found'
    }
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }
  

  async update(id: number, updateUserDto: UserDto): Promise<User | {error:string}> {
    const user=await this.findOne(id);
    if(!user)
    return {
        error:'User Not Found'
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<{ success?: string; error?: string }> {
    const user=await this.findOne(id);
    if(!user)
    return {
        error:'User Not Found'
    }
    await this.userRepository.delete(id);
    return {
        success:'User Deleted Successfully'
    }
  }

  private buildOrder(queryParams: any): Record<string, 'ASC' | 'DESC'> | undefined {
    if (queryParams.sortBy && queryParams.order) {
      return { [queryParams.sortBy]: queryParams.order.toUpperCase() as 'ASC' | 'DESC' };
    }
    return undefined;
  }
}
