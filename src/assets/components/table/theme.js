import {extendTheme} from '@chakra-ui/react'
import styles from './styles'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
    cssVarPrefix: 'chakra',
  },
  styles: {
    global: () => ({
      'html, body': {
        fontFamily: 'inherit !important',
        lineHeight: 'inherit !important',
        padding: '0 !important',
        margin: '0 !important',
        boxSizing: 'border-box',
      },
    }),
  },
  styles,
})
export default theme
