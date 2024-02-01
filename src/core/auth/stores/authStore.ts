import { Role } from 'core/role';
import { User } from 'core/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>();
  // const person = ref<Person>();
  // const modulos = ref<Modulo[]>();
  const roles = ref<Role[]>();
  // const privileges = ref<Privilege[]>();

  function $reset() {
    user.value = undefined;
    // modulos.value = undefined;
    roles.value = undefined;
    // person.value = undefined;
  }

  function setUser(data: User) {
    user.value = data;
  }

  // function setModulos(data: Modulo[]) {
  //   modulos.value = data;
  // }

  // function setPrivileges(data: Privilege[]) {
  //   privileges.value = data;
  // }

  function setRoles(data: Role[]) {
    roles.value = data;
  }

  // function setPerson(data: Person) {
  //   person.value = data;
  // }

  return {
    user,
    // modulos,
    roles,
    // person,
    // privileges,
    $reset,
    setUser,
    setRoles,
    // setModulos,
    // setPerson,
    // setPrivileges,
  };
});
