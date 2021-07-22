import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import firebase from '../../../config/firebase'

function AjouterEnseignant() {

    const [nameEns, setNameEns] = useState("")
    const [surnameEns, setSurnameEns] = useState("")
    const [adresseEns, setAdresseEns] = useState("")
    const [contactEns, setContactEns] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const school = localStorage.getItem('school')

    const handleName = (e) =>{
        setNameEns(e.target.value)
    }
    const handleSurname = (e) =>{
        setSurnameEns(e.target.value)
    }
    const handleAdresse = (e) =>{
        setAdresseEns(e.target.value)
    }
    const handleContact = (e) =>{
        setContactEns(e.target.value)
    }

    const addEnse = (e) =>{
        e.preventDefault()
        handleShow()
        const datas = {
            nameEns,
            surnameEns,
            adresseEns,
            contactEns,
            school
        }

        const ensDB = firebase.database().ref("ensDB")
        ensDB.push(datas)

        setNameEns("")
        setSurnameEns("")
        setAdresseEns("")
        setContactEns("")
    }

    return (
        <div>
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
                        <form method = "post">
                            <div class="d-flex mb-3">
                                <div class="form-group col-md-6 me-2">
                                    <label className = "mb-2 text-secondary">Noms</label>
                                    <input type="text" class="form-control" placeholder="Entrer vos noms" value = {nameEns} required = {true} onChange = {handleName}/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label className = "mb-2 text-secondary">Prenoms</label>
                                    <input type="text" class="form-control" placeholder="Entrer vos prénoms" value = {surnameEns} required onChange = {handleSurname}/>
                                </div>
                            </div>
                            <div class="form-group  mb-3">
                                <label className = "mb-2 text-secondary">Addresse</label>
                                <input type="text" class="form-control" placeholder="adresses" value = {adresseEns} required onChange = {handleAdresse}/>
                            </div>
                            <div class="form-group">
                                <label className = "mb-2 text-secondary">Contacts</label>
                                <input type="text" class="form-control" placeholder="Apartment, studio, or floor" value = {contactEns} required onChange = {handleContact}/>
                            </div>
                            { ( nameEns !== "" && surnameEns !== "" && adresseEns !== "" && contactEns !== "" )?
                            <button type="submit" class="btn btn-primary mt-5" onClick = {addEnse}>Enregistrer</button> :
                            <button class="btn btn-primary mt-5" disabled>Enregistrer</button> }
                        </form>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                            <Modal.Title>Enseignant</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Un Nouveau enseignant enregistré</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>

            </div>
        </div>
        </div>
    )
}

export default AjouterEnseignant
