import React, { useEffect, useState } from 'react'
import Navbarsup from './Navbarsup'
import firebase from '../../../config/firebase'

function DashboardSup() {

    const [dataSchool, setDataSchool] = useState([])
    const [dataStudent, setDataStudent] = useState([])
    const [dataEns, setDataEns] = useState([])

    useEffect(()=>{
        const database = firebase.database().ref('schoolDB')
        const databaseA = firebase.database().ref('studentDB')
        const databaseB = firebase.database().ref('ensDB')
        database.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            console.log(previousList)
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataSchool(list)
            })
        
        databaseA.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            console.log(previousList)
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataStudent(list)
            })
        databaseB.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            console.log(previousList)
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataEns(list)
            })      

    }, [])

    return (
        <div>
            <Navbarsup/>
            <div>
                <div class="d-flex mb-3 mt-3 mx-2">
                    <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                        <div class="card-body card-img-overlay">
                            <h6 class="card-title" style = {{color : "GrayText"}} >Ecole</h6>
                            <div>
                                <h1 class="card-text position-absolute top-50 ">{dataSchool.length}</h1>
                            </div>
                            
                        </div>
                    </div>
                    <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                        <div class="card-body">
                            <h6 class="card-title" style = {{color : "GrayText"}} >Eleves</h6>
                            <h1 class="card-text position-absolute top-50">{dataStudent.length}</h1>
                            
                        </div>
                    </div>
                    <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                        <div class="card-body">
                            <h6 class="card-title" style = {{color : "GrayText"}} >Modules d'enseignements</h6>
                            <h1 class="card-text position-absolute top-50">{dataEns.length}</h1>
                            
                        </div>
                    </div>
                    <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                        <div class="card-body">
                            <h6 class="card-title" style = {{color : "GrayText"}} >Classes</h6>
                            <h1 class="card-text position-absolute top-50">{dataSchool.length}</h1>
                            
                        </div>
                    </div>
                </div>
                   
            </div>
        </div>
    )
}

export default DashboardSup
