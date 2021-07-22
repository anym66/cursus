import Sidebar from '../../static/Sidebar'
import React, { useState } from 'react'
import {Link, Route, Switch } from 'react-router-dom'
import {AiOutlineOrderedList} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import AjouterEleve from './AjouterEleve'
import ListeEleves from './ListeEleves'
import Navbars from '../../static/Navbar'

function Eleves() {

    const active = "active"
    const [activeOrNot1, setActiveOrNot1] = useState(false)
    const [activeOrNot2, setActiveOrNot2] = useState(false)

    const handleActveA = () => {
        setActiveOrNot1(true)
        setActiveOrNot2(false)
    }
    const handleActveB = () => {
        setActiveOrNot1(false)
        setActiveOrNot2(true)
    }

    return (
        <div>
            <Navbars />
                <div class="d-flex bd-highlight">
                    <Sidebar active = 'student' />
                    <div className = "p-2 flex-grow-1 bd-highlight mt-3">
                        <header class="d-flex justify-content-center py-3">
                            <ul class="nav nav-pills">
                                <li class="nav-item"  onClick = {handleActveA} ><Link to="/eleves/ajouteeleve" class= {activeOrNot1 === true ? "nav-link fs-6 active" :"nav-link fs-6" }  ><BsFillPlusCircleFill/> Ajout un Eleve</Link></li>
                                <li class="nav-item" onClick = {handleActveB}><Link to="/eleves/listeeleves" class= {activeOrNot2 === true ? "nav-link fs-6 active" :"nav-link fs-6" }><AiOutlineOrderedList/> Liste des Eleves</Link></li>
                            </ul>
                        </header>
                        <div>
                            <Switch>
                                <Route path = "/eleves/ajouteeleve" component = {AjouterEleve} />
                                <Route path = "/eleves/listeeleves" component = {ListeEleves} />
                            </Switch>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Eleves
