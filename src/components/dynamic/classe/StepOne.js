import React from 'react'

function StepOne(props) {

    return (
        <div>
                <div class="d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mb-5 border-line">
                                <img src="https://res.cloudinary.com/dbcjapvf8/image/upload/v1623682585/images-cursus/ptssrbmx38l85436xwf3.jpg" class="image"/>
                            </div>
                        </div>
                    </div>
                    <div className = "container col-lg-6 mx-auto">
                        <form method = "post">
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">Denomination</label>
                                    <input type="text" class="form-control" value = {props.name} onChange = {props.handleNameClasse} />
                                </div>
                                <div class="form-group  mb-3">
                                    <label className = "mb-2 text-secondary">Nombre de Modules d'enseignements</label>
                                    <input type="number" class="form-control" value = {props.number} onChange = {props.handleNumberModule} />
                                </div>
                                <div class="form-group">
                                    <label className = "mb-2 text-secondary">Description</label>
                                    <textarea class="form-control" placeholder="Description" value = {props.decription} onChange = {props.handleDesciptionClasse} />
                                </div>
                            
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default StepOne
