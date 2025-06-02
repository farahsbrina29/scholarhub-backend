import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
// user/dto/update-user.dto.ts
  name?: string;
  email?: string;
  password?: string;
}
