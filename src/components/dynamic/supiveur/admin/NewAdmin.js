import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Navbarsup from '../Navbarsup'
import firebase from '../../../../config/firebase'

function NewAdmin(props) {

    const data = {
        identifiant : "",
        password : "",
        confirmPassword : "",
        schoolName : ""
    }
    const [dataAdmin, setDataAdmin] = useState(data)
    const [dataSchool, setDataSchool] = useState([])
    const [error, setError] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(()=>{
        const databaseSchool = firebase.database().ref('schoolDB')
        databaseSchool.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataSchool(list)
            console.log(dataSchool)
        })
    }, [])

    const {identifiant, password, confirmPassword, schoolName} = dataAdmin
    const handleChange = (e) =>{
        setDataAdmin({...dataAdmin, [e.target.id] : e.target.value })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const dataSend = { identifiant, password, schoolName }
        const database = firebase.database().ref("adminDB")
        database.push(dataSend)

        firebase.auth().createUserWithEmailAndPassword(identifiant, password)
            .then(user =>{
                setDataAdmin(data)
                handleShow()
            })
            .catch(error =>{
                setError(error)
                setDataAdmin(data)
            })
        console.log(dataAdmin)
    }
    const errorMsg = error !== "" && <span> {error.message} </span>

    return (
        <div> 
            <Navbarsup/>
            <div className = "mt-5 mx-5 auto">
                <div class="card">
                    <div class="card-body d-flex">
                        <div className="col-lg-6">
                                <div className="card1 pb-5">
                                    <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                        <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623682561/images-cursus/i72pwmhu2qngwetwzjmm.jpg" className="image"/>
                                    </div>
                                </div>
                            </div>
                        <div className = "container col-lg-6 mx-auto mt-5">

                        <form method = "post" onSubmit = {handleSubmit}>
                            <div>
                                {errorMsg}
                            </div>
                            <div class="form-group  mb-3">
                                <label className = "mb-2 text-secondary">identifiant de connexion</label>
                                <input type="text" class="form-control" placeholder="identifiant" value = {identifiant} onChange = {handleChange} id = "identifiant" />
                            </div>
                            <div class="form-group">
                                <label className = "mb-2 text-secondary">mot de passe</label>
                                <input type="text" class="form-control" placeholder="mot de passe" value = {password} onChange = {handleChange} id = "password" />
                            </div>
                            <div class="form-group  mb-3">
                                <label className = "mb-2 text-secondary">confirmer mot de passe</label>
                                <input type="text" class="form-control" placeholder="confirmer le mot de passe" value = {confirmPassword} onChange = {handleChange} id = "confirmPassword" />
                            </div>

                            <div class="form-group">
                                <label className = "mb-2 text-secondary">Ecole</label>
                                <select class="form-select" value = {schoolName} onChange = {handleChange} id = "schoolName" >
                                    <option>Open this select menu</option>
                                {
                                    dataSchool.map((item, index)=>{
                                        return ( <option key = {index} value = {item.name} >{item.name}</option>)
                                    })
                                }
                                </select>
                            </div>
                            {
                                (identifiant !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword && schoolName !== '')?
                                <button type="submit" class="btn btn-secondary mt-5">Enregistrer</button>:
                                <button type="submit" disabled class="btn btn-secondary mt-5">Enregistrer</button>}
                        </form>
                        
                        </div>   
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Ecole</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Ecole bien enregistrée</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal> 
            </div>
            
        </div>
    )
}

export default NewAdmin
