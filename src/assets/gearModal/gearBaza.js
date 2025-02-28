import Havoc from './classArts/demonhunter/havocDH.jpg'
import Vengeance from './classArts/demonhunter/tankDH.jpg'
import bloodDK from './classArts/DK/bloodDK.jpg' //Blood
import frostdDK from './classArts/DK/frostDK.jpg' //Frost
import Unholy from './classArts/DK/unholyDK.jpg'
import Augmentation from './classArts/drakon/augDrak.jpg'
import Devastation from './classArts/drakon/dpsDrak.jpg'
import Preservation from './classArts/drakon/healDrak.jpg'
import Feral from './classArts/druid/druidFeral.jpg'
import Guardian from './classArts/druid/druidTank_v2.jpg'
import Balance from './classArts/druid/owlDruid.jpg'
import RestorationDru from './classArts/druid/restorDru_v2.jpg'
import BeastMastery from './classArts/hunter/bmHunter.jpg'
import Marksmanship from './classArts/hunter/MMhunter.jpg'
import Survival from './classArts/hunter/survHunter_v2.jpg'
import Arcane from './classArts/mage/arcaneMage_V2.jpg'
import Frost from './classArts/mage/frostMage.jpg' //Frost
import Fire from './classArts/mage/fireMage.jpg' //Fire
import Mistweaver from './classArts/monk/MMonk.jpg'
import Brewmaster from './classArts/monk/tank_v2.jpg'
import Windwalker from './classArts/monk/tankMonk.jpg'
import holyPal from './classArts/paladin/holyPaladin.jpg' //Holy
import protPal from './classArts/paladin/protPaladin.jpg' //Protection
import Retribution from './classArts/paladin/retPaladin.jpg'
import Discipline from './classArts/priest/DCPriest.jpg'
import Holy from './classArts/priest/holyPrist.jpg'
import Shadow from './classArts/priest/shadowPriest.jpg'
import Outlaw from './classArts/rogue/combatRogue.jpg'
import Assassination from './classArts/rogue/mutRogue.jpg'
import Subtlety from './classArts/rogue/SSrogue.jpg'
import Elemental from './classArts/shaman/eleShaman.jpg'
import Enhancement from './classArts/shaman/enchShaman.jpg'
import Restoration from './classArts/shaman/restorShaman.jpg'
import Arms from './classArts/war/armsWar.jpg'
import Fury from './classArts/war/furyWar.jpg'
import protWar from './classArts/war/protWar.jpg' //Protection
import Affliction from './classArts/warlock/affliWarlock.jpg'
import Demonology from './classArts/warlock/demoWarlock.jpg'
import Destruction from './classArts/warlock/DestroWarlock.jpg'
import alliance from './classArts/banners/allyBanner.png'
import horde from './classArts/banners/hordeBanner.png'

export const CLASS_COLORS = {
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
export const BANNERS_ = {
  alliance,
  horde,
}
export const SPECS_ = {
  Havoc,
  Vengeance,
  Blood: bloodDK,
  Frost: frostdDK,
  Unholy,
  Augmentation,
  Devastation,
  Preservation,
  Feral,
  Guardian,
  Balance,
  RestorationDru,
  BeastMastery,
  Marksmanship,
  Survival,
  Arcane,
  Frost,
  Fire,
  Mistweaver,
  Brewmaster,
  Windwalker,
  holyPal,
  protPal,
  Retribution,
  Discipline,
  Holy,
  Shadow,
  Outlaw,
  Assassination,
  Subtlety,
  Elemental,
  Enhancement,
  Restoration,
  Arms,
  Fury,
  protWar,
  Affliction,
  Demonology,
  Destruction,
}
export const LEFT_ITEMS = [
  'head',
  'neck',
  'shoulder',
  'back',
  'chest',
  'shirt',
  'tabard',
  'wrist',
]
export const RIGHT_ITEMS = [
  'hands',
  'waist',
  'legs',
  'feet',
  'finger1',
  'finger2',
  'trinket1',
  'trinket2',
]

export const WEAPONS = ['mainhand', 'offhand']
const ARMOR_SET = {LEFT_ITEMS, RIGHT_ITEMS, WEAPONS, SPECS_}
export default ARMOR_SET
