import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Button, Card, Modal } from 'react-bootstrap';


function ListeEleves() {

    const [data, setData] = useState([])
    const [itemSearch, setItemSearch] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tempo, setTempo] = useState({})

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [adresse, setAdresse] = useState("")
    const [contact, setContact] = useState("")
    const [date, setDate] = useState("")
    const [place, setPlace] = useState("")

    useEffect(()=>{
        const database = firebase.database().ref('studentDB')
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
    const handleName = (e) =>{
        setName(e.target.value)
    }
    const handleSurname = (e) =>{
        setSurname(e.target.value)
    }
    const handleAdresse = (e) =>{
        setAdresse(e.target.value)
    }
    const handleContact = (e) =>{
        setContact(e.target.value)
    }
    const handleDate = (e) =>{
        setDate(e.target.value)
    }
    const handlePlace = (e) =>{
        setPlace(e.target.value)
    }

    return (
        <div>
                <div className = "container col-10 mx-auto mt-5">
                        <div class="input-group flex-nowrap">
                            <input type="text" class="form-control col-8 mx-auto rounded-pill " placeholder="search..." aria-label="Username"
                                value = {itemSearch} onChange = {handleSearch}
                            />
                        </div>
                        <Card>
                        <table class="table  table-striped table-lg table-borderless mt-5 align-items-center">
                            <thead class="table-secondary">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Noms</th>
                                <th scope="col">Prenoms</th>
                                <th scope="col">Addresse</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            data.filter((item) =>{
                                return item.nameStudent.toLowerCase().includes(itemSearch)})
                            .map((item , index) =>{
                                return(
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{item.nameStudent}</td>
                                            <td>{item.surnameStudent}</td>
                                            <td>{item.contactStudent}</td>
                                            <td>{item.adresseStudent}</td>
                                            <td>
                                                <button className = "btn btn-secondary mx-5"
                                                     onClick={ () =>{
                                                        handleShow()
                                                        setTempo(data[index])
                                                }}
                                                >Modifier<AiOutlineEdit/></button>
                                                
                                                <button className = "btn btn-dark"
                                                    onClick ={() =>{
                                                        setTempo(data[index])
                                                        let element = firebase.database().ref("studentDB").child(tempo.id)
                                                        element.remove()
                                                } }
                                                >Supprimer<BsTrash/></button>
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
                        <Modal.Title>{tempo.surnameEns} {tempo.nameEns}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <form>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Noms</label>
                                        <input type="text" class="form-control" placeholder = {tempo.nameStudent} value = {name} onChange = {handleName}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Prenoms</label>
                                        <input type="text" class="form-control" placeholder = {tempo.surnameStudent} value = {surname} onChange = {handleSurname}/>
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Date de Naissance</label>
                                        <input type="date" class="form-control"  placeholder = {tempo.dateStudent} value = {date} onChange = {handleDate}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Lieu de Naissance</label>
                                        <input type="text" class="form-control" placeholder = {tempo.placeStudent} value = {place} onChange = {handlePlace}/>
                                    </div>
                                </div>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Contact</label>
                                        <input type="text" class="form-control" placeholder = {tempo.contactStudent} value = {contact} onChange = {handleContact}/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Addresse</label>
                                        <input type="text" class="form-control"  placeholder = {tempo.adresseStudent} value = {adresse} onChange = {handleAdresse}/>
                                    </div>
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
                                let element = firebase.database().ref('studentDB').child(tempo.id)

                                if(name !== ""){
                                    element.update({
                                        nameStudent : name
                                    })
                                }
                                if(surname !== "") {
                                    element.update({
                                        surnameStudent : surname
                                    })
                                }
                                if(contact !== ""){
                                    element.update({
                                        contactStudent : contact
                                    })
                                }
                                if(adresse !== "") {
                                    element.update({ 
                                        adresseStudent : adresse
                                })
                                }
                                if(date !== "") {
                                    element.update({ 
                                        dateStudent : date
                                })
                                }
                                if(place !== "") {
                                    element.update({ 
                                        placeStudent : place
                                })
                                }
                                handleClose()
                                setTempo({})
                                setName('')
                                setSurname('')
                                setAdresse('')
                                setContact('')
                                setPlace('')
                                setDate('')
                            }
                        }
                        >Valider</Button>
                        </Modal.Footer>
                    </Modal> 
        </div>
    )
}

export default ListeEleves
