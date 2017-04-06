import { EventEmitter } from '@angular/core';
import {setActivityCallbacks, AndroidActivityCallbacks} from 'ui/frame';

export var OnRouteToURL = new EventEmitter<string>();

@JavaProxy('com.my.company.MainActivity')
export class Activity extends android.app.Activity {

  private _callbacks: AndroidActivityCallbacks;

  protected onCreate(savedInstanceState: android.os.Bundle): void {
      if (!this._callbacks) {
          setActivityCallbacks(this);
      }

      this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
      console.info(`MainActivity.onCreate`);
  }

  protected onSaveInstanceState(outState: android.os.Bundle): void {
      this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
  }

  protected onStart(): void {
      this._callbacks.onStart(this, super.onStart);
  }

  protected onStop(): void {
      this._callbacks.onStop(this, super.onStop);
  }

  protected onDestroy(): void {
      this._callbacks.onDestroy(this, super.onDestroy);
  }

  public onBackPressed(): void {
      this._callbacks.onBackPressed(this, super.onBackPressed);
  }

  public onRequestPermissionsResult(requestCode: number, permissions: Array<String>, grantResults: Array<number>): void {
      this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
  }

  protected onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
      this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
  }

  protected onNewIntent(intent: android.content.Intent): void {
    super.onNewIntent(intent);
    console.info(`MainActivity.onNewIntent with data: ${intent.getData()}`);
    
    if (intent.getAction() === android.content.Intent.ACTION_VIEW) {
      const dataStr = intent.getDataString();
      OnRouteToURL.next(dataStr);
    }
  }
}
