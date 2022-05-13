import React from 'react'
import './Navbar.css'
function Navbar(props) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#"><strong>D</strong>Tube</a>
            <ul className="navbar-nav ms-auto">
               <small className='account'>{props.account}</small>
            </ul>
        </nav>

        
    )
}

export default Navbar
