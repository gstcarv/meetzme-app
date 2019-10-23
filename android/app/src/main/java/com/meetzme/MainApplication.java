package com.meetzme;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import com.rnnestedscrollview.RNNestedScrollViewPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.bottomsheetbehavior.BottomSheetBehaviorPackage;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage; 
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; 
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.meetzme.app_location_service.AppBackgroundLocationListenerPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFusedLocationPackage(),
            new RNSpinkitPackage(),
            new RNAndroidLocationEnablerPackage(),
            new RNNestedScrollViewPackage(),
            new ReanimatedPackage(),
            new RNGooglePlacesPackage(),
            new MapsPackage(),
            new BottomSheetBehaviorPackage(),
            new SnackbarPackage(),
            new PickerPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseFirestorePackage(),
            new RNFirebaseStoragePackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new AppBackgroundLocationListenerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
