import { Link } from 'react-router-dom'
import React from 'react'


const HomePage = ()=> {
  return (
    <div>
      Home Page
      <Link to='/mario'>Mario</Link>
    </div>
  )
}

export default HomePage