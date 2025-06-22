import { SetMetadata } from '@nestjs/common';


enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const ROLES_KEY = 'Role';
const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export { Role, ROLES_KEY, Roles };