import React, { Component } from 'react'
import { 
  ImageBackground, 
  StyleSheet, 
  View, 
  ActivityIndicator 
} from 'react-native'
import Permissions from 'react-native-permissions'
import ImagePicker from 'react-native-image-crop-picker';

import colors from '@/resources/colors'

import {
  FAB
} from 'react-native-paper'

import { inject, observer } from 'mobx-react/native'

@inject('LoggedUserStore')
@observer
export default class UserPhotoThumbnail extends Component {

  constructor(){
    super()
    this.state = {
      loading: false
    }
  }

  async selectImage() {
    const permission = await Permissions.check("storage");
    if (permission != 'authorized') {
      Alert.alert(
        "Permissão",
        "Para escolher sua foto de perfil, você precisa conceder a permissão ao aplicativo",
        [
          {
            text: "Ok",
            onPress: () => Permissions.request("storage")
          }
        ]
      );
    } else {
      const _reactComponent = this;
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        cropperToolbarTitle: "MeetzMe",
        includeBase64: true,
        cropperCircleOverlay: true,
        enableRotationGesture: false,
        hideBottomControls: true,
        showCropGuidelines: false,
        compressImageQuality: .6
      }).then(async image => {
        this.setState({ loading: true })
        await this.props.LoggedUserStore.updatePhoto(image)
        this.setState({ loading: false })
      });
    }
  }

  render() {

    var loadingStyle = {
      opacity: this.state.loading ? .4 : 1
    }

    return (
      <View style={[this.props.style]}>
        <View
          style={[styles.container]}>
          <View>
            <ImageBackground
              source={{ uri: this.props.photoURL }}
              style={[styles.image]}
              imageStyle={[{ borderRadius: 100 }, loadingStyle]}>
              
              {
                this.state.loading &&
                <ActivityIndicator size="large" color="#fff" />
              }

            </ImageBackground>
          </View>
        </View>
        <FAB
          style={styles.fab}
          icon="camera-alt"
          onPress={() => this.selectImage()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    borderRadius: 300,
    width: 230,
    height: 230,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#20262d"
  },
  fab: {
    position: 'absolute',
    bottom: 11,
    right: 11,
  }
})
