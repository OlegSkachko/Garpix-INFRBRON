import React from 'react'
import IIcon from '@/interfaces/IIcon'

const Icon: React.FC<IIcon> = ({ value }: IIcon) => {
  
  if (value === 'PRESENTATION') {
    return <>🎥</>
  }
  if (value === 'DISCUSSION') {
    return <>🗣</>
  }
  if (value === 'чаепитие') {
    return <>😁</>
  }
  if (value === 'поздравление') {
    return <>🥂</>
  }
  if (value === 'MEETING') {
    return <>📱</>
  }
  return <>🥂</>
}

export default Icon
