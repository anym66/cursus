import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import {Link} from 'react-router-dom'

function ListeClasses() {

    const [dataClass, setDataClass] = useState([])
    const [itemSearch, setItemSearch] = useState('')
    const school = localStorage.getItem('school')
        
    const handleSearch = (e) =>{
        setItemSearch(e.target.value)
        console.log(itemSearch)
    }

    useEffect(()=>{
        const database = firebase.database().ref('classDB')
        database.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            console.log(snapshot.val())
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataClass(list)
        })
    }, [])

    return (
        <div>
                <div className = "container col-12 mx-auto mt-5">
                        <div class="input-group flex-nowrap">
                            <input type="text" class="form-control col-8 mx-auto rounded-pill " placeholder="search..." aria-label="Username"
                                value = {itemSearch} onChange = {handleSearch}
                            />
                        </div>
                        <div className = "card">
                            <table class="table  table-ligth table-striped table-lg table-borderless mt-5 align-items-center">
                                <thead class="table-secondary">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Code</th>
                                        <th scope="col">Libelle</th>
                                        <th scope="col">Nom Enseignant</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                dataClass.filter((item) =>{
                                    return item.nameClasse.toLowerCase().includes(itemSearch)})
                                .map((item , index) =>{
                                    if(item.school === school) {
                                        return(
                                            <tr>
                                                <th scope="row">{index}</th>
                                                <td>{item.nameClasse}</td>
                                                <td>{item.descriptionClasse}</td>
                                                <td>{item.numberModule}</td>
                                                <td>
                                                    <Link to= {`/classedetails/${index}`} >
                                                        <button className = "btn btn-secondary mx-2">
                                                            Consulter
                                                        <AiOutlineEdit/></button>
                                                    </Link>                           
                                                    <button className = "btn btn-dark">Supprimer<BsTrash/></button>
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
        </div>
    )
}

export default ListeClasses
