import React, { useEffect, useState } from 'react'
import firebase from '../../../config/firebase'
import { AiOutlineEdit } from "react-icons/ai";
import {Link} from 'react-router-dom'
import Navbarsup from '../supiveur/Navbarsup';

function CursusForAdmin() {

    const [dataStudent, setDataStudent] = useState([])

    useEffect(() =>{
        const database = firebase.database().ref('studentDB')
        database.on('value', (snapshot) =>{
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

    const compare = (a, b) =>{
        if(a.nameStudent < b.nameStudent)
            return -1
        if(a.nameStudent > b.nameStudent)
            return 1
        return 0
    }

    return (
        <div>
            <Navbarsup/>
            <div class="d-flex bd-highlight">
                <div className = "p-2 flex-grow-1 bd-highlight mt-3 mx-5">
                    <div>
                        <header class="py-3 mb-3 border-bottom">
                            <div class="d-flex bd-highlight">
                                <div class="bd-highlight">
                                    <select class="mt-1 form-select form-select-lg">
                                        <option selected>Selection un critère de recherche</option>
                                        <option value="1">Elève</option>
                                        <option value="2">Ecole</option>
                                        <option value="3">Année Scolaire</option>
                                    </select>
                                </div>
                                <form class=" mt-2 flex-grow-1 bd-highlight">
                                    <input type="search" class="form-control flex-grow-1" placeholder="Search..." aria-label="Search"/>
                                </form>
                            </div>
                        </header>

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
                                dataStudent.sort(compare).map((item , index) =>{
                                    return(
                                            <tr>
                                                <td>{item.nameStudent}</td>
                                                <td>{item.surnameStudent}</td>
                                                <td>
                                                    <Link to= {`/cursusdetails/${item.nameStudent.toLowerCase().replace(/\s+/g, '')}`} onClick = {() =>{
                                                        localStorage.setItem("studentName", item.nameStudent)
                                                    }}>
                                                        <button className = "btn btn-outline-primary mx-2">
                                                            Consulter<AiOutlineEdit/>
                                                        </button>  
                                                    </Link>              
                                                </td>
                                            </tr>
                                    )
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

export default CursusForAdmin
