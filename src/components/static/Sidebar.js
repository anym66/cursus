import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {BsClipboardData} from 'react-icons/bs'
import {BsFillPersonFill} from 'react-icons/bs'
import {BsHouse} from 'react-icons/bs'
import {BsBookHalf} from 'react-icons/bs'
import {BsPersonLinesFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import { IoIosSchool } from "react-icons/io";

function Sidebar(props) {

    return (
        <div>
            <main>
  
                <div class="p-2 bd-highlight bg-ligth" style={{width: "180px"}}>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li className="nav-item mb-1">
                            <Link to="/dashboard" className={props.active === 'dashboard'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" } aria-current="page">
                            <BsClipboardData/> Dashboard
                            </Link>
                        </li>
                        <li class="nav-item  mb-1">
                            <Link to="/eleves" className={props.active === 'student'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" }>
                            <BsFillPersonFill/> Eleves
                            </Link>
                        </li>
                        <li class="nav-item  mb-1">
                            <Link to="/classes" className={props.active === 'classe'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" }>
                            <BsHouse/> Classes
                            </Link>
                        </li>
                        <li class="nav-item  mb-1">
                            <Link to="/modules" className={props.active === 'module'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" }>
                            <BsBookHalf/> Modules
                            </Link>
                        </li>
                        <li class="nav-item  mb-2">
                            <Link to="/enseignants" className={props.active === 'teacher'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" }>
                            <BsPersonLinesFill/> Enseignants
                            </Link>
                        </li>
                    
                        <Link to = "/registration" className={props.active === 'registration'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" }>
                            <AiFillEdit/> Enregistrement
                        </Link>
                        <Link to = "/cursus" className={props.active === 'cursus'? "nav-link active text-ligth fs-6" : "nav-link text-dark fs-6" }>
                            <IoIosSchool/> Cursus
                        </Link>
                    </ul>
                </div>
                <div class="b-example-divider"></div>
            </main>
        </div>
    )
}

export default Sidebar
