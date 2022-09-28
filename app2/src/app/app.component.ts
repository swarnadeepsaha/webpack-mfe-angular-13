import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { JsonPlaceHolderTodoService } from '../services/json-place-holder-todo.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('output') output!: ElementRef;
  private subs = new SubSink();

  constructor(private service: JsonPlaceHolderTodoService) { }

  ngAfterViewInit(): void {
    this.output.nativeElement.innerText = 0;
  }

  onClick() {
    this.subs.add(
      this.service.getTodos(1)
        .subscribe(() => {
          this.output.nativeElement.innerText = Number(this.output.nativeElement.innerText) + 1;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
