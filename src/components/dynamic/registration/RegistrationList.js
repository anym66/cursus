import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiFillEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import {Link} from 'react-router-dom'

function RegistrationList() {

    const [dataRegis, setDataRegis] = useState([])
    const [itemSearch, setItemSearch] = useState('')
    const school = localStorage.getItem('school')
        
    const handleSearch = (e) =>{
        setItemSearch(e.target.value)
        console.log(itemSearch)
    }

    useEffect(()=>{
        const database = firebase.database().ref('registrationDB')
        database.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            console.log(snapshot.val())
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataRegis(list)
        })
    }, [])

    return (
        <div>
            <div>
                <div className = "container col-9 mx-auto mt-5">
                        <div class="input-group flex-nowrap">
                            <input type="text" class="form-control col-8 mx-auto rounded-pill " placeholder="search..." aria-label="Username"
                                value = {itemSearch} onChange = {handleSearch}
                            />
                        </div>
                        <div className = "card">
                            <table class="table  table-ligth table-striped table-lg table-borderless mt-5 align-items-center">
                                <thead class="table-secondary">
                                    <tr>
                                        <th scope="col">Noms élève</th>
                                        <th scope="col">classe</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                dataRegis.filter((item) =>{
                                    return item.student.toLowerCase().includes(itemSearch)})
                                .map((item , index) =>{
                                    if(item.school === school) {
                                        return(
                                            <tr>
                                                <td>{item.student}</td>
                                                <td>{item.classe}</td>
                                                <td>
                                                        <button className = "btn btn-secondary mx-2">
                                                            Consulter <AiFillEye/>
                                                        </button>                
                                                    <button className = "btn btn-dark">
                                                        Supprimer <BsTrash/>
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
        </div>
        </div>
    )
}

export default RegistrationList
