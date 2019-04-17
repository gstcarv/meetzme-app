import { DefaultTheme } from 'react-native-paper';
import colors from '@/resources/colors'
import fonts from '@/resources/fonts'

export default {
  primary: {
    ...DefaultTheme,
    roundness: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primaryColor,
      accent: colors.primaryDark,
      background: "#fff",
      placeholder: "#cecece"
    },
    fonts: {
      regular: fonts.primary,
      medium: fonts.primaryMedium,
      light: fonts.primary,
      thin: fonts.primary
    }
  }
}