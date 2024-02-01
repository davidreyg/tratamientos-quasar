import { Establecimiento } from 'core/establecimiento';
import { Role } from 'core/role';
import { User } from 'core/user';
import { useAuthStore } from '../stores';

export class StoreUserProfileInStore {
  static run({
    user,
    roles,
    establecimiento,
  }: {
    user: User;
    roles: Role[];
    establecimiento: Establecimiento;
  }): void {
    console.log('Store user in AUTH STO||RE TASK...');
    try {
      const { setUser, setRoles, setEstablecimiento } = useAuthStore();
      setUser(user);
      setRoles(roles);
      setEstablecimiento(establecimiento);
      // setPerson(person);
      // setPrivileges(privileges);
    } catch (error) {
      throw error;
    }
  }
}
