import React, { useState } from 'react'

function StepTwo(props) {
    
    const [itemSearch, setItemSearch] = useState('')
    const school = localStorage.getItem('school')
        
    const handleSearch = (e) =>{
        setItemSearch(e.target.value)
        console.log(itemSearch)
    }
    
    

    return (
        <div>
                <div className = "container col-9 mx-auto mt-5">
                        <div class="input-group flex-nowrap">
                            <input type="text" class="form-control col-8 mx-auto rounded-pill " placeholder="search..." aria-label="Username"
                                value = {itemSearch} onChange = {handleSearch}
                            />
                        </div>
                        <table class="table  table-ligth table-striped table-lg table-borderless mt-5 align-items-center">
                            <thead class="table-secondary">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Libelle</th>
                                    <th scope="col">Nom Enseignant</th>
                                    <th scope="col">Ajouter</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                            props.data.filter((item) =>{
                                return item.libelle.toLowerCase().includes(itemSearch)})
                            .map((item , index) =>{
                                if(item.school === school) {
                                    return(
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{item.code}</td>
                                            <td>{item.libelle}</td>
                                            <td>{item.nameprof}</td>
                                            <td>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" value = {item.code}
                                                    onChange = {props.handleChange}/>
                                            </div>
                                            </td>
                                        </tr>
                                )
                                }
                            })
                        }
                            </tbody>
                    </table>
                </div>
                <div>
                    <button className = "btn btn-primary btn-lg position-absolute bottom-0 end-0 mb-3 me-3" onClick = {props.handleClick} >valider</button>
                </div>
        </div>
    )
}

export default StepTwo
