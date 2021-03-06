import { 
  ApiProperty, ApiPropertyOptional, OmitType, 
  PickType, PartialType
} from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';

import { Place } from "../../places";
import { Role } from '../../auth';


export class User {
  @AutoMap()
  @ApiProperty()
  readonly id!: string;

  @AutoMap()
  @ApiProperty()
  readonly name!: string;

  @AutoMap()
  @ApiProperty()
  readonly email!: string;

  @AutoMap()
  @ApiProperty()
  readonly avatar!: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  readonly role!: Role;

  @AutoMap(() => Place)
  @ApiProperty({ type: () => [Place]})
  readonly places!: Place[];

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
}

export class LoginUserDto extends PickType(User, ['email'] as const) {
  @ApiProperty()
  readonly password: string;
}

export class CreateUserDto extends PickType(
  User, ['name', 'email'] as const
) {
  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(
  PickType(User, ['name', 'avatar'] as const)
) {}

export class UserProfile {
  @AutoMap()
  @ApiProperty()
  readonly id!: string;

  @AutoMap()
  @ApiProperty()
  readonly name!: string;

  @AutoMap()
  @ApiProperty()
  readonly email!: string;

  @AutoMap()
  @ApiProperty()
  readonly avatar!: string;

  @AutoMap()
  @ApiProperty({ enum: Role, default: Role.USER })
  readonly role!: Role;
}