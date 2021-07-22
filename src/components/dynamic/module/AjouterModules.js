import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import firebase from '../../../config/firebase'
import Navbar from '../../static/Navbar';

function AjouterModules() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [code, setCode] = useState('')
    const [libelle, setLibelle] = useState('')
    const [description, setDescription] = useState('')
    const [nameprof, setNameprof] = useState('')
    const [items, setItems] = useState([])
    const school = localStorage.getItem('school')

    useEffect(()=>{
        const database = firebase.database().ref('ensDB')
        database.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
                console.log(id, "hello") 
            }
            console.log(list)
            setData(list)
            console.log(data)
        })

        data.map((item) =>{
            const temp = items
            temp.push(item)
            setItems(temp)
        } )
    },[])

    const handleCode = (e) =>{
        setCode(e.target.value)
    }
    const handleLibelle = (e) =>{
        setLibelle(e.target.value)
    }
    const handleDescription = (e) =>{
        setDescription(e.target.value)
    }
    const handleNameprof = (e) =>{
        setNameprof(e.target.value)
    }
    
    const addModule = (e) =>{
        e.preventDefault()
        handleShow()
        const datas = {
            code,
            libelle,
            description,
            nameprof,
            school
        }

        const moduleDB = firebase.database().ref("moduleDB")
        moduleDB.push(datas)

        setCode("")
        setLibelle("")
        setDescription("")
        setNameprof("")
    }

    return (
        <div>
        <div class="card">
            <div class="card-body d-flex">
                <div className="col-lg-6">
                    <div className="card1 pb-5">
                        <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623235089/images-cursus/wxfoyujqr9u8fcypdqaf.jpg" class="image"/> </div>
                    </div>
                </div>
                <div className = "container col-lg-6 mx-auto mt-5">
                <form method = "post">
                    <div class="d-flex mb-3">
                        <div class="form-group col-md-6 me-2">
                            <label className = "mb-2 text-secondary">Code</label>
                            <input type="text" class="form-control" placeholder="Code" value = {code} onChange = {handleCode} />
                        </div>
                        <div class="form-group col-md-6">
                            <label className = "mb-2 text-secondary">Libellé</label>
                            <input type="text" class="form-control" placeholder="Libellé" value = {libelle} onChange = {handleLibelle} />
                        </div>
                    </div>
                    <div class="form-group  mb-3">
                        <label className = "mb-2 text-secondary">Description</label>
                        <textarea class="form-control" placeholder="Description" value = {description} onChange = {handleDescription} />
                    </div>
                    <div class="form-group">
                        <label className = "mb-2 text-secondary" onChange = {handleNameprof} >Nom de l'enseignant</label>
                        <select class="form-select" value = {nameprof} onChange = {handleNameprof} >
                            <option selected>Open this select menu</option>
                            {
                                data.map((item, index) =>{
                                    if(item.school === school){
                                        return(
                                        <option key = {index}> {item.nameEns} </option>
                                    )
                                    }
                                })
                            }
                        </select>
                    </div>
                    { ( code !== "" && libelle !== "" && description !== "" && nameprof !== "" )?
                            <button type="submit" class="btn btn-secondary mt-5" onClick = {addModule}>Enregistrer</button> :
                            <button class="btn btn-secondary mt-5" disabled>Enregistrer</button> }
                </form>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Module</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Un Nouveau Module de cours enregistré</Modal.Body>
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

export default AjouterModules
