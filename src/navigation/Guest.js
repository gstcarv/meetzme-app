import { 
  createStackNavigator,
} from 'react-navigation'

import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

// Screens
import Principal from '@/screens/Principal'
import Login from '@/screens/Principal/Login'
import Cadastro from '@/screens/Principal/Cadastro'
import FinalizaCadastro from '@/screens/Principal/Cadastro/FinalizaCadastro'

export default createStackNavigator(
  {
    Principal,
    Login,
    Cadastro,
    FinalizaCadastro
  },
  {
    headerMode: 'none',
    initialRouteName: "Principal",
    transitionConfig: getSlideFromRightTransition
  }
)