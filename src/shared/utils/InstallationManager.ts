import { LocalStorage } from 'quasar';

export class InstallationManager {
  constructor() {
    LocalStorage.set(process.env.PROFILE_COMPLETE, null);
  }

  static get profile_complete() {
    return LocalStorage.getItem<string>(process.env.PROFILE_COMPLETE);
  }

  static isCompleted(): boolean {
    if (!InstallationManager.profile_complete) return false;
    if (InstallationManager.profile_complete !== 'COMPLETED') return false;
    return true;
  }

  static removeProfileToken() {
    LocalStorage.remove(process.env.PROFILE_COMPLETE);
  }

  static setProfileToken(profile_complete: string) {
    LocalStorage.set(process.env.PROFILE_COMPLETE, profile_complete);
  }
}
