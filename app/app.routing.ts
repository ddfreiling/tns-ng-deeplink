import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { MainComponent } from './main.component';
import { DetailComponent } from "./detail/detail.component";

const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },
    { path: "main", component: MainComponent },
    { path: "details", component: DetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }