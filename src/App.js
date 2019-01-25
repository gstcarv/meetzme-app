import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation'

import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

// Screens
import Principal from './screens/Principal'
import Login from './screens/Principal/Login'
import Cadastro from './screens/Principal/Cadastro'
import FinalizaCadastro from './screens/Principal/Cadastro/FinalizaCadastro'

const Guest = createStackNavigator(
  {
      Principal: {
        screen: Principal
      },
      Login: {
        screen: Login
      },
      Cadastro: {
        screen: Cadastro
      },
      FinalizaCadastro: {
        screen: FinalizaCadastro
      }
  },
  {
    headerMode: 'none',
    initialRouteName: "FinalizaCadastro",
    transitionConfig: getSlideFromRightTransition
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