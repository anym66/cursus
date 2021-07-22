import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Sidebar from '../../static/Sidebar'
import {AiOutlineOrderedList} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import AjouterClasse from './AjouterClasse'
import ListeClasses from './ListeClasses'
import Navbars from '../../static/Navbar'

function Classes() {

    const [isActiveA, setIsActiveA] = useState(false)
    const [isActiveB, setIsActiveB] = useState(false)
    
    const activeA = () =>{
        setIsActiveA(true)
        setIsActiveB(false)
    }
    const activeB = () =>{
        setIsActiveB(true)
        setIsActiveA(false)
    }


    return (
        <div>
            <Navbars/>
            <div class="d-flex bd-highlight">
                <Sidebar active = "classe" />
                <div className = "p-2 flex-grow-1 bd-highlight mt-3"  style={{width: "1000px"}}>
                    <header class="d-flex justify-content-center py-3">
                        <ul class="nav nav-pills">
                            <li className="nav-item" onClick = {activeA}><Link to="/classes/ajouterclasse" className={ isActiveA?"nav-link active":"nav-link" }><BsFillPlusCircleFill/> Ajouter Classe</Link></li>
                            <li className="nav-item" onClick = {activeB} ><Link to="/classes/listeclasses" className={ isActiveB?"nav-link active":"nav-link" }><AiOutlineOrderedList/> Liste Classes</Link></li>
                        </ul>
                    </header>
                    <Switch>
                        <Route path = "/classes/ajouterclasse" component = {AjouterClasse} />
                        <Route path = "/classes/listeclasses" component = {ListeClasses} />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Classes
