import { Component, OnInit, OnDestroy } from "@angular/core";

import * as application from 'application';

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
    public static InstanceCounter = 0;

    public counter: number = 16;
    private instanceNum;

    ngOnInit() {
        this.instanceNum = ++AppComponent.InstanceCounter;
        console.log(` === APP COMPONENT<${this.instanceNum}> OnInit ===`);
        this.addLifecycleEventlisteners();
    }

    ngOnDestroy() {
        console.log(` === APP COMPONENT<${this.instanceNum}> OnDestroy ===`);
        this.removeLifecycleEventlisteners();
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
