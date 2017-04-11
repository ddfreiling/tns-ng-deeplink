import { ReplaySubject } from 'rxjs/ReplaySubject';

export var OnRouteToURL = new ReplaySubject<string>();

export class CustomAppDelegate extends UIResponder implements UIApplicationDelegate {
  
  public static ObjCProtocols = [UIApplicationDelegate];

  // Handle pre-9.3 style app scheme deep-linking
  public applicationOpenURLSourceApplicationAnnotation(app: UIApplication, url: NSURL, sourceApp: string, annotation: any): boolean {
    console.log(`iOS.AppDelegate - App opened from URL, by AppID: ${sourceApp}`);
    this.handleRouting(url);
    return true;
  }

  // Handle Universal Link deep-linking
  public applicationContinueUserActivityRestorationHandler(app: UIApplication, userActivity: NSUserActivity, restorationHandler: (p1: NSArray<any>) => void) {
    console.log(`iOS.AppDelegate - Continue UserActivity ${userActivity}`);
    if (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {
      this.handleRouting(userActivity.webpageURL);
    }
    return true;
  }

  private handleRouting(url: any) {
    console.log(`iOS.AppDelegate Handle Routing: ${url.absoluteString}`);
    OnRouteToURL.next(url.absoluteString);
  }
}
