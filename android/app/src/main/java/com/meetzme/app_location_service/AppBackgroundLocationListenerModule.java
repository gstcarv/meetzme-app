
package com.meetzme.app_location_service;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import android.content.Context;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningServiceInfo;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.os.Build;
import androidx.appcompat.app.AppCompatActivity;

import com.meetzme.app_location_service.services.LocationListenerService;
import com.meetzme.Channels;

public class AppBackgroundLocationListenerModule extends ReactContextBaseJavaModule {

  public static ReactApplicationContext REACT_APP_CONTEXT = null;

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
    if(!isLocationServiceRunning()){
      createNotificationChannel();
      Intent serviceIntent = new Intent(getContext(), LocationListenerService.class);
      serviceIntent.putExtra("reactContext", getContext().toString());
      getContext().startService(serviceIntent);
    }
  }

  @ReactMethod
  public void stopService() {
    if(isLocationServiceRunning()){
      Intent serviceIntent = new Intent(getContext(), LocationListenerService.class);
      getContext().startService(serviceIntent);
    }
  }

  private void createNotificationChannel(){
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
        NotificationChannel channel = new NotificationChannel(
                Channels.SHARE_LOCATION,
                "Compartilhar Localização",
                NotificationManager.IMPORTANCE_DEFAULT
        );

        NotificationManager manager = getContext().getSystemService(NotificationManager.class);
        manager.createNotificationChannel(channel);
    }
  }

  private boolean isLocationServiceRunning() {
    ActivityManager manager = (ActivityManager) getContext().getSystemService(Context.ACTIVITY_SERVICE);
    for (RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
        if (LocationListenerService.class.getName().equals(service.service.getClassName())) {
            return true;
        }
    }
    return false;
  }

}