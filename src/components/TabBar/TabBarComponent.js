import React from "react";
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Easing,
  TouchableNativeFeedback,
  Text
} from "react-native";

import TouchableRipple from 'react-native-material-ripple'
import TouchableScale from 'react-native-touchable-scale'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default class TabBarComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      atualRouteIndex: 0
    }

    this.lineOffset = new Animated.Value(0)
  }


  moveLine(){
    this.refs["tabButton-" + this.state.atualRouteIndex]
    .measure((fx, fy, width, height, px, py) => {
      Animated.spring(this.lineOffset, {
        toValue: px + 20,
        duration: 350,
        easing: Easing.easing,
        useNativeDriver: true,
        bounciness: 10
      }).start()
    })
  }

  componentDidMount(){
    this.moveLine()
  }

  componentDidUpdate() {
    this.moveLine()
  }

  render() {
    const {
      renderIcon,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getLabelText,
      navigation
    } = this.props;

    const { routes, index: activeRouteIndex } = navigation.state;

    const mainButtonIndex = 2;

    return (
      <View style={styles.container}>
        {

          routes.map((route, routeIndex) => {
            const isRouteActive = routeIndex === activeRouteIndex;
            const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;


            return (
              <TouchableHighlight
                key={routeIndex}
                ref={"tabButton-" + routeIndex}
                onPress={(e) => {
                  if(routeIndex != mainButtonIndex){
                    this.setState({ atualRouteIndex: routeIndex })
                    onTabPress({ route });
                  }
                }}
                underlayColor="transparent" >
                <View style={styles.tabButton}
                >
                  {renderIcon({ route, focused: isRouteActive, tintColor })}

                  {
                    routeIndex != mainButtonIndex
                    ? <Text style={[styles.labelText, { color: tintColor }]}>{ getLabelText({ route }) }</Text>
                    : null
                  }

                </View>
              </TouchableHighlight>
            );
          }
          )
        }

        <Animated.View style={[styles.navigationLine, {
          transform: [
            {
              translateX: this.lineOffset
            }
          ]
        }]} />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 2,
    borderColor: "#f2f2f2",
    backgroundColor: "#fff",
    justifyContent: "space-around"
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 83,
    justifyContent: 'space-around',
    marginTop: 6
  },
  navigationLine: {
    backgroundColor: colors.primaryColor,
    height: 4,
    width: 40,
    position: 'absolute',
    top: 0,
    left: 0
  },
  labelText: {
    fontSize: 10,
    fontFamily: fonts.primary,
  }
});

// export default TabBar;

