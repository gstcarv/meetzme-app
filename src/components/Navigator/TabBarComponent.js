import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
} from "react-native";

import { TouchableRipple } from 'react-native-paper'

import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

import ToolbarTitle from '@/store/ToolbarTitle'

import EventBus from 'eventing-bus';

import { withNavigation } from 'react-navigation'

class TabBarComponent extends PureComponent {

  atualRouteIndex = 0

  lineOffset = new Animated.Value(20)
  routeButtonsPositions = []

  componentDidMount() {
    // Move a linha da tabbar quando a rota é alterada de modo indireto (sem clicar nas tabs)
    EventBus.on('bindTabLine', _ => {
      const tabIndex = this.props.navigation.state.index;
      if(tabIndex != this.atualRouteIndex){
        this.atualRouteIndex = tabIndex ? tabIndex : 0
        this.moveLine();
      }
    })
  }

  moveLine() {
    const { atualRouteIndex } = this

    let posX = this.routeButtonsPositions[atualRouteIndex].x;
    Animated.spring(this.lineOffset, {
      toValue: posX + 20,
      duration: 350,
      easing: Easing.easing,
      useNativeDriver: true,
      bounciness: 12.5
    }).start()
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
            const isMainButton = routeIndex == 2;

            return (
              <TouchableRipple
                key={routeIndex}
                onLayout={(e) => this._onButtonLayout(e, routeIndex)}
                onPress={async (e) => {
                  if (!isMainButton) {
                    this.atualRouteIndex = routeIndex;
                    this.moveLine()
                    ToolbarTitle.set(getLabelText({ route }))
                    onTabPress({ route });
                  }
                }}
                useForeground={true}
                rippleColor={"#eaeaea"}
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

export default withNavigation(TabBarComponent)

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
    fontFamily: fonts.primaryMedium,
  }
});

