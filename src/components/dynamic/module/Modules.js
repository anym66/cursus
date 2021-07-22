import React, { useState } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Sidebar from '../../static/Sidebar'
import AjouterModules from './AjouterModules'
import ListerModules from './ListerModules'
import {AiOutlineOrderedList} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import Navbars from '../../static/Navbar'


function Modules() {

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
            <Navbars/>
            <div class="d-flex bd-highlight">
                <Sidebar active = "module" />
                <div className = "p-2 flex-grow-1 bd-highlight mt-3">
                    <header class="d-flex justify-content-center py-3">
                        <ul class="nav nav-pills">
                            <li class="nav-item"  onClick = {handleActveA} ><Link to="/modules/ajoutermodule" class= {activeOrNot1 === true ? "nav-link fs-6 active" :"nav-link fs-6" }  > <BsFillPlusCircleFill/>Ajout un Module</Link></li>
                            <li class="nav-item" onClick = {handleActveB}><Link to="/modules/listemodules" class= {activeOrNot2 === true ? "nav-link fs-6 active" :"nav-link fs-6" }> <AiOutlineOrderedList/>Liste des Modules</Link></li>
                        </ul>
                    </header>
                    <div>
                        <Switch>
                            <Route path = "/modules/ajoutermodule" component = {AjouterModules} />
                            <Route path = "/modules/listemodules" component = {ListerModules} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modules
