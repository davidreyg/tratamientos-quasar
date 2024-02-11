import { Establecimiento } from 'core/establecimiento';
import { Privilegio } from 'core/privilegio/';
import { Role } from 'core/role';
import { User } from 'core/user';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>();
  // const person = ref<Person>();
  const privilegios = ref<Privilegio[]>([]);
  const roles = ref<Role[]>();
  const establecimiento = ref<Establecimiento>();

  const privilegiosPadre = computed(() =>
    privilegios.value.filter((privilegio) => privilegio.parent_id === null)
  );

  function $reset() {
    user.value = undefined;
    establecimiento.value = undefined;
    roles.value = undefined;
    privilegios.value = [];
    // person.value = undefined;
  }

  function setUser(data: User) {
    user.value = data;
  }

  function setPrivilegios(data: Privilegio[]) {
    privilegios.value = data;
  }

  function setEstablecimiento(data: Establecimiento) {
    establecimiento.value = data;
  }

  function setRoles(data: Role[]) {
    roles.value = data;
  }

  // function setPerson(data: Person) {
  //   person.value = data;
  // }

  return {
    user,
    privilegios,
    roles,
    // person,
    establecimiento,
    $reset,
    setUser,
    setRoles,
    setPrivilegios,
    privilegiosPadre,
    setEstablecimiento,
  };
});
