import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'

import {
  fromLeft
} from 'react-navigation-transitions'

import Guest from './Guest'
import Logged from './Logged'
import Loading from '@/screens/Loading'

const LoadingScreen = createStackNavigator({
  Loading
}, { headerMode: 'none' })

const Routes = createSwitchNavigator(
  {
    Guest,
    Logged: Logged,
    Loading: LoadingScreen
  },
  {
    initialRouteName: 'Guest',
    headerMode: 'none',
  }
)

export default createAppContainer(Routes)