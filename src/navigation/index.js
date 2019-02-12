import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'

import Guest from './Guest'
import Logado from './Logged'

import Loading from '@/screens/Loading'

const LoadingScreen = createStackNavigator({
  Loading
}, { headerMode: 'none' })

const Routes = createSwitchNavigator(
  {
    Guest,
    Logado,
    Loading: LoadingScreen
  },
  {
    initialRouteName: 'Loading'
  }
)

export default createAppContainer(Routes)