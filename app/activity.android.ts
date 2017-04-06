import {setActivityCallbacks, AndroidActivityCallbacks} from 'ui/frame';

@JavaProxy('com.my.company.MainActivity')
class Activity extends android.app.Activity {

  private _callbacks: AndroidActivityCallbacks;

  protected onCreate(savedInstanceState: android.os.Bundle): void {
    if (!this._callbacks) {
      setActivityCallbacks(this);
    }
    this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
    console.info(`MainActivity.onCreate`);
  }

  protected onNewIntent(intent: android.content.Intent): void {
    super.onNewIntent(intent);
    const intentData = intent.getData();
    console.info(`MainActivity.onNewIntent with data: ${intentData}`);
  }
}
