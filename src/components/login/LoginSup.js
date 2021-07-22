import React, { useState } from 'react'
import firebase from '../../config/firebase'

function LoginSup(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(email, password)

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user =>{
                props.history.push('/dashboardsuperviseur')
            })
            .catch(error =>{
                setError(error)
                setEmail('')
                setPassword('')
            })
    }

    const errorMsg = error !== "" && <span> {error.message} </span>

    return (
        <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto my-5">
                <div class="card card0 border-0">
                    <div class="row d-flex">
                        <div class="col-lg-6">
                            <div class="card1 pb-5">
                                <div class="row"> <img src="https://i.imgur.com/CXQmsmF.png" class="logo"/> </div>
                                <div class="row px-3 justify-content-center mb-5 border-line"> <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1624621335/images-cursus/ozvrbwnkxmhmqvpdfbtu.jpg" class="image"/> </div>
                            </div>
                        </div>
                        
                            <div class="col-lg-6">
                                <form onSubmit = {handleSubmit} >

                                    <div>
                                        {errorMsg}
                                    </div>
                                    <div class="card2 card border-0 px-4 py-5">
                                        <div class="row px-3">
                                            <label class="mb-1">
                                                <h6 class="mb-0 text-sm">Email Address</h6>
                                            </label>
                                            <input class="mb-4" type="text" placeholder="Enter a valid email address" value = {email} onChange = {handleEmail} />
                                        </div>
                                        <div class="row px-3">
                                            <label class="mb-1">
                                                <h6 class="mb-0 text-sm">Password</h6>
                                            </label>
                                            <input type="password" placeholder="Enter password" value = {password} onChange = {handlePassword}/>
                                        </div>
                                        <div class="row px-3 mb-4">
                                            <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                                        </div>
                                        <div class="row mb-3 px-3">
                                            <button type="submit" class="btn btn-secondary text-center mt-3"  >Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        
                    </div>
                </div>
            </div>
    )
}

export default LoginSup
