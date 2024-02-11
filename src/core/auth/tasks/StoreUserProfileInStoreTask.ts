import { Establecimiento } from 'core/establecimiento';
import { Privilegio } from 'core/privilegio';
import { Role } from 'core/role';
import { User } from 'core/user';
import { useAuthStore } from '../stores';

export class StoreUserProfileInStore {
  static run({
    user,
    roles,
    establecimiento,
    privilegios,
  }: {
    user: User;
    roles: Role[];
    establecimiento: Establecimiento;
    privilegios: Privilegio[];
  }): void {
    console.log('Store user in AUTH STO||RE TASK...');
    try {
      const { setUser, setRoles, setEstablecimiento, setPrivilegios } =
        useAuthStore();
      setUser(user);
      setRoles(roles);
      setEstablecimiento(establecimiento);
      // setPerson(person);
      setPrivilegios(privilegios);
    } catch (error) {
      throw error;
    }
  }
}
