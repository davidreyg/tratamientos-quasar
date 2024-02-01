// Generated by https://quicktype.io
import { Modulo, Privilege } from 'core/modulo';
import { Person } from 'core/person';
import { Role } from 'core/role';
import { User } from 'core/user';
export interface ProfileResponse {
  user: {
    data: User;
  };
  person: {
    data: Person;
  };
  roles: {
    data: Role[];
  };
  modulos: {
    data: Modulo[];
  };
  privileges: {
    data: Privilege[];
  };
}
