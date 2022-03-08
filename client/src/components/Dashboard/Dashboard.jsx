import React, { Component } from 'react'
import { Container, Navbar, Nav, NavDropdown, Card, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCreditCard, faUserCheck, faUserTimes } from '@fortawesome/free-solid-svg-icons'
import './Dashboard.css'
import Sidebar from '../Sidebar/SideBar'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>

                    {/* Card */}
                    <Col md={3} sm={6}>
                        <Card body bg="primary" className='card' sm={5} >
                            <Row>
                                <Col md={4} className='icon'>
                                    <FontAwesomeIcon icon={faUsers} />
                                </Col>
                                <Col md={8} className='content'>
                                    <h1> 100</h1>
                                    <h6>Jumlah Siswa</h6>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col md={3} sm={6}>
                        <Card body bg="success" className='card' >
                            <Row>
                                <Col md={4} className='icon'>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </Col>
                                <Col md={8} className='content'>
                                    <h1> 180</h1>
                                    <h6>Transaksi</h6>
                                </Col>
                            </Row>

                        </Card>
                    </Col>

                    <Col md={3} sm={6}>
                        <Card body bg="danger" className='card' >
                            <Row>
                                <Col md={4} className='icon'>
                                    <FontAwesomeIcon icon={faUserTimes} />
                                </Col>
                                <Col md={8} className='content'>
                                    <h1> 84</h1>
                                    <h6>Belum Lunas</h6>
                                </Col>
                            </Row>

                        </Card>
                    </Col>

                    <Col md={3} sm={6}>
                        <Card body bg="secondary" className='card' >
                            <Row>
                                <Col md={4} className='icon'>
                                    <FontAwesomeIcon icon={faUserCheck} />
                                </Col>
                                <Col md={8} className='content'>
                                    <h1> 16</h1>
                                    <h6>Sudah Lunas</h6>
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
