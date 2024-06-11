import React, { useReducer } from 'react'

type Props = {}

function UseReducer({}: Props) {
 const [state, ]= useReducer (reducer,{
    names:[], 
    name :"",

  })
  
  function reducer(){

  }
  return (
    <div>UseReducer</div>
  )
}

export default UseReducer