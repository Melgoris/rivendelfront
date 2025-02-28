import React from 'react'
import ContentLoader from 'react-content-loader'

const SkeletonCards = ({panel}) => {
  return (
    <div style={{marginTop: '-5px'}}>
      <ContentLoader
        speed={2}
        width={panel ? 190 : 103}
        height={panel ? 160 : 42}
        viewBox={panel ? '0 0 190 90' : '0 0 160 42'}
        backgroundColor='rgba(0, 0, 0, 0.4)'
        foregroundColor='#8f8f8f'
        style={
          panel
            ? {width: '190px', height: '100px'}
            : {width: '160px', height: '42px'}
        }
      >
        {panel ? (
          <rect x='0' y='0' rx='10' ry='10' width='190' height='90' />
        ) : (
          <rect x='0' y='0' rx='10' ry='10' width='160' height='42' />
        )}
      </ContentLoader>
    </div>
  )
}

export default SkeletonCards
