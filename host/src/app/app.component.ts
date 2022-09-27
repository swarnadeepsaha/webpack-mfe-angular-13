import { Component, OnInit } from '@angular/core';
import { RemoteModuleLoader } from '../util/RemoteModuleLoader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bRemoteModuleLoaded = false;

  ngOnInit(): void {
    this.loadRemoteModule();
  }

  loadRemoteModule(): void {
    this.bRemoteModuleLoaded = false;
    const localUiModules: [string, string][] = [
      ['http://localhost:4201/application/app1/remoteEntry.js', 'app1'],
      ['http://localhost:4202/application/app2/remoteEntry.js', 'app2']
    ];

    const remoteModuleLoadedPromises: Promise<boolean>[] = [];
    for (const [remoteEntryUrl, name] of localUiModules) {
      remoteModuleLoadedPromises.push(RemoteModuleLoader.loadModule(remoteEntryUrl, name));
    }

    Promise.all(remoteModuleLoadedPromises)
      .then(() => this.bRemoteModuleLoaded = true )
      .catch(() => this.bRemoteModuleLoaded = false )
  }
}
