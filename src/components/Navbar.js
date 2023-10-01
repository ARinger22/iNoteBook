import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation();
    let history = useNavigate();
    useEffect(() => {
        console.log(location.pathname);
    }, [location])

    const handleLogout = async () => {
        localStorage.removeItem('token');
        history("/login");
    }
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${location.pathname === '/' ? "active" : ""}`}>
                            <Link className="nav-link" to="/" >Home</Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/about' ? "active" : ""}`}>
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                </div>
                {!localStorage.getItem('token')? <form className="d-flex">
                        <Link type="button" to="/signup" className={`btn btn-${props.mode}`}>Sign Up</Link>
                        <Link className={`btn btn-${props.mode} mx-3`} to="/login" type="button">Login</Link>
                </form> : <button className={`btn btn-${props.mode} mx-3`} onClick={handleLogout} type="button">LogOut</button> }

                <div className="form-check form-switch" style={{ float: 'right' }} >
                    <input className="form-check-input" type="checkbox" onClick={props.onClickSwitch}
                        role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        change_theme</label>
                </div>
            </nav>
        </>
    )
}

export default Navbar
