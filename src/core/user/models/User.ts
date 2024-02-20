import { Role } from 'core/role';

export interface User {
  object: string;
  id: string;
  name: string;
  nombre_completo: string;
  cargo: string;
  real_id: number;
  created_at: string;
  updated_at: string;
  readable_created_at: string;
  readable_updated_at: string;
  role_ids: number[];
  roles: {
    data: Role[];
  };
}
