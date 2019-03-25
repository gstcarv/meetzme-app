package com.meetzme.app_location_service.services;

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.content.Context;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.meetzme.app_location_service.AppBackgroundLocationListenerModule;

public class LocationListenerService extends Service {

    private static final String CHANNEL_ID = "meetzme_notification_channel";
    private static final String TAG = "APP_LOCATION";

    LocationManager mLocationManager = null;

    Context reactContext;

    LocationListener mLocationListener = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            Log.wtf(TAG, "onLocationChanged");
            Log.d(TAG, location.toString());
            ReactApplicationContext appContext = AppBackgroundLocationListenerModule.REACT_APP_CONTEXT;

            if(appContext != null){

                WritableMap locationMap = Arguments.createMap();
                locationMap.putDouble("latitude", location.getLatitude());
                locationMap.putDouble("longitude", location.getLongitude());

                appContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                           .emit("onLocationChanged", locationMap);
            }
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            Log.wtf(TAG, "Status Changed");
        }

        @Override
        public void onProviderEnabled(String provider) {
            Log.wtf(TAG, "Provider Enabled");
        }

        @Override
        public void onProviderDisabled(String provider) {
            Log.wtf(TAG, "Provider Disabled");
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        Bundle extras = intent.getExtras();
        Log.wtf(TAG, "Extra: " + extras.get("reactContext"));
        // this.reactContext = extras.get("reactContext");
        return null;
    }

    @SuppressLint("MissingPermission")
    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void onCreate() {
        mLocationManager = getSystemService(LocationManager.class);
        Log.wtf(TAG,"onCreate");

        if(isPermissionGranted()){
            mLocationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 5, mLocationListener);
        }

    }

    private boolean isPermissionGranted(){
        int permissionCheck = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION);
        if (permissionCheck == PackageManager.PERMISSION_GRANTED) {
            Log.wtf(TAG, "Location Permission Granted");
            return true;
        } else {
            Log.wtf(TAG, "Location Permission Denied");
            return false;
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        startForeground(1, this.getNotification());
        Log.wtf(TAG, "onStartCommand");
        return START_STICKY;
    }

    private Notification getNotification(){
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Service is Running")
                .setContentText("I'm an foreground Service")
                .setContentInfo("MyApp")
                .build();
        return notification;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}