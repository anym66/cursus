import React, {useEffect, useState} from 'react'
import Navbarsup from '../Navbarsup'
import firebase from '../../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import {Modal, Button, Card} from 'react-bootstrap'

function ListSchools() {
    
    const [data, setData] = useState([])
    const [itemSearch, setItemSearch] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tempo, setTempo] = useState({})

    const datas = {
        name : "",
        respo : "",
        category : "",
        localisation : "",
        mail : "",
        contact : ""
    }
    
    const [dataSchool, setDataSchool] = useState(datas)

    const handleChange = (e) =>{
        setDataSchool({...dataSchool, [e.target.id] : e.target.value })
    }

    const {name, respo, category, localisation, mail, contact} =  dataSchool


    useEffect(()=>{
        const database = firebase.database().ref('schoolDB')
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

    const handleSearch = (e) =>{
        setItemSearch(e.target.value)
        console.log(itemSearch)
    }

    return (
        <div>
            <Navbarsup/>
            <div className = "container col-11 mx-auto mt-5">
                        <div class="input-group flex-nowrap">
                            <input type="text" class="form-control col-8 mx-auto rounded-pill " placeholder="search..." aria-label="Username"
                                value = {itemSearch} onChange = {handleSearch}
                            />
                        </div>
                        <Card>
                        <table class="table table-striped table-lg table-borderless mt-5 align-items-center">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Noms</th>
                                    <th scope="col">Responsable</th>
                                    <th scope="col">categorie</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            data.filter((item) =>{
                                return item.name.toLowerCase().includes(itemSearch)})
                            .map((item , index) =>{
                                return(
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{item.name}</td>
                                            <td>{item.respo}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <button className = "btn btn-outline-primary mx-5"
                                                    onClick={ () =>{
                                                    handleShow()
                                                    setTempo(data[index])
                                                }}
                                                >Modifier<AiOutlineEdit/></button>
                                                
                                                <button className = "btn btn-danger">desactiver</button>
                                            </td>
                                        </tr>
                                )
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
                        <Modal.Title>{tempo.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Nom de l'école</label>
                                        <input type="text" class="form-control" placeholder = {tempo.name} id = "name" value = {name} onChange = {handleChange}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Responsable académique</label>
                                        <input type="text" class="form-control" placeholder = {tempo.respo} id = "respo" value = {respo} onChange = {handleChange}/>
                                    </div>
                                    </div>
                                    <div class="d-flex mb-3">
                                    <div class="form-group col-md-6">
                                            <label className = "mb-2 text-secondary">Catégorie</label>
                                            <select class="form-select" value = {category} id = "category"  onChange = {handleChange} >
                                                <option>Open this select menu</option>
                                                <option value="Primaire">Primaire</option>
                                                <option value="Secondaire">Secondaire</option>
                                                <option value="Superieur">Superieur</option>
                                            </select>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Localisation</label>
                                        <input type="text" class="form-control" placeholder = {tempo.localisation} id = "localisation" value = {localisation} onChange = {handleChange}/>
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Mail</label>
                                        <input type="text" class="form-control" placeholder = {tempo.mail} id = "mail" value = {mail} onChange = {handleChange}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Contact</label>
                                        <input type="text" class="form-control" placeholder = {tempo.contact} id = "contact" value = {contact} onChange = {handleChange} />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick = { () => {
                                handleClose()
                                setDataSchool(datas)
                            }}>
                                Annuler
                            </Button>
                            <Button variant="primary"
                                onClick = {
                            () =>{
                                let element = firebase.database().ref('schoolDB').child(tempo.id)

                                if(name !== ""){
                                    element.update({
                                        name : name
                                    })
                                }
                                if(respo !== "") {
                                    element.update({
                                        respo : respo
                                    })
                                }
                                if(contact !== ""){
                                    element.update({
                                        contact : contact
                                    })
                                }
                                if(mail !== "") {
                                    element.update({ 
                                        mail : mail
                                })
                                }
                                if(category !== "") {
                                    element.update({ 
                                        category : category
                                })
                                }
                                if(localisation !== "") {
                                    element.update({ 
                                        localisation : localisation
                                })
                                }
                                handleClose()
                                setTempo({})
                                setDataSchool(datas)
                                
                            }
                        }
                            >Valider</Button>
                        </Modal.Footer>
                    </Modal> 
                  
        </div>
    )
}

export default ListSchools
