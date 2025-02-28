import dh_buff from './ability_demonhunter_empowerwards.jpg'
import war_buff from './ability_warrior_battleshout.jpg'
import priest_buff from './spell_holy_wordfortitude.jpg'
import mage_buff from './spell_holy_arcaneintellect.jpg'
import druid_buff from './druid_mark.jpg'
import shaman_buff from './windfury.jpg'
import warlock_here from './classicon_warlock.jpg'

const RAID_BUFFS = [
  {
    class: 'Demon Hunter',
    buff: dh_buff,
    buffName: 'Chaos Brand',
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: '5% маг. урона',
  },
  {
    class: 'Warrior',
    buffName: 'Battle Shout',
    buff: war_buff,
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: '5% АП',
  },
  {
    class: 'Priest',
    buffName: 'Fortitude',
    buff: priest_buff,
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: '5% стамины',
  },
  {
    class: 'Mage',
    buffName: 'Arcane Intellect',
    buff: mage_buff,
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: '5% инты',
  },
  {
    class: 'Druid',
    buffName: 'Wild Mark',
    buff: druid_buff,
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: '3% версы',
  },
  {
    class: 'Shaman',
    buffName: 'Skyfury',
    buff: shaman_buff,
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: 'Виндфури',
  },
  {
    class: 'Warlock',
    buffName: 'Vorota',
    buff: warlock_here,
    noExists: {filter: 'grayscale(100%) brightness(80%)'},
    title: 'Варлок',
  },
]

export default RAID_BUFFS
