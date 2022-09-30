import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CountState } from '../store/state/count.state';
import { SubSink } from 'subsink';
import { ICount } from '../model/count.model';
import { Observable } from 'rxjs';
import { AddCount } from '../store/action/count.action';
import rxjsPackage from 'rxjs/package.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('output') output!: ElementRef;
  @Select(CountState.getCount) count$!: Observable<ICount>;
  private subs = new SubSink();

  rxjsVersion!: string;

  constructor(private readonly store: Store) { 
    this.rxjsVersion = rxjsPackage.version;
  }

  ngAfterViewInit(): void {
    this.subs.add(
      this.count$.subscribe((count) => {
        this.output.nativeElement.innerText = count.count;
      })
    );
  }

  onClick(){
    this.store.dispatch(new AddCount());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
