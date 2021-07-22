import React, { useEffect, useState } from 'react'
import Sidebar from '../static/Sidebar'
import firebase from '../../config/firebase'
import Navbars from '../static/Navbar'
import {Bar, Line} from 'react-chartjs-2'

function Dashboard() {

    const [dataStudent, setDataStudent] = useState([])
    const [dataEns, setDataEns] = useState([])
    const [dataModule, setDataModule] = useState([])
    const [dataRegis, setDataRegis] = useState([])
    const [dataClasse, setDataClasse] = useState([])
    const school = localStorage.getItem('school')
    const [nameClasse, setNameClasse] = useState([])
    const [numberModule, setNumberModule] = useState([])

    useEffect(()=> {

        const databaseA = firebase.database().ref('ensDB')
        const databaseB = firebase.database().ref('moduleDB')
        const databaseC = firebase.database().ref('studentDB')
        const databaseD = firebase.database().ref('classDB')

        databaseA.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            console.log(list)
            setDataEns(list)
            console.log(dataEns.length, "ense")
        })
        databaseB.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            console.log(list)
            setDataModule(list)
            console.log(dataModule.length)
        })
        databaseC.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            console.log(list)
            setDataStudent(list)
            console.log(dataStudent.length)
        })
        databaseD.on('value', (snapshot) =>{
            console.log(snapshot.val()) 
            let previousList = snapshot.val()
            let list = []
            for(let id in  previousList){
                list.push({id, ...previousList[id]})
            }
            setDataClasse(list)
            console.log(dataStudent.length, 'student')
        })
        setTimeout(() => {
            dataClasse.map((item) =>{
                const tempo = numberModule
                const tempoName = nameClasse
                tempoName.push(item.nameClasse)
                tempo.push(item.numberModule)
                setNumberModule(tempo)
                setNameClasse(tempoName)
            })
        }, 5000);
        console.log(nameClasse, numberModule)
    },[])

    const data  = {
        labels : nameClasse,
        datasets : [
            {
                labels : "couleurs preferes en france ",
                data : numberModule,
                backgroundColor : ["red"]
            }
        ]
    }

    const options = {
        maintainAspectRatio : false,
    }

    return (
        <div>
            <Navbars/>
            
            <div class="d-flex bd-highlight">
                <Sidebar active = "dashboard" />
                
                <div>
                    <div>
                        <h2 className = "h2 mt-2 mx-5 mb-3">{school}</h2>
                    </div>
                    <div class="d-flex mb-3 mt-3">
                        <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                            <div class="card-body card-img-overlay">
                                <h6 class="card-title" style = {{color : "GrayText"}} >Eleves</h6>
                                <div>
                                    <h1 class="card-text position-absolute top-50 ">{dataStudent.length}</h1>
                                </div>
                                
                            </div>
                        </div>
                        <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                            <div class="card-body">
                                <h6 class="card-title" style = {{color : "GrayText"}} >Enseignants</h6>
                                <h1 class="card-text position-absolute top-50">{dataEns.length}</h1>
                                
                            </div>
                        </div>
                        <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                            <div class="card-body">
                                <h6 class="card-title" style = {{color : "GrayText"}} >Modules d'enseignements</h6>
                                <h1 class="card-text position-absolute top-50">{dataModule.length}</h1>
                                
                            </div>
                        </div>
                        <div class="card col-md-4 me-4" style={{width: "18rem", height : "10rem"}}>
                            <div class="card-body">
                                <h6 class="card-title" style = {{color : "GrayText"}} >Classes</h6>
                                <h1 class="card-text position-absolute top-50">{dataClasse.length}</h1>
                                
                            </div>
                        </div>
                    </div>
                    <div className = "card">
                        <Line data = {data} options = {options} />
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default Dashboard
