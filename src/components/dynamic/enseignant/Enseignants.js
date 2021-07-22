import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Sidebar from '../../static/Sidebar'
import {AiOutlineOrderedList} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import AjouterEnseignant from './AjouterEnseignant'
import ListeEnseignants from './ListeEnseignants'
import Navbars from '../../static/Navbar'

function Enseignants() {

    const [isActiveA, setIsActiveA] = useState(false)
    const [isActiveB, setIsActiveB] = useState(false)

    const activeA = () => {
        setIsActiveA(true)
        setIsActiveB(false)
    }
    const activeB = () => {
        setIsActiveB(true)
        setIsActiveA(false)
    }

    return (
        <div>
            <Navbars />
            <div class="d-flex bd-highlight">
                <Sidebar active = 'teacher' />
                <div className = "p-2 flex-grow-1 bd-highlight mt-3">
                    <header class="d-flex justify-content-center py-3">
                        <ul class="nav nav-pills">
                            <li class="nav-item" onClick = {activeA} ><Link to="/enseignants/ajouterenseignant" className= { isActiveA ? 'nav-link fs-6 active': 'nav-link fs-6'} ><BsFillPlusCircleFill/> Ajout un enseignant</Link></li>
                            <li class="nav-item" onClick = {activeB} ><Link to="/enseignants/listeenseignants" className={ isActiveB?"nav-link fs-6 active" : "nav-link fs-6"}><AiOutlineOrderedList/> Liste des enseignants</Link></li>
                        </ul>
                    </header>
                    <div>
                        <Switch>
                            <Route path = "/enseignants/ajouterenseignant" component = {AjouterEnseignant} />
                            <Route path = "/enseignants/listeenseignants" component = {ListeEnseignants} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Enseignants

