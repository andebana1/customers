export enum StatusEnum {
  ACTIVE = 'active',
  PENDING = 'pending',
  INACTIVE = 'inactive',
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  status: StatusEnum;
  email: string;
  phone?: string;
}