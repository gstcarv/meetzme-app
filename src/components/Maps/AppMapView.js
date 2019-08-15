import React, { Component } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Snackbar from 'react-native-snackbar'

import LoggedUserStore from '@/store/LoggedUserStore';

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

    LoggedUserStore.getLocation()
    .then(async coords => {
      if (!this.isUnmounted) {
        this.setState({
          userLocation: coords,
        })
        if(this.props.onPositionLoaded) this.props.onPositionLoaded(this.state.userLocation)
        await AsyncStorage.setItem("USER_LAST_LOCATION", JSON.stringify(coords));
      }
    })
    .catch(err => {
      if (!this.isUnmounted) {
        Snackbar.show({
          title: 'Ocorreu um erro ao determinar sua localização atual',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#b71b25'
        })
        if(this.props.onPositionLoaded) this.props.onPositionLoaded(this.state.userLocation)
      }
    })
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {

    this.userRegion = {
      center: {
        latitude: this.state.userLocation.latitude,
        longitude: this.state.userLocation.longitude,
      },
      pitch: 3,
      heading: 5,
      zoom: 14,
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
        camera={this.userRegion}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={false}
        showsCompass={false}
        showsBuildings={false}
        showsIndoors={false}
        showsTraffic={false}
        maxZoomLevel={16.7}
        rotateEnabled={false}
        moveOnMarkerPress={false}
        customMapStyle={require("@assets/mapstyle.json")}
        ref={ref => this.map = ref}
        mapPadding={{
          left: 22,
          right: 22,
        }}
        toolbarEnabled={false}
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
