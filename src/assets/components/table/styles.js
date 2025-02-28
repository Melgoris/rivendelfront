import {color} from 'framer-motion'

const styles = {
  global: {
    '.table': {
      border: '1px solid #424242',
      display: 'table',
      // width: '100%',
    },
    '.tr': {
      display: 'table-row',
      width: '100%',
    },
    '.th, .td': {
      display: 'table-cell',
      // padding: '0.5rem',
      textAlign: 'center',
      border: '1px solid #424242',
      width: 'auto',
    },
    '.th': {
      fontWeight: 'bold',
      background: 'gray.900',
      textTransform: 'uppercase',
      color: '#858acb',
    },
    '.td': {
      background: 'gray.800',
      color: '#d1864e',
      lineHeight: '4px',
    },
    '.td > input': {
      width: '100%',
      textAlign: 'center',
      padding: 0,
      margin: 0,
      color: '#4a4a4a',
      background: '#ffffff',
      fontSize: '1rem',
    },
  },
}

export default styles
