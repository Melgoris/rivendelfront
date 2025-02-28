import charCardStyle from './charCardStyle.module.css'

const DropIndicator = ({beforeName, panel}) => {
  return (
    <div
      data-before={beforeName || '-1'}
      data-panel={panel}
      className={`${charCardStyle.indicator} opacity-1`}
    />
  )
}
export default DropIndicator
