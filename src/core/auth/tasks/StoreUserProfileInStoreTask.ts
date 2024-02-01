import { Role } from 'core/role';
import { User } from 'core/user';
import { useAuthStore } from '../stores';

export class StoreUserProfileInStore {
  static run({ user, roles }: { user: User; roles: Role[] }): void {
    console.log('Store user in AUTH STORE TASK...');
    try {
      const { setUser, setRoles } = useAuthStore();
      setUser(user);
      setRoles(roles);
      // setModulos(modulos);
      // setPerson(person);
      // setPrivileges(privileges);
    } catch (error) {
      throw error;
    }
  }
}
