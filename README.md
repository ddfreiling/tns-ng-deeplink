# tns-ng-deeplink
Test repository for nativescript-angular deep-linking

The following works as a deep-link in this demo-repo:
`deeplink://details`

It works by having a custom Activity on Android, and custom AppDelegate on iOS,
each using an EventEmitter, which can be subscribed to from the AppComponent.

IMPORTANT:
AndroidManifest.xml has `android:launchMode="singleTask"`,
which makes sure the angular app is not re-initialized on deep-links
