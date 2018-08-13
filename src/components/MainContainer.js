import React,{Fragment} from 'react'
import {Header} from './Layout'

export default ({children}) => {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  )
}
