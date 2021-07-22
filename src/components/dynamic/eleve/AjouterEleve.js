import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import firebase from '../../../config/firebase'

function AjouterEleve() {

    const [nameStudent, setNameStudent] = useState('')
    const [surnameStudent, setSurnameStudent] = useState('')
    const [dateStudent, setDateStudent] = useState('')
    const [placeStudent, setPlaceStudent] = useState('')
    const [contactStudent, setContactStudent] = useState('')
    const [adresseStudent, setAdresseStudent] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleName = (e) =>{
        setNameStudent(e.target.value)
    }
    const handleSurname = (e) =>{
        setSurnameStudent(e.target.value)
    }
    const handleDate = (e) =>{
        setDateStudent(e.target.value)
    }
    const handlePlace = (e) =>{
        setPlaceStudent(e.target.value)
    }
    const handleContact = (e) =>{
        setContactStudent(e.target.value)
    }
    const handleAdresse = (e) =>{
        setAdresseStudent(e.target.value)
    }

    const addModule = (e) =>{
        e.preventDefault()
        handleShow()
        const datas = {
            nameStudent,
            surnameStudent,
            dateStudent,
            placeStudent,
            adresseStudent,
            contactStudent
        }

        const studentDB = firebase.database().ref("studentDB")
        studentDB.push(datas)

        setNameStudent("")
        setSurnameStudent("")
        setPlaceStudent("")
        setDateStudent("")
        setContactStudent("")
        setAdresseStudent("")
    }

    return (
        <div>
            <div class="card">

                    <div class="card-body d-flex">
                        <div className="col-lg-6">
                                <div className="card1 pb-5">
                                    <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                        <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623682570/images-cursus/lc4ui6cfrhta8wtdws0a.jpg" class="image"/>
                                    </div>
                                </div>
                            </div>
                            <div className = "container col-lg-6 mx-auto mt-5">
                            <form method = "post">
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Noms</label>
                                        <input type="text" class="form-control" placeholder="Noms" value = {nameStudent} onChange = {handleName}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Prenoms</label>
                                        <input type="text" class="form-control" placeholder="Prenoms" value = {surnameStudent} onChange = {handleSurname} />
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Date de Naissance</label>
                                        <input type="date" class="form-control" value = {dateStudent} onChange = {handleDate}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Lieu de Naissance</label>
                                        <input type="text" class="form-control" placeholder="Lieu" value = {placeStudent} onChange = {handlePlace} />
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Contact</label>
                                        <input type="text" class="form-control" placeholder="contact" value = {contactStudent} onChange = {handleContact} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Addresse</label>
                                        <input type="text" class="form-control" placeholder="Adresse" value = {adresseStudent} onChange = {handleAdresse} />
                                    </div>
                                </div>
                                { ( nameStudent !== "" && surnameStudent !== "" && dateStudent !== "" && placeStudent !== "" && contactStudent !== "" && adresseStudent !== "" )?
                                    <button type="submit" class="btn btn-secondary mt-5" onClick = {addModule} >Enregistrer</button> :
                                    <button class="btn btn-secondary mt-5" disabled>Enregistrer</button> }
                            </form>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                            <Modal.Title>Module</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Un Nouveau élève</Modal.Body>
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

export default AjouterEleve
