import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ViewOverflow from 'react-native-view-overflow'

const TabBar = props => {
  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    navigation
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View style={S.container}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <View
            key={routeIndex}
            style={S.tabButton}
            onPress={() => {
              onTabPress({ route });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
          >
            {renderIcon({ route, focused: isRouteActive, tintColor })}
          </View>
        );
      })}
    </View>
  );
};

const S = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    borderTopWidth: 2,
    borderColor: "#f2f2f2"
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TabBar;

