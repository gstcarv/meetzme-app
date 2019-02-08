import { createStackNavigator } from 'react-navigation'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import { fromLeft, fromRight } from 'react-navigation-transitions';

// Screens
import Principal from '@/screens/Principal'
import Login from '@/screens/Principal/Login'
import Cadastro from '@/screens/Principal/Cadastro'
import FinalizaCadastro from '@/screens/Principal/Cadastro/FinalizaCadastro'

export default createStackNavigator(
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
    initialRouteName: "Principal",
    transitionConfig: () => fromRight(400)
  }
)