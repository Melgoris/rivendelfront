import tankImage from './tank.png'
import healImage from './healer.png'
import dpsImage from './dps.png'

import deathknightIco from './classIco/deathknight.png'
import druidIco from './classIco/druid.png'
import evokerIco from './classIco/evoker.png'
import hunterIco from './classIco/hunter.png'
import mageIco from './classIco/mage.png'
import monkIco from './classIco/monk.png'
import paladinIco from './classIco/paladin.png'
import priestIco from './classIco/priest.png'
import rogueIco from './classIco/rogue.png'
import shamanIco from './classIco/shaman.png'
import warlockIco from './classIco/warlock.png'
import warriorIco from './classIco/warrior.png'
import notFoundIco from './classIco/404.png'
import smallCardBg from './smallCardBg.png'

const role = {DPS: dpsImage, TANK: tankImage, HEALING: healImage}
const classIco = {
  Deathknight: deathknightIco,
  Druid: druidIco,
  Evoker: evokerIco,
  Hunter: hunterIco,
  Mage: mageIco,
  Monk: monkIco,
  Paladin: paladinIco,
  Priest: priestIco,
  Rogue: rogueIco,
  Shaman: shamanIco,
  Warlock: warlockIco,
  Warrior: warriorIco,
  notFound: notFoundIco,
}
const classColors = {
  'Death Knight': '#C41E3A',
  'Demon Hunter': '#A330C9',
  Druid: '#FF7C0A',
  Evoker: '#33937F',
  Hunter: '#AAD372',
  Mage: '#3FC7EB',
  Monk: '#00FF98',
  Paladin: '#F48CBA',
  Priest: '#FFFFFF',
  Rogue: '	#FFF468',
  Shaman: '#0070DD',
  Warlock: '#8788EE',
  Warrior: '#C69B6D',
}
export {role, classIco, smallCardBg, classColors}
