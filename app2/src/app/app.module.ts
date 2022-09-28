import { HttpClientModule } from '@angular/common/http';
import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
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
        ['x-app2', AppComponent]
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

