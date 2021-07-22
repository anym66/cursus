import axios from 'axios'
import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import {Modal, Button} from 'react-bootstrap'

function NewRegistration() {
    const initial = {
        student : "",
        classe : "",
        fileYear : null,
        yearSchool : "",
        res : "",
        observation : ""
    }
    const school = localStorage.getItem('school')
    const [dataRegis, setDataRegis] = useState(initial)
    const [dataClasse, setDataClasse] = useState([])
    const [dataStudent, setDataStudent] = useState([])
    const [docUpload, setDocUpload] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
        const databaseClasse = firebase.database().ref('classDB')
        databaseClasse.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
               list.push({id, ...previousList[id]})
            }
            console.log(list)
            setDataClasse(list)
        })
        const databaseStu = firebase.database().ref('studentDB')
        databaseStu.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            console.log(list)
            setDataStudent(list)
        })
    }, [])

    const handleChange = (e) =>{
        setDataRegis({...dataRegis, [e.target.id] : e.target.value })
    }
    const handleChangeFile = (e) =>{
        let docTemp = URL.createObjectURL(e.target.files[0])
        console.log(docTemp)
        setDocUpload(e.target.files[0])
        setDataRegis({...dataRegis, [e.target.id] : docTemp})
        console.log(dataRegis)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        const registrationDB  = firebase.database().ref("registrationDB")
        formData.append('file', docUpload)
        formData.append('upload_preset', 'yaya12')
        const option = {
            method : 'POST',
            body : formData,
        }
        const dataSend = {
            student,
            fileYear,
            res,
            observation,
            yearSchool,
            classe
        }
        axios.post(`https://api.cloudinary.com/v1_1/dbcjapvf8/raw/upload`, formData)
        .then(res =>{
                setDataRegis({...dataRegis, [fileYear] : res.data.url})
                registrationDB.push(dataSend)
                setDataRegis(initial)
                handleShow()
            }).catch(error=>{
            console.log(error)
        })
    }

    const {student, classe, fileYear, yearSchool, res, observation } = dataRegis

    return (
        <div>
            <div className = "card">
                <div class="d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mb-5 border-line">
                                <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623682585/images-cursus/ptssrbmx38l85436xwf3.jpg" class="image"/>
                            </div>
                        </div>
                    </div>
                    <div className = "container col-lg-6 mx-auto mt-2 mb-3 ">
                        <form method = "post">
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">Eleve</label>
                                    <select class="form-select" value = {student} id="student" onChange = {handleChange} >
                                        <option selected>Open this select menu</option>
                                        {
                                            dataStudent.map((item, index) =>{
                                                return(
                                                    <option value = {item.nameStudent} > {item.nameStudent} </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">classe</label>
                                    <select class="form-select" value = {classe} id = "classe" onChange = {handleChange} >
                                        <option selected>Open this select menu</option>
                                        {
                                            dataClasse.map((item, index) =>{
                                                if(item.school === school){
                                                    return(
                                                        <option value = {item.nameClasse} > {item.nameClasse} </option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">Ajouter un Fichier (Bulletin annuel, Diplome)</label>
                                    <input type="file" class="form-control"  id= "fileYear" onChange = {handleChangeFile} />
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Année Scolaire</label>
                                        <input type="text" class="form-control" placeholder="Code" value = {yearSchool} id = "yearSchool" onChange = {handleChange}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Resultat</label>
                                        <select class="form-select" value = {res} id = "res" onChange = {handleChange} >
                                            <option selected>Open this select menu</option>
                                            <option value = "insuffisant">insuffisant</option>
                                            <option value = "Passable">Passable</option>
                                            <option value = "assez-bien">assez-bien</option>
                                            <option value = "bien">bien</option>
                                            <option value = "très-bien">très-bien</option>
                                            <option value = "excellent">excellent</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label className = "mb-2 text-secondary">Observation</label>
                                    <textarea class="form-control" placeholder="Facultatif" value = {observation} id = "observation" onChange = {handleChange} />
                                </div>
                                <div className = "form-group mt-3" >
                                    {
                                        (student !== "" && classe !== "" && fileYear !== null && yearSchool !== "" && res !== "" && observation !== "") ? <button className = "btn btn-warning">Valider</button>:<button disabled className = "btn btn-warning"  onClick = {handleSubmit} >Valider</button>
                                    }
                                </div>
                        </form>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                            <Modal.Header>
                            <Modal.Title>Enseignant</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Un Nouvel enregistrement </Modal.Body>
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

export default NewRegistration
