import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'ns-detail',
    moduleId: module.id,
    templateUrl: './detail.component.html',
    styleUrls: ['detail.component.css']
})
export class DetailComponent implements OnInit {

    title = 'Details';

    constructor(private routerExt: RouterExtensions) {
    }

    ngOnInit() {
    }

    goBack() {
        this.routerExt.back();
    }
}
