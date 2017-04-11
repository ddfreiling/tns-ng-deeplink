import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Router } from '@angular/router';

import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
    selector: "ns-main",
    moduleId: module.id,
    templateUrl: "./main.component.html",
})
export class MainComponent implements OnInit, OnDestroy {

    public counter = 8;

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
        console.log(`onTap: ${this.counter} left`);
    }
}