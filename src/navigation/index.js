import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'

import {
  fromRight
} from 'react-navigation-transitions'

import Guest from './Guest'
import Logged from './Logged'
import Loading from '@/screens/Loading'

import PermissaoLocalizacao from '@/screens/PermissaoLocalizacao'

const LoadingScreen = createStackNavigator({
  Loading,
  PermissaoLocalizacao
}, { 
  headerMode: 'none', 
  transitionConfig: () => fromRight() 
})

const Routes = createSwitchNavigator(
  {
    Guest,
    Logged: Logged,
    Loading: LoadingScreen,
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none',
  }
)

export default createAppContainer(Routes)