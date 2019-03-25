
package com.meetzme.app_location_service;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;

import com.meetzme.app_location_service.services.LocationListenerService;

public class AppBackgroundLocationListenerModule extends ReactContextBaseJavaModule {

  public static ReactApplicationContext REACT_APP_CONTEXT = null;

  private static final String CHANNEL_ID = "meetzme_notification_channel";

  public AppBackgroundLocationListenerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    REACT_APP_CONTEXT = reactContext;
  }

  @Override
  public String getName() {
    return "AppBackgroundLocationListener";
  }

  private ReactApplicationContext getContext(){
    return REACT_APP_CONTEXT;
  }

  @ReactMethod
  public void startService() {
    createNotificationChannel();
    Intent serviceIntent = new Intent(getContext(), LocationListenerService.class);
    serviceIntent.putExtra("reactContext", getContext().toString());
    getContext().startService(serviceIntent);
  }

  @ReactMethod
  public void stopService() {
    Intent serviceIntent = new Intent(getContext(), LocationListenerService.class);
    getContext().startService(serviceIntent);
  }

  private void createNotificationChannel(){
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "ServiceChannel",
                NotificationManager.IMPORTANCE_DEFAULT
        );

        NotificationManager manager = getContext().getSystemService(NotificationManager.class);
        manager.createNotificationChannel(channel);
    }
}

}