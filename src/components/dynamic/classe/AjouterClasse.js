import React, { useState, useEffect } from 'react'
import MultiStep from 'react-multistep'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import firebase from '../../../config/firebase'

function AjouterClasse() {
  const [nameClasse, setNameClasse] = useState('')
  const [descriptionClasse, setDescriptionClasse] = useState('')
  const [numberModule, setNumberModule] = useState(0)
  const [data, setData] = useState([])
  const [moduleClasse, setModuleClasse] = useState([])
  const school = localStorage.getItem('school')
  
  useEffect(()=>{
    const database = firebase.database().ref('moduleDB')
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
},[])

const handleChange = (e) =>{
  if(e.target.checked){
      const temp = moduleClasse
      temp.push(e.target.value)
      setModuleClasse(temp)
      console.log(moduleClasse)
  } else {
      const index = moduleClasse.indexOf(e.target.value)
      moduleClasse.splice(index, 1)
      console.log(moduleClasse)
  }
}

  const handleName = (e) =>{
    setNameClasse(e.target.value)
    console.log(nameClasse)
  }
  const handleDescription = (e) =>{
    setDescriptionClasse(e.target.value)
    console.log(descriptionClasse)
  }
  const handleModule = (e) =>{
    setNumberModule(e.target.value)
    console.log(numberModule)
    console.log(numberModule)
  }
  const handleSubmit = () =>{
    const database = firebase.database().ref('classDB')
    const dataClass = {
      nameClasse,
      descriptionClasse,
      numberModule,
      moduleClasse,
      school
    }
    database.push(dataClass)
    setDescriptionClasse('')
    setNameClasse('')
    setNumberModule(0)
    setModuleClasse([])
  }

  const steps = [
    {name : 'StepOne',
     component : <StepOne
      name = {nameClasse} description = {descriptionClasse} number = {numberModule}
      handleNameClasse = {handleName} handleNumberModule = {handleModule} handleDesciptionClasse = {handleDescription}
     /> },
    {name : 'StepTwo', 
    component : <StepTwo number = {numberModule} handleChange = {handleChange}
    data = {data} handleClick = {handleSubmit} /> }
  ]
  const prevStyle = {'background': '#FFF',  'border-width': '1px', 'padding': '10px 30px', 'border-raduis' : '2px', 'margin' : '20px' }
 
  const nextStyle = {'background': '#FFF',  'border-width': '1px', 'padding': '10px 30px', 'border-raduis' : '2px', 'margin' : '20px'}


    return (
        <div className = "card mt-3 mx-5 ">
          <MultiStep 
            showNavigation={true}
            steps={steps}
            prevStyle={prevStyle}
            nextStyle={nextStyle}
            />
        </div>
    )
}

export default AjouterClasse
