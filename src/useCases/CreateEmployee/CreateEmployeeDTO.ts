import { RoleEnum } from '../../enums/RoleEnum';

export interface ICreateEmployeeRequestDTO {
  name: string;
  age: number;
  role: RoleEnum;
}
