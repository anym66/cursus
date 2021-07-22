import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import firebase from '../../config/firebase'

function LoginAdministrator(props) {

    const [pseudo, setPseudo] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [data, setData] = useState([])

    const handlePseudo = (e) => {
        setPseudo(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    useEffect(()=>{
        const database = firebase.database().ref('adminDB')
        database.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            console.log(list)
            setData(list)
            console.log(data)
        })
    },[])

    const handleSearch = (jeton) =>{
        return jeton.identifiant === pseudo
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const jeton = data.find(handleSearch)

        console.log(jeton, data)
        const school = jeton.schoolName
        localStorage.setItem('school', school )
        console.log(localStorage.getItem('school'))

        firebase.auth().signInWithEmailAndPassword(pseudo, password)
            .then(user =>{
                console.log(user)
                props.history.push('/dashboard')
            })
            .catch(error =>{
                setError(error)
                setPseudo('')
                setPassword('')
            })   
    } 
    
    return (
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto my-5">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row"><img src="https://i.imgur.com/CXQmsmF.png" class="logo"/></div>
                                <div className="row px-3 justify-content-center mb-5 border-line"><img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623235089/images-cursus/wxfoyujqr9u8fcypdqaf.jpg" class="image"/> </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form method = 'post' onSubmit = {handleSubmit}>
                                <div className="card2 card border-0 px-4 py-5">
                                    <div class="row px-3">
                                        <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Pseudo</h6>
                                        </label>
                                        <input className="mb-4" type="text" placeholder="Enter a valid pseudo"
                                            value = {pseudo} onChange = {handlePseudo}
                                        />
                                    </div>
                                    <div class="row px-3">
                                        <label class="mb-1">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label>
                                        <input type="password"  placeholder="Enter password"
                                            value = {password} onChange = {handlePassword}
                                        />
                                    </div>
                                    <div className="row px-3 mb-4">
                                        <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                                    </div>
                                    <div className="row mb-3 px-3">
                                        <button type="submit" class="btn btn-primary text-center mt-3">Login</button>
                                    </div>
                                    <div className="row mb-4 px-3">
                                        <small className="font-weight-bold">êtes-vous un superviseur?
                                            <Link className="text-danger " to = '/supervisor' >se connecter</Link>
                                        </small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default LoginAdministrator
