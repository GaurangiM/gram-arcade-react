import { Link } from 'react-router-dom'
import React from 'react'


const HomePage = ()=> {
  return (
    <div>
      Home Page
      <Link to='/mario'>Mario</Link>
      <Link to='/doodle'>Doodle</Link>
    </div>
  )
}

export default HomePage