import { Injectable, ConflictException, Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  // CREATE user
  async create(createUserDto: CreateUserDto) {
    try {
      this.logger.log(`Creating user with email: ${createUserDto.email}`);
      
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email }
      });

      if (existingUser) {
        this.logger.warn(`User already exists: ${createUserDto.email}`);
        throw new ConflictException('Email already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
      this.logger.log('Password hashed successfully');

      const userData = {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        role: createUserDto.role || 'USER',
      };

      this.logger.log('Creating user in database...');
      const user = await this.prisma.user.create({
        data: userData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        }
      });

      this.logger.log(`User created successfully: ${user.email}`);
      return user;

    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      // Log the specific Prisma error
      if (error.code) {
        this.logger.error(`Prisma error code: ${error.code}`);
        this.logger.error(`Prisma error message: ${error.message}`);
      }
      
      throw new InternalServerErrorException(`Failed to create user: ${error.message}`);
    }
  }

  // GET all users
  async findAll() {
    try {
      this.logger.log('Fetching all users');
      return await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  // GET user by ID
  async findOne(id: number) {
    try {
      this.logger.log(`Fetching user with ID: ${id}`);
      return await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      });
    } catch (error) {
      this.logger.error(`Error fetching user ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  // UPDATE user by ID
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      
      const updateData = { ...updateUserDto };
      
      // Hash password if provided
      if (updateUserDto.password) {
        updateData.password = await bcrypt.hash(updateUserDto.password, 12);
        this.logger.log('Password updated and hashed');
      }

      return await this.prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          updatedAt: true,
        }
      });
    } catch (error) {
      this.logger.error(`Error updating user ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  // DELETE user by ID
  async remove(id: number) {
    try {
      this.logger.log(`Deleting user with ID: ${id}`);
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting user ${id}: ${error.message}`);
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}