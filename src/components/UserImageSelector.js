import React, { Component } from 'react'
import { StyleSheet, View, Alert, Image } from 'react-native'
import RippleView from 'react-native-material-ripple'
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
    if (permission != 'authorized'){
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
      }).then(image => {
        this.setState({image})
        _reactComponent.props.onSelectImage(image)
      });
    } 
  }

  render() {

    let imageElement;

    if(this.state.image){
      imageElement = (
        <Image style={{
          width: '100%',
          height: '100%'
        }}
        source={{uri: `data:${this.state.image.mime};base64,${this.state.image.data}`}}
        ></Image>
      )
    }

    return (
      <View style={styles.container}>
        <RippleView style={styles.thumbnail} onPress={() => this.selectImage()}>
          {imageElement}
        </RippleView>
        <RippleView style={styles.cameraIcon} onPress={() => this.selectImage()}>
          <Icon name="camera-retro" size={20} color="white" />
        </RippleView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
    elevation: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    backgroundColor: "#353F4B",
    padding: 20,
    borderRadius: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#fff'
  }
})
