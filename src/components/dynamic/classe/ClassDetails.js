import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import firebase from '../../../config/firebase'
import Navbar from '../../static/Navbar'

function ClassDetails(props) {

    const [data, setData] = useState([])
    const [classe, setClasse] = useState({})
    const id = props.match.params.id
    console.log(id)

    useEffect(()=>{
        const database = firebase.database().ref('classDB')
        database.on('value', (snapshot) =>{
            let previousList = snapshot.val()
            console.log(snapshot.val())
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setData(list)
            console.log(data)
        })
        
    }, [])

    return (
    <div>
        <Navbar/>    
        <div className = "card col-md-8 mx-auto mt-5">
            <form method = "post ">
                <div class="form-group col-md-8 mx-5 mt-5 mb-3">
                    <label className = "mb-2 text-secondary">Denomination</label>
                    <input type="text" class="form-control" value = {data[id].nameClasse} />
                </div>
                <div class="form-group col-md-8 mx-5 mt-5 mb-3">
                    <label className = "mb-2 text-secondary">Nombre de Module</label>
                    <input type="number" class="form-control" value = {data[id].numberModule} />
                </div>
                <div class="form-group col-md-8 mx-5 mt-5 mb-3">
                    <label className = "mb-2 text-secondary">Description</label>
                    <textarea type="text" class="form-control" value = {data[id].descriptionClasse} />
                </div>
                <div>
                    <label  className = "mb-2 text-secondary ms-5 mt-3">Matieres : </label>
                    <button className = 'btn btn-primary'> Ajouter une Matiere </button>
                    <table class="table  table-ligth table-striped table-borderless mt-5 align-items-center col-md-6">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Matiere</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            data[id].moduleClasse.map((item , index) =>{
                                    return(
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{item}</td>
                                            <td>
                                                <button className = 'btn btn-danger'> Supprimer </button>
                                            </td>
                                        </tr>
                                )
                            })
                        }
                            </tbody>
                    </table>
                </div>
                
            </form>
        </div>
        </div>
    )
}

export default ClassDetails
