import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';
 
const Login = () => {
    const [info, setInfo] = useState({ email: "", password: "" });
    let history = useNavigate();
    const [err, setErr] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: info.email, password: info.password })
        });
        const json = await response.json();
        setInfo({ email: "", password: "" });
        console.log(json);

        if ((Object.keys(json).length === 0 && json.constructor === Object) || json.error) {
            setErr(`${json.error} or signup first`)
            setTimeout(() => {
                setErr('')
            }, 2000)
        } else {
            localStorage.setItem('token', json.authtoken);
            history("/");
        }
    }
    const onChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }
    return (
        <>
            {err && <Alert message={err} />}
            <form className='container my-5' >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"
                        name="email" value={info.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"
                        name="password" value={info.password} onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>

                <div className="text-center">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>

        </>
    )
}

export default Login
