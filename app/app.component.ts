import { Component, OnInit, OnDestroy, EventEmitter, NgZone } from "@angular/core";
import { Router } from '@angular/router';

import * as application from 'application';
import { isAndroid, isIOS } from 'platform';

let OnRouteToURL: EventEmitter<string>;
if (isIOS) {
    application.ios.delegate = require('./delegate').CustomAppDelegate
    OnRouteToURL = require('./delegate').OnRouteToURL;
} else if (isAndroid) {
    OnRouteToURL = require('./activity').OnRouteToURL;
}

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {

    public static InstanceCounter = 0;

    public counter: number = 16;
    private instanceNum;


    constructor(
        private zone: NgZone,
        private router: Router
    ) {
        this.instanceNum = ++AppComponent.InstanceCounter;
        console.log(`<${this.instanceNum}>AppComponent.constructor`);
    }

    ngOnInit() {
        console.log(`<${this.instanceNum}>AppComponent.onInit`);
        this.addLifecycleEventlisteners();

        // Subscribe to routing events from both platforms
        OnRouteToURL.subscribe((url) => this.handleRouting(url));
    }

    ngOnDestroy() {
        console.log(`<${this.instanceNum}>AppComponent.onDestroy`);
        this.removeLifecycleEventlisteners();
    }

    handleRouting(url: string) {
        // Assume everything after :// is an app route
        // in production you might want to limit which routes are allowed to deep-link
        const route = url.substr(url.indexOf('://') + 3);
        console.log(`AppComponent: Navigate to route '${route}'`);

        // Do the routing in the Angular Zone, just to be sure
        this.zone.run(() => {
            this.router.navigateByUrl(route);
        });
    }

    addLifecycleEventlisteners() {
        application.on(application.launchEvent, function (args: application.ApplicationEventData) {
            if (args.android) {
                // For Android applications, args.android is an android.content.Intent class.
                console.log("Launched Android application with the following intent: " + args.android + ".");
            } else if (args.ios !== undefined) {
                // For iOS applications, args.ios is NSDictionary (launchOptions).
                console.log("Launched iOS application with options: " + args.ios);
            }
        });

        application.on(application.suspendEvent, function (args: application.ApplicationEventData) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("ActivitySuspend: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });

        application.on(application.resumeEvent, function (args: application.ApplicationEventData) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("ActivityResume: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });

        application.on(application.exitEvent, function (args: application.ApplicationEventData) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("ActivityExit: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });

        application.on(application.lowMemoryEvent, function (args: application.ApplicationEventData) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("ActivityLowMem: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });

        application.on(application.uncaughtErrorEvent, function (args: application.ApplicationEventData) {
            if (args.android) {
                // For Android applications, args.android is an NativeScriptError.
                console.log("NativeScriptError: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is NativeScriptError.
                console.log("NativeScriptError: " + args.ios);
            }
        });
    }

    removeLifecycleEventlisteners() {
        application.off(application.launchEvent);
        application.off(application.suspendEvent);
        application.off(application.resumeEvent);
        application.off(application.exitEvent);
        application.off(application.lowMemoryEvent);
        application.off(application.uncaughtErrorEvent);
    }
}
