import { ReplaySubject } from 'rxjs/ReplaySubject';
import { setActivityCallbacks, AndroidActivityCallbacks } from 'ui/frame';

export var AndroidOnRouteToURL = new ReplaySubject<string>();

@JavaProxy('com.my.company.MainActivity')
export class Activity extends android.app.Activity {

    private _callbacks: AndroidActivityCallbacks;

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
        console.info('MainActivity.onCreate');

        const creationIntent = this.getIntent();
        this.handleIntent(creationIntent);
    }

    protected onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    protected onStart(): void {
        this._callbacks.onStart(this, super.onStart);
        console.info(`MainActivity.onStart`);
    }

    protected onStop(): void {
        this._callbacks.onStop(this, super.onStop);
        console.info(`MainActivity.onStop`);
    }

    protected onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
        console.info(`MainActivity.onDestroy`);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
        console.info(`MainActivity.onBackPressed`);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
        console.info(`MainActivity.onRequestPermissionsResult ${requestCode}`);
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        console.info(`MainActivity.onActivityResult`);
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }

    protected onNewIntent(intent: android.content.Intent): void {
        super.onNewIntent(intent);
        console.info('MainActivity.onNewIntent');
        this.handleIntent(intent);
    }

    private handleIntent(intent: android.content.Intent) {
        const action = intent.getAction();
        const dataStr = intent.getDataString();
        console.info(`MainActivity.handleIntent: [${action}] ${dataStr}`);
        if (action === android.content.Intent.ACTION_VIEW && dataStr !== null) {
            AndroidOnRouteToURL.next(dataStr);
        }
    }
}
