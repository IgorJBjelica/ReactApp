import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { NavLink } from "react-router-dom"
import NavbarStyles from "./Navbar.module.scss"
import { FiMenu, FiX } from "react-icons/fi"

const Navbar = () => {
    const [ navbarOpen, setNavbarOpen ] = useState(false)

    const handleToggle = () => {
        setNavbarOpen( prev => !prev )
    }

    const closeMenu = () => {
        setNavbarOpen(false)
    }

    const links = [
        {
            id: uuidv4(),
            path: "/",
            text: "Home",
        },
        {
            id: uuidv4(),
            path: "/about",
            text: "About",
        }
    ]
    return (
        <aside className={ NavbarStyles['nav-container'] }>
            <button onClick={handleToggle }>
                { navbarOpen ? <FiX /> : <FiMenu /> }
            </button>
            <ul className={ navbarOpen ? NavbarStyles.showMenu : "" }>
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            <NavLink
                                to={link.path}
                                className={
                                    ({ isActive }) => ( isActive ? NavbarStyles["link-active"] : NavbarStyles["link"] )
                                    }
                                onClick={ () => closeMenu() }
                                >
                                {link.text}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}
export default Navbar