import React, { Component } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Snackbar from 'react-native-snackbar'

export default class AppMapView extends Component {

  constructor() {
    super()
    this.state = {
      userLocation: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  async componentDidMount() {

    const userLastLocation = await AsyncStorage.getItem("USER_LAST_LOCATION");
    if (userLastLocation) {
      this.setState({
        userLocation: JSON.parse(userLastLocation),
      })
      if(this.props.onPositionLoaded) this.props.onPositionLoaded(this.state.userLocation)
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        if (!this.isUnmounted) {
          this.setState({
            userLocation: pos.coords,
          })
          if(this.props.onPositionLoaded) this.props.onPositionLoaded(this.state.userLocation)
          await AsyncStorage.setItem("USER_LAST_LOCATION", JSON.stringify(pos.coords));
        }
      },
      async err => {
        if (!this.isUnmounted) {
          Snackbar.show({
            title: 'Ocorreu um erro ao determinar sua localização atual',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#b71b25'
          })
          if(this.props.onPositionLoaded) this.props.onPositionLoaded(this.state.userLocation)
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    )
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {

    const userRegion = {
      latitude: this.state.userLocation.latitude,
      longitude: this.state.userLocation.longitude,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    }

    const getChildren = () => {
      const { children } = this.props
      if(typeof children == 'array'){
        return children.map(children => children)
      } else if (typeof children == 'object'){
        return children
      }
    }

    return (
      <MapView style={[styles.mapview, this.props.style]}
        region={userRegion}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={false}
        showsCompass={false}
        showsBuildings={false}
        maxZoomLevel={16.7}
        rotateEnabled={false}
        moveOnMarkerPress={false}
        customMapStyle={require("@assets/mapstyle.json")}
        ref={ref => this.map = ref}
        {...this.props}>

        {
          getChildren()
        }

      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  mapview: {
    flex: 1
  }
})
