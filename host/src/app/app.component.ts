import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ICount } from 'src/model/count.model';
import { AddCount } from 'src/store/action/count.action';
import { CountState } from '../store/state/count.state';
import { RemoteModuleLoader } from '../util/RemoteModuleLoader';
import { SubSink } from 'subsink';
import rxjsPackage from 'rxjs/package.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  bRemoteModuleLoaded = false;
  @ViewChild('output') output!: ElementRef;
  @Select(CountState.getCount) count$!: Observable<ICount>;
  private subs = new SubSink();

  rxjsVersion!: string;

  constructor(private readonly store: Store) { 
    this.rxjsVersion = rxjsPackage.version;
  }

  ngOnInit(): void {
    this.loadRemoteModule();
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.count$.subscribe((count) => {
        this.output.nativeElement.innerText = count.count;
      })
    );
  }

  onClick() {
    this.store.dispatch(new AddCount());
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
