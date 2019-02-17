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

import { TouchableRipple } from 'react-native-paper'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default class TabBarComponent extends React.Component {

  index = 0

  constructor() {
    super();
    this.state = {
      atualRouteIndex: 0,
    }

    this.lineOffset = new Animated.Value(20)
    this.routeButtonsPositions = []
  }


  moveLine() {
    const { atualRouteIndex } = this.state

    let posX = this.routeButtonsPositions[atualRouteIndex].x;
    Animated.spring(this.lineOffset, {
      toValue: posX + 20,
      duration: 350,
      easing: Easing.easing,
      useNativeDriver: true,
      bounciness: 10
    }).start()
  }

  componentDidUpdate() {
    this.moveLine()
  }

  _onButtonLayout(e, index) {
    let posX = e.nativeEvent.layout.x
    this.routeButtonsPositions.push({
      x: posX
    })
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

    return (
      <View style={styles.container}>
        {

          routes.map((route, routeIndex) => {
            const isRouteActive = routeIndex === activeRouteIndex;
            const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
            const isMainButton = routeIndex == 2

            return (
              <TouchableRipple
                key={routeIndex}
                onLayout={(e) => this._onButtonLayout(e, routeIndex)}
                onPress={(e) => {
                  if (!isMainButton) {
                    this.setState({ atualRouteIndex: routeIndex })
                    onTabPress({ route });
                  }
                }}
                useForeground={true}
                rippleColor={"#ddd"}
                borderless={!isMainButton}>
                <View style={styles.tabButton}
                >
                  {renderIcon({ route, focused: isRouteActive, tintColor })}

                  {
                    !isMainButton
                      ? <Text style={[styles.labelText, { color: tintColor }]}>{getLabelText({ route })}</Text>
                      : null
                  }

                </View>
              </TouchableRipple>
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

