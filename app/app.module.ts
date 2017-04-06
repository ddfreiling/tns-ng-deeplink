import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/platform';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
    declarations: [AppComponent, MainComponent, DetailComponent],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, AppRoutingModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
