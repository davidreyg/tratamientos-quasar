export interface UserUpdateRequest {
  nombre_completo: string;
  name: string;
  cargo: string;
  password?: string;
  establecimiento_id: number;
  role_ids?: number[];
}
