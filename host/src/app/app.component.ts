import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RemoteModuleLoader } from '../util/RemoteModuleLoader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  bRemoteModuleLoaded = false;
  @ViewChild('output') output!: ElementRef;

  ngOnInit(): void {
    this.loadRemoteModule();
  }

  ngAfterViewInit(): void {
    this.output.nativeElement.innerText = 0;
  }

  onClick(){
    this.output.nativeElement.innerText = Number(this.output.nativeElement.innerText) + 1;
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
      .then(() => this.bRemoteModuleLoaded = true)
      .catch(() => this.bRemoteModuleLoaded = false)
  }
}
