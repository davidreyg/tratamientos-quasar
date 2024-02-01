import Router from 'src/router';

export class RedirectAfterLogoutTask {
  static async run(): Promise<void> {
    console.log('REdirecting task..');
    try {
      await Router.push('/login');
    } catch (error) {
      throw error;
    }
  }
}
