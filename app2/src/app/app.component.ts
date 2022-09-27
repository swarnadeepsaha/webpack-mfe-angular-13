import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('output') output!: ElementRef;

  ngAfterViewInit(): void {
    this.output.nativeElement.innerText = 0;
  }

  onClick(){
    this.output.nativeElement.innerText = Number(this.output.nativeElement.innerText) + 1;
  }
}
