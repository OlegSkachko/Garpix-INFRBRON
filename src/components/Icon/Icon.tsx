import React from 'react'
import IIcon from '@/interfaces/IIcon'

const Icon: React.FC<IIcon> = ({ value }: IIcon) => {
  if (value === 'выступление') {
    return <>🎥</>
  }
  if (value === 'переговоры') {
    return <>🗣</>
  }
  if (value === 'чаепитие') {
    return <>😁</>
  }
  if (value === 'поздравление') {
    return <>🥂</>
  }
  if (value === 'созвон') {
    return <>📱</>
  }
  return <></>
}

export default Icon
