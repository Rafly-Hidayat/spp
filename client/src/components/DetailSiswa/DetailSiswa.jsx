import React, { Component } from 'react'
import { Container, Row, Col, Button, Form, Figure } from 'react-bootstrap'

import User from './User.jpg'

import './DetailSiswa.css'

export default class DetailSiswa extends Component {
    render() {
        return (
            <div className='detail'>
                <Row>
                    <Col md={8}>
                        <div className="data">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>NIS</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" value={"1902004"} disabled />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" value={"Budi Santoso"} disabled />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Kelas</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" value={"10 RPL 3"} disabled />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" value={"Laki - laki"} disabled />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Jurusan</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" value={"Rekayasa Perangkat Lunak"} disabled />
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="profile">
                            <Figure className='img'>
                                <Figure.Image
                                    width={382}
                                    height={220}
                                    alt="not found"
                                    src={User}
                                />
                            </Figure>
                            <div className="nama">
                                Budi Santoso
                            </div>
                            <div className="d-grid ">
                                <Button variant="primary" size="lg">
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
