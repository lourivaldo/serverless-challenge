import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { v4 as uuid } from 'uuid';

import { RoleEnum } from '../enums/RoleEnum';

export class Employee {
  public readonly id: string;

  @IsNotEmpty()
  public name: string;

  @IsInt()
  @Min(0)
  @Max(200)
  public age: number;

  @IsEnum(RoleEnum)
  public role: RoleEnum;

  constructor(props: Omit<Employee, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) this.id = uuid();
  }
}
