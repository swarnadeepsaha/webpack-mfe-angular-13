import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { CountState } from 'src/store/state/count.state';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([CountState], {
      developmentMode: !environment.production,
      compatibility: {
        strictContentSecurityPolicy: true
      },
    }),
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap(appRef: ApplicationRef): void {
    const customComponents: [string, any][] =
      [
        ['x-host', AppComponent]
      ];

    for (const [customCompName, customCompApplication] of customComponents) {
      if (!customElements.get(customCompName)) {
        const customComponentRef: NgElementConstructor<unknown> = createCustomElement(customCompApplication, {
          injector: this.injector
        });
        customElements.define(customCompName, customComponentRef);
      }
    }
  }
}
