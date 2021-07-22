import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Dropdown, Modal, Button} from 'react-bootstrap'

function Navbarsup() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <main>
                <header class="p-3 bg-dark text-white">
                    <div class="container">
                        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                                <li><Link to="/dashboardsuperviseur" class="nav-link px-2 text-white">Dashboard</Link></li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                            Ecole
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <Link to = "newschool" className="text-decoration-none">ajouter une école</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                            <Link to = "listschools" className="text-decoration-none">Liste des écoles</Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                            Adminstrateur scolaire
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <Link to = "newadmin" className="text-decoration-none">Nouveau Admin</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                            <Link to = "listadmins" className="text-decoration-none">Liste des admins</Link>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                                <li><Link to = "/cursusforadmin" class="nav-link px-2 text-white">Cursus</Link></li>
                            </ul>

                            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                                <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
                            </form>

                            <div class="text-end">
                                <button type="button" class="btn btn-primary me-2"  onClick = {handleShow} >Didactitiel</button>
                                <button type="button" class="btn btn-outline-light me-2">se deconnecter</button>
                            </div>
                        </div>
                    </div>
                </header>
            </main>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header>
                <Modal.Title>comment utilser l'application?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>L'application consiste en suivie du cursus scolaire des differents écoliers. Pour cela, l'application devra</p>
                    <ol>
                        <li>Enregistrer les differents professeurs</li>
                        <li>Enregistrer les differents Modules de cours. A chaque module, on affectera obligatoirement un enseignant</li>
                        <li>Enregistrer les differents classes. A chaque classe, on affectera obligatoirement des Modules</li>
                        <li>Enregistrer les differents étudiants de l'école.</li>
                        <li>Faire des enregistrements qui constituront le cursus annuel des étudiants</li>
                    </ol>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Navbarsup
