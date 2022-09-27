import { loadRemoteModule } from '@angular-architects/module-federation';
export class RemoteModuleLoader {
  constructor() {
    throw new Error('can not instantiate static class');
  }

  static loadModule(remoteEntry: string, remoteName: string): Promise<boolean> {
    const exposedModule = './module';
    return new Promise((resolve, reject) => {
      loadRemoteModule({
        remoteEntry,
        remoteName,
        exposedModule
      })
        .then(() => {
          console.log(`${remoteName}@${remoteEntry} loaded`);
          resolve(true);
        })
        .catch(() => {
          console.error(`unable to load ${remoteName}@${remoteEntry}`);
          reject(false);
        });
    });
  }
}
