import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';

const SignUp = () => {
    const [info, setInfo] = useState({ name: "", email: "", password: "" });
    let history = useNavigate();
    const [err, setErr] = useState('');

    const onChange = async (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/register"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: info.name, email: info.email, password: info.password })
        });
        const json = await response.json();
        setInfo({name:"", email: "", password: "" });
        console.log(json);

        if ((Object.keys(json).length === 0 && json.constructor === Object) || json.err) {
            setErr(`${json.err}`)
            setTimeout(() => {
                setErr('')
            }, 2000)
        } else {
            localStorage.setItem('token', json.authtoken);
            history("/");
        }
    }

    return (
        <>
            {err && <Alert message={err} />}
            <form className='container my-5' >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name"
                        name="name" value={info.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" 
                        value={info.email} aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" minLength={5}
                        name="password" value={info.password} onChange={onChange} required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>

                <div className="text-center">
                    <p>already a member? <Link to="/login">Login</Link></p>
                    <p>or login with:</p>
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

export default SignUp
