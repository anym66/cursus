import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Button, Card, Modal } from 'react-bootstrap';

function ListeEnseignants() {

    const [data, setData] = useState([])
    const [itemSearch, setItemSearch] = useState("")
    const [show, setShow] = useState(false);
    const [dataEns, setDataEns] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tempo, setTempo] = useState({})

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [adresse, setAdresse] = useState("")
    const [contact, setContact] = useState("")
    const school = localStorage.getItem('school')

    useEffect(()=>{
        const database = firebase.database().ref('ensDB')
        database.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            console.log(previousList)
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setData(list)
            data.map((item) =>{
                if(item.school === school){
                    const temp = dataEns
                    temp.push(item)
                    setDataEns(temp)
                    console.log(dataEns)
                }
            })
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
                                    return item.nameEns.toLowerCase().includes(itemSearch)})
                                .map((item , index) =>{ 
                                    if(item.school === school){
                                        return(
                                            <tr>
                                                <th scope="row">{index}</th>
                                                <td>{item.nameEns}</td>
                                                <td>{item.surnameEns}</td>
                                                <td>{item.adresseEns}</td>
                                                <td>{item.contactEns}</td>
                                                <td>
                                                    <button className = "btn btn-outline-primary mx-5"
                                                    onClick={ () =>{
                                                        handleShow()
                                                        setTempo(data[index])
                                                    }}>Modifier<AiOutlineEdit/></button>
                                                    
                                                    <button className = "btn btn-secondary" onClick ={() =>{
                                                        setTempo(data[index])
                                                        let element = firebase.database().ref('ensDB').child(tempo.id)
                                                        element.remove()

                                                    } }>Supprimer<BsTrash/></button>
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
                        <Modal.Title>{tempo.surnameEns} {tempo.nameEns}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div class="d-flex mb-3">
                                    <div class="form-group col-md-6 me-2">
                                        <label className = "mb-2 text-secondary">Noms</label>
                                        <input type="text" class="form-control" placeholder = {tempo.nameEns} value = {name} onChange = {handleName} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label className = "mb-2 text-secondary">Prenoms</label>
                                        <input type="text" class="form-control" placeholder = {tempo.surnameEns} value = {surname} onChange = {handleSurname} />
                                    </div>
                                </div>
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">Addresse</label>
                                    <input type="text" class="form-control" placeholder = {tempo.adresseEns} value = {adresse} onChange = {handleAdresse} />
                                </div>
                                <div class="form-group">
                                    <label className = "mb-2 text-secondary">Contacts</label>
                                    <input type="text" class="form-control" placeholder = {tempo.contactEns} value = {contact} onChange = {handleContact} />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick = {
                            () =>{
                                let element = firebase.database().ref('ensDB').child(tempo.id)

                                if(name !== ""){
                                    element.update({
                                        nameEns : name
                                    })
                                }
                                if(surname !== "") {
                                    element.update({
                                        surnameEns : surname
                                    })
                                }
                                if(contact !== ""){
                                    element.update({
                                        contactEns : contact
                                    })
                                }
                                if(adresse !== "") {
                                    element.update({ 
                                        adresseEns : adresse
                                })
                                }
                                handleClose()
                                setTempo({})
                                setName('')
                                setSurname('')
                                setAdresse('')
                                setContact('')
                                
                            }
                        } >Valider</Button>
                        </Modal.Footer>
                    </Modal> 
                
        </div>
    )
}

export default ListeEnseignants
