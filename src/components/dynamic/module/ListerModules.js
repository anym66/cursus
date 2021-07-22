import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Button, Card, Modal } from 'react-bootstrap';

function ListerModules() {

    const [data, setData] = useState([])
    const [itemSearch, setItemSearch] = useState("")
    const [show, setShow] = useState(false);
    const [newCode, setNewCode] = useState("")
    const [newLibelle, setNewLibelle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newprof, setNewprof] = useState("")
    const school = localStorage.getItem('school')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [tempo, setTempo] = useState({})

    const [dataEns, setDataEns] = useState([])

    useEffect(()=>{
        const database = firebase.database().ref('moduleDB')
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
        const databaseEns = firebase.database().ref('ensDB')
        databaseEns.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            console.log(list)
            setDataEns(list)
        })
    },[])

    const handleSearch = (e) =>{
        setItemSearch(e.target.value)
        console.log(itemSearch)
    }
    const handleNewCode = (e) => {
        setNewCode(e.target.value)
    }
    const handleNewLibelle = (e) => {
        setNewLibelle(e.target.value)
    }
    const handleNewDescription = (e) => {
        setNewDescription(e.target.value)
    }
    const handleNewProf = (e) => {
        setNewprof(e.target.value)
    }

    return (
        <div>
            <div className = "container col-9 mx-auto mt-5">
                    <div class="input-group flex-nowrap">
                        <input type="text" class="form-control col-8 mx-auto rounded-pill " placeholder="search..." aria-label="Username"
                            value = {itemSearch} onChange = {handleSearch}
                        />
                    </div>
                    <Card>
                            <table class="table table-striped table-lg table-borderless mt-5 align-items-center">
                                <thead class="table-secondary">
                                    <tr>
                                    <th scope="col">Code</th>
                                    <th scope="col">Libellé</th>
                                    <th scope="col">Noms Enseignant</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                data.filter((item) =>{
                                    return item.libelle.toLowerCase().includes(itemSearch)})
                                .map((item , index) =>{
                                    if(item.school === school){
                                        return(
                                            <tr key = {index}>
                                                <td>{item.code}</td>
                                                <td>{item.libelle}</td>
                                                <td>{item.nameprof}</td>
                                                <td>
                                                    <button className = "btn btn-secondary mx-3"
                                                        onClick={ () =>{
                                                            setTempo(data[index])
                                                            handleShow()
                                                            setNewprof(tempo.nameprof)
                                                    }}
                                                    >Modifier<AiOutlineEdit/></button>
                                                    <button className = "btn btn-dark"
                                                        onClick ={() =>{
                                                            setTempo(data[index])
                                                            let element = firebase.database().ref('moduleDB').child(tempo.id)
                                                            element.remove()

                                                        } }
                                                    >Supprimer<BsTrash/></button>
                                                </td>
                                            </tr>
                                    )
                                    }
                                })
                            }
                                </tbody>
                        </table>
                    </Card>
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
                        <Modal.Title>{tempo.libelle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Code</label>
                                        <input type="text" class="form-control"  placeholder = {tempo.code} value = {newCode} onChange = {handleNewCode} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Libelle</label>
                                        <input type="text" class="form-control"  placeholder = {tempo.libelle} value = {newLibelle} onChange = {handleNewLibelle} />
                                    </div>
                                </div>
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">description</label>
                                    <textarea type="text" class="form-control"  placeholder = {tempo.description} value = {newDescription} onChange = {handleNewDescription} />
                                </div>
                                <div class="form-group">
                                    <label className = "mb-2 text-secondary">Noms Enseignant</label>
                                    <select class="form-control" value = {newprof} onChange = {handleNewProf} placeholder = {tempo.nameprof} >
                                    {
                                        dataEns.map((item, index) =>{
                                            if(item.school === school){
                                                return(
                                                    <option key = {index}> {item.nameEns} </option>
                                            )
                                            }
                                        })
                                    }
                                    </select>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button variant="primary"
                            onClick = {
                            () =>{
                                let element = firebase.database().ref('moduleDB').child(tempo.id)

                                if(newCode !== ""){
                                    element.update({
                                        code : newCode
                                    })
                                }
                                if(newLibelle !== "") {
                                    element.update({
                                        libelle : newLibelle
                                    })
                                }
                                if(newDescription !== ""){
                                    element.update({
                                        description : newDescription
                                    })
                                }
                                if(newprof !== "") {
                                    element.update({ 
                                        nameprof : newprof
                                })
                                }
                                handleClose()
                                setTempo({})
                                setNewCode('')
                                setNewLibelle('')
                                setNewDescription('')
                                setNewprof('')
                                
                            }
                        }
                        >Valider</Button>
                        </Modal.Footer>
                    </Modal> 
        </div>
    )
}

export default ListerModules
