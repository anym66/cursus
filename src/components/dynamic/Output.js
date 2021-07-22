import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Classes from './classe/Classes'
import Modules from './module/Modules'
import Dashboard from './Dashboard'
import Enseignants from './enseignant/Enseignants'
import Eleves from './eleve/Eleves'
import LoginAdministrator from '../login/LoginAdministrator'
import LoginSup from '../login/LoginSup'
import DashboardSup from './supiveur/DashboardSup'
import NewSchool from './supiveur/ecole/NewSchool'
import ListSchools from './supiveur/ecole/ListSchools'
import Login from '../login/Login'
import NewAdmin from './supiveur/admin/NewAdmin'
import ListAdmins from './supiveur/admin/ListAdmins'
import ClassDetails from './classe/ClassDetails'
import Registration from './registration/Registration'
import Cursus from './cursus/Cursus'
import CursusDetails from './cursus/CursusDetails'
import CursusForAdmin from './cursus/CursusForAdmin'

function Output() {
    return (
        <div>
            <BrowserRouter>
                <Route exact path = "/dashboard" component = {Dashboard} />
                <Route path = "/eleves" component = {Eleves} />
                <Route path = "/classes" component = {Classes} />
                <Route path = "/modules" component = {Modules} />
                <Route path = "/enseignants" component = {Enseignants} />
                <Route exact path = "/" component = {LoginAdministrator}/>
                <Route path = "/supervisor" component = {LoginSup}/>
                <Route path = "/dashboardsuperviseur" component = {DashboardSup}/>
                <Route path = "/newschool" component = {NewSchool}/>
                <Route path = "/listschools" component = {ListSchools}/>
                <Route path = "/newadmin" component = {NewAdmin}/>
                <Route path = "/listadmins" component = {ListAdmins}/>
                <Route path = "/login" component = {Login}/>
                <Route path = "/classedetails/:id" component = {ClassDetails}/>
                <Route path = "/registration" component = {Registration}/>
                <Route path = "/cursus" component = {Cursus}/>
                <Route path = "/cursusdetails/:nameId" component = {CursusDetails}/>
                <Route path = "/cursusforadmin" component = {CursusForAdmin}/>
            </BrowserRouter>
        </div>
    )
}

export default Output
