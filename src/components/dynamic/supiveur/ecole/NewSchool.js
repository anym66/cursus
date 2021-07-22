import React, { useState } from 'react'
import Navbarsup from '../Navbarsup'
import firebase from '../../../../config/firebase'
import {Modal, Button} from 'react-bootstrap'

function NewSchool() {

    const data = {
        name : " ",
        respo : " ",
        category : " ",
        localisation : " ",
        mail : " ",
        contact : " "
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dataSchool, setDataSchool] = useState(data)

    const handleChange = (e) =>{
        setDataSchool({...dataSchool, [e.target.id] : e.target.value })
    }

    const {name, respo, category, localisation, mail, contact} =  dataSchool

    const handleSubmit = (e) =>{
        e.preventDefault()
        handleShow()
        console.log(dataSchool)
        e.preventDefault()
        const schoolDB = firebase.database().ref("schoolDB")
        const newSchool = firebase.database().ref(name)
        schoolDB.push(dataSchool)
        newSchool.push(dataSchool)
        
        setDataSchool(data)
    }

    return (
        <div>
            <Navbarsup/>
            <div class="card">

                    <div class="card-body d-flex">
                        <div className="col-lg-6">
                                <div className="card1 pb-5">
                                    <div className="row px-3 justify-content-center mt-5 border-line">
                                        <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623682570/images-cursus/lc4ui6cfrhta8wtdws0a.jpg" class="image"/>
                                    </div>
                                </div>
                            </div>
                            <div className = "container col-lg-6 mx-auto mt-5">
                            <form method = "post" onSubmit = {handleSubmit} >
                                <div class="mb-3">
                                    <div class="form-group col-md-11 me-2">
                                        <label className = "mb-2 text-secondary">Nom de l'école</label>
                                        <input type="text" class="form-control" placeholder="Nom" value = {name} id = "name" onChange = {handleChange}/>
                                    </div>
                                    <div class="form-group col-md-11">
                                        <label className = "mb-2 text-secondary">Responsable</label>
                                        <input type="text" class="form-control" placeholder="respondable académique" value = {respo} id = "respo" onChange = {handleChange}/>
                                    </div>
                                    <div class="form-group col-md-11 me-2">
                                        <label className = "mb-2 text-secondary">Catégorie</label>
                                        <select class="form-select" value = {category} id = "category" onChange = {handleChange} >
                                            <option>Open this select menu</option>
                                            <option value="Primaire">Primaire</option>
                                            <option value="Secondaire">Secondaire</option>
                                            <option value="Superieur">Superieur</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-group col-md-11 me-2">
                                        <label className = "mb-2 text-secondary">localisation</label>
                                        <input type="text" class="form-control" value = {localisation} id = "localisation" onChange = {handleChange}/>
                                    </div>
                                    <div class="form-group col-md-11">
                                        <label className = "mb-2 text-secondary">Mail</label>
                                        <input type="text" class="form-control" placeholder="Mail" value = {mail} id = "mail" onChange = {handleChange} />
                                    </div>
                                    
                                </div>
                                <div class="mb-3">
                                    <div class="form-group col-md-11 me-2">
                                        <label className = "mb-2 text-secondary">Contact</label>
                                        <input type="text" class="form-control" placeholder="contact" value = {contact} id = "contact" onChange = {handleChange} />
                                    </div>
                                   
                                </div>
                                    <div>
                                        {
                                          ( name !== ' '&& respo !== " " && localisation !== " " && category !== " " && contact !== " " && mail !== " ")?
                                           <button type="submit" class="btn btn-secondary mt-5">Enregistrer</button> : <button type="submit" disabled class="btn btn-secondary mt-5">Enregistrer</button>
                                        }
                                    </div>
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
    )
}

export default NewSchool
