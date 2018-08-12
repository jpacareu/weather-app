import React from 'react'

export default ({match}) => {
  return (
    <div>
      Detalles {match.params.id}
    </div>
  )
}
