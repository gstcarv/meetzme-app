import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'

// Screens
import Principal from './screens/Principal'

const Guest = createStackNavigator(
  {
      Principal: {
        screen: Principal
      }
  },
  {
    headerMode: 'none',
    initialRouteName: "Principal"
  }
)

var logged = false;
const Routes = (logged) = createSwitchNavigator(
  {
    Guest
  },
  {
    initialRouteName: logged == false ? 'Guest' : ''
  }
)

export default createAppContainer(Routes)