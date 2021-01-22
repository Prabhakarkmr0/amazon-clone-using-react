import { Link , useHistory} from "react-router-dom"
import React ,{useState} from 'react'
import "./Login.css"
import { auth } from "./firebase"

function Login() {

    const history=useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const signIn=e=>{
        e.preventDefault()

        auth.signInWithEmailAndPassword(email,password)
        .then(auth=>{
            history.push('/')
        })
        .catch(error=>alert(error.message))

    }

    const register=e=>{
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
            console.log(auth)
            if(auth){
                history.push('/')
            }
        })
        .catch(error=>alert(error.message))
    }

    return (
        <div className="login">
        <Link to="/">
            <img className="login__logo"
            src="https:upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt=""/>
        </Link>

        <div className="login__container" type="submit"
        onClick={signIn}>
            <h1>Sign-in</h1>

            <form>
                <h5>E-Mail</h5>
                <input type="text" value={email}
                onChange={e=>setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input type="password" value={password}
                onChange={e=>setPassword(e.target.value)}/>
                <button className="login__signInButton">Sign In</button>
            </form>

            <p>
                By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>
            
            <button onClick={register}
            className="login__registerButton">Create Your Amazon Account</button>

        </div>

        </div>
    )
}

export default Login