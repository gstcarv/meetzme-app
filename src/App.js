import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation'

import Guest from './routes/Guest'
import Logado from './routes/Logged'

const Routes = createSwitchNavigator(
  {
    Guest,
    Logado
  },
  {
    initialRouteName: 'Guest'
  }
)

export default createAppContainer(Routes)