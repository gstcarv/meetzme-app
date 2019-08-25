import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'
import {
  TouchableRipple,
  Checkbox,
  Surface,
  Text
} from 'react-native-paper'

import fonts from '@/resources/fonts'
import colors from '@/resources/colors'

export default class ConvidadosListRow extends Component {

  constructor(props){
    super()
    this.state = {
      isActive: props.isActive || false
    }
  }

  toggleActive(){
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
    if(this.props.onToggleSelect) this.props.onToggleSelect(this.props.data.id)
  }
  
  render() {

    const { name, username, photoURL } = this.props.data;
    const { isActive } = this.state;

    return (
      <TouchableRipple style={styles.rowContainer}
        onPress={() => this.toggleActive()}>
        <View style={styles.contactContainer}>
          <Checkbox
             color="#80A6E8"
             status={isActive ? 'checked' : 'unchecked'}
          />
          <Surface style={styles.avatarSurface}>
            <Image source={{ uri: photoURL }}
              style={[styles.profileImage, {
                borderColor: this.state.isActive ? "#80A6E8" : "white"
              }]}
            />
          </Surface>
          <View style={styles.contactInfoContainer}>
            <Text style={styles.rowTitle}>{name}</Text>
            <Text style={styles.rowSubtitle}>{username}</Text>
          </View>
        </View>
      </TouchableRipple>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ECECEC"
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 100,
    borderWidth: 3,
  },
  avatarSurface: {
    borderRadius: 100,
    elevation: 4,
    marginLeft: 10
  },
  contactInfoContainer: {
    marginLeft: 15
  },
  rowTitle: {
    fontFamily: fonts.primaryBold,
    color: colors.primaryColor,
    fontSize: 15
  },
  rowSubtitle: {
    color: "#919191"
  }
})
