const $baseFont = 20
function pxtorem(px) {
  return Number(px / $baseFont).toFixed(3) + 'rem'
}
module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    width: {
      full: '100%',
      screen: '100vw',
      0: '0',
      13: pxtorem(13),
      16: pxtorem(16),
      18: pxtorem(18),
      20: pxtorem(20),
      22: pxtorem(22),
      24: pxtorem(24),
      30: pxtorem(30),
      56: pxtorem(56),
      60: pxtorem(60),
      70: pxtorem(70),
      110: pxtorem(110),
      130: pxtorem(130)
    },
    height: {
      full: '100%',
      screen: '100vh',
      0: '0',
      13: pxtorem(13),
      16: pxtorem(16),
      18: pxtorem(18),
      20: pxtorem(20),
      22: pxtorem(22),
      25: pxtorem(25),
      30: pxtorem(30),
      40: pxtorem(40),
      50: pxtorem(50),
      55: pxtorem(55),
      60: pxtorem(60),
      80: pxtorem(80),
      100: pxtorem(100),
      120: pxtorem(120),
      130: pxtorem(130),
      200: pxtorem(200)
    },
    lineHeight: {
      none: '1',
      15: pxtorem(15),
      17: pxtorem(17),
      20: pxtorem(20),
      25: pxtorem(25),
      40: pxtorem(40),
      50: pxtorem(50)
    },
    fontSize: {
      11: pxtorem(11),
      12: pxtorem(12),
      13: pxtorem(13),
      14: pxtorem(14),
      15: pxtorem(15),
      16: pxtorem(16),
      17: pxtorem(17),
      18: pxtorem(18),
      19: pxtorem(19),
      20: pxtorem(20),
      21: pxtorem(21),
      22: pxtorem(22),
      24: pxtorem(24),
      30: pxtorem(30),
      32: pxtorem(32),
      40: pxtorem(40)
    },
    spacing: {
      auto: 'auto',
      1: '1px',
      2: pxtorem(2),
      3: pxtorem(3),
      4: pxtorem(4),
      5: pxtorem(5),
      6: pxtorem(6),
      7: pxtorem(7),
      8: pxtorem(8),
      10: pxtorem(10),
      12: pxtorem(12),
      14: pxtorem(14),
      15: pxtorem(15),
      16: pxtorem(16),
      17: pxtorem(17),
      18: pxtorem(18),
      20: pxtorem(20),
      30: pxtorem(30),
      25: pxtorem(25),
      27: pxtorem(27),
      35: pxtorem(35),
      40: pxtorem(40),
      45: pxtorem(45),
      50: pxtorem(50),
      80: pxtorem(80)
    },
    boxShadow: {
      default: `0 ${pxtorem(10)} ${pxtorem(15)} ${pxtorem(
        -3
      )} rgba(0, 0, 0, .1), 0 ${pxtorem(4)} ${pxtorem(6)} ${pxtorem(
        -2
      )} rgba(0, 0, 0, .05)`,
      top: `0 ${pxtorem(-5)} ${pxtorem(15)} ${pxtorem(-3)} rgba(0, 0, 0, .1)`,
      bottom: `0 ${pxtorem(5)} ${pxtorem(15)} ${pxtorem(-3)} rgba(0, 0, 0, .1)`
    },
    borderRadius: {
      default: pxtorem(4),
      none: '0!important',
      full: '9999px',
      0: '0!important',
      8: pxtorem(8),
      10: pxtorem(10),
      12: pxtorem(12)
    },
    colors: {
      mask: '#767778',
      primary: {
        default: '#FF4400',
        light: '#FF9029',
        lighter: '#FFC526',
        tel: '#088AFF'
      },
      white: '#fff',
      black: {
        default: '#222',
        same: '#666',
        1: '#999',
        2: '#AFB0B1',
        3: '#767778',
        4: '#000000',
        5: '#333',
        6: '#B7B7B7',
        7: '#666'
      },
      red: {
        default: '#FF4400',
        dark: '#E30606',
        light: '#FF9029',
        lighter: '#E30606',
        number: '#FF5F0F',
        price: '#E81D25',
        map: '#FF530C',
        bg: '#FF4949',
        reward: '#F02C2C',
        hot: '#FF8500',
        distance: '#FF530C'
      },
      green: {
        default: '#00C576'
      },
      gray: {
        default: '#D8D8D8',
        light: '#F9FAFB',
        sm: '#b5b4b4',
        lg: '#eeeeee',
        lighter: '#f0f2f5'
      }
    },
    flex: {
      1: '1 1 0%',
      1.5: '1.5 1.5 0%'
    }
  },
  variants: {},
  plugins: []
}
