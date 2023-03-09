import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from 'src/user/domain/entity/user.entity';

export class CreateUserRequest extends PartialType(
  OmitType(User, ['id'] as const),
) {}
