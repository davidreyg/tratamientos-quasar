import Router from 'src/router';

export class RedirectAfterLoginTask {
  static async run(): Promise<void> {
    console.log('REdirecting task..');
    try {
      await Router.push('/');
    } catch (error) {
      throw error;
    }
  }
}
