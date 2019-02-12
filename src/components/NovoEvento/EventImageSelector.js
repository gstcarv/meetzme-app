import React, { Component } from 'react'
import { StyleSheet, View, Alert, TouchableNativeFeedback, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Permissions from 'react-native-permissions'
import ImagePicker from 'react-native-image-crop-picker';

export default class UserImageSelector extends Component {

  constructor() {
    super();
    this.state = {
      image: null
    }
  }

  async selectImage() {
    const permission = await Permissions.check("storage");
    if (permission != 'authorized') {
      Alert.alert(
        "Permissão",
        "Para escolher a foto do evento, você precisa conceder a permissão ao aplicativo",
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
        width: 1280,
        height: 720,
        cropping: true,
        cropperToolbarTitle: "MeetzMe",
        includeBase64: true,
        cropperCircleOverlay: true,
        enableRotationGesture: false,
        hideBottomControls: true,
        showCropGuidelines: false,
        compressImageQuality: .6
      }).then(image => {
        this.setState({ image })
        // _reactComponent.props.onSelectImage(image)
      });
    }
  }

  render() {

    let imageElement;

    if (this.state.image) {
      console.log(this.state.image)
      imageElement = (
        <Image style={{
          width: '100%',
          height: '100%'
        }}
          source={{ uri: `data:${this.state.image.mime};base64,${this.state.image.data}` }}
        ></Image>
      )
    } else {
      imageElement = (
        <Icon name="camera-retro" size={40} color="#ddd" />
      )
    }

    return (
      <TouchableNativeFeedback  onPress={() => this.selectImage()}
        useForeground={true}>
        <View style={styles.container}>
          {imageElement}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    borderStyle: 'dashed',
    width: '100%',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 3
  },
})
