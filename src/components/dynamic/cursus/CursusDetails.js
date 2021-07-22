import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import {Modal, Button} from 'react-bootstrap'
import Navbars from '../../static/Navbar'

function CursusDetails() {

    const [dataCursus, setDataCursus] = useState([])
    const [dataClasse, setDataClasse] = useState([])
    const [dataTeacher, setDataTeacher] = useState([])
    const [dataMatter, setDataMatter] = useState([])
    const [tempo, setTempo] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const studentName = localStorage.getItem('studentName')

    useEffect(() =>{
        const database = firebase.database().ref('registrationDB')
        const databaseClasse = firebase.database().ref('classDB')
        const databaseTeacher = firebase.database().ref('ensDB')
        const databaseMatter = firebase.database().ref('moduleDB')

        database.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataCursus(list)
        })
        databaseClasse.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataClasse(list)
            console.log(dataClasse)
        })
        databaseTeacher.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataTeacher(list)
            console.log(dataTeacher)
        })
        databaseMatter.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataMatter(list)
            console.log(dataMatter)
        })
    }, [])

    return (
        <div>
            <Navbars/>
            <div className = "container col-9 mx-auto mt-5">
                        <div className = "card">
                            <table class="table  table-ligth table-striped table-lg table-borderless mt-5 align-items-center">
                                <thead class="table-secondary">
                                    <tr>
                                        <th scope="col">Noms</th>
                                        <th scope="col">Ecole frequenté</th>
                                        <th scope="col">année Scolaire</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                dataCursus.map((item , index) =>{
                                    if(item.student === studentName) {
                                        return(
                                            <tr key = {index}>
                                                <td>{item.student}</td>
                                                <td>{item.school}</td>
                                                <td>{item.yearSchool}</td>
                                                <td>
                                                    <button className = "btn btn-warning mx-2" onClick = {
                                                        () =>{
                                                            setTempo(dataCursus[index])
                                                            handleShow()
                                                        }
                                                    } >
                                                        Consulter <AiOutlineEdit/>
                                                    </button>                    
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                                </tbody>
                        </table>
                    </div>
                </div>
                <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="lg"
                    >
                        <Modal.Header>
                        <Modal.Title> {tempo.student} {tempo.yearSchool} </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p><label>Etablissement scolaire : </label> <label>{tempo.school}</label> </p>
                            <p> <label>classe :</label> <label>{tempo.classe}</label> </p>
                            <p> <label>resultat : </label> <label>{tempo.res}</label> </p>
                            <p><label>observation : </label> <label>{tempo.observation}</label></p>
                            <p>telecharger le bulletin annuel de notes : <a href = {tempo.fileYear}>{tempo.fileYear}</a> </p>
                            <p>Matieres : </p>
                            <table class="table  table-ligth table-striped table-lg table-borderless mt-2 align-items-center">
                                <thead class="table-secondary">
                                    <tr>
                                        <th scope="col">Matieres</th>
                                        <th scope="col">description</th>
                                        <th scope="col">Nom du professeur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                            {
                                dataClasse.map((item, index)=>{
                                    if(item.nameClasse === tempo.classe){
                                        return(
                                            item.moduleClasse.map((module, index) =>{
                                            return(
                                            dataMatter.map((moduleitem, index) =>{
                                                if(moduleitem.code === module){
                                                    return(
                                                        <tr>
                                                            <td>{moduleitem.libelle}</td>
                                                            <td>{moduleitem.description}</td>
                                                            <td>{moduleitem.nameprof}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        )
                                        })
                                        )
                                    }
                                })
                            }
                            </tbody>
                        </table>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick = {() => handleClose() }>
                            Fermer
                        </Button>
                        </Modal.Footer>
                    </Modal>

        </div>
    )
}

export default CursusDetails
