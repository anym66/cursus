
import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Sidebar from '../../static/Sidebar'
import {AiOutlineOrderedList} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import Navbar from '../../static/Navbar'
import NewRegistration from './NewRegistration'
import RegistrationList from './RegistrationList'


function Registration() {

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
            <Navbar />
            <div class="d-flex bd-highlight">
                <Sidebar active = "registration" />
                <div className = "p-2 flex-grow-1 bd-highlight mt-3">
                    <header class="d-flex justify-content-center py-3">
                        <ul class="nav nav-pills">
                            <li class="nav-item"  onClick = {handleActveA} ><Link to="/registration/newregistration" class= {activeOrNot1 === true ? "nav-link fs-6 active" :"nav-link fs-6" }  > <BsFillPlusCircleFill/>Nouvel enregistrement</Link></li>
                            <li class="nav-item" onClick = {handleActveB}><Link to="/registration/registrationlist" class= {activeOrNot2 === true ? "nav-link fs-6 active" :"nav-link fs-6" }> <AiOutlineOrderedList/>Liste des enregistrements</Link></li>
                        </ul>
                    </header>
                    <div>
                        <Switch>
                            <Route path = "/registration/newregistration" component = {NewRegistration} />
                            <Route path = "/registration/registrationlist" component = {RegistrationList} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
