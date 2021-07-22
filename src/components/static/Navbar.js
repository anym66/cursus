import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap'

function Navbars() {

    const [dataStudent, setDataStudent] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() =>{

    }, [])

    return (
        <div>
            <main>
                <header class="p-3 bg-dark text-white">
                    <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><h4 class="nav-link px-2 text-white">schoolTrack</h4></li>
                        </ul>
                        <form class="w-80 me-3">
                            <input type="search" class="form-control" placeholder="Search..." aria-label="Search"/>
                        </form>
                            <button type="button" class="btn btn-primary me-2" onClick = {handleShow}>didactitiel</button>
                        <div class="text-end">
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

export default Navbars
