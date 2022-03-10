import React, { Component } from 'react';
import axios from 'axios'
import { Container, Row, Col, Card, Table, Button, Form, Nav, Navbar, FormControl, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faInfo, faBell, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



import logo from '../Assets/LandingPageImg/Logo.png'

import './PembayaranBebas.css';

export default class PembayaranBebas extends Component {

    constructor(props) {
        super(props)

        const user = localStorage.getItem('dataAdmin');

        this.state = {
            data: [],
            datasiswa : [],
        }

    }


    getPostAPI = () => {
        const nis = JSON.parse(localStorage.getItem('dataAdmin')).nis[0];
        axios.get(`http://localhost:8000/bebas/${nis}`)
        .then((res) => {
            console.log(res.data[0])
            this.setState({
                datasiswa: res.data[0]
            });
            console.log(this.state.datasiswa)
            })
    }

    // json-server --watch db.json --port 3004

    componentDidMount() {
        this.getPostAPI();

    }

    render() {
        // const data = this.state.data

        const desktop = [{
            dataField: 'id',
            text: 'No',
            sort: true,
            align: 'center',
            headerAlign: 'center'
        }, {
            dataField: 'keterangan',
            text: 'Pembayaran'
        }, {
            dataField: 'tgl_bayar',
            text: 'Tanggal Bayar'
        }, {
            dataField: 'jumlah',
            text: 'Jumlah'
        }, {
            dataField: 'terbayar',
            text: 'Terbayar'
        }, {
            dataField: 'status',
            text: 'Status'
        }];


        const mobile = [{
            dataField: 'siswa_id',
            text: 'No',
            sort: true
        }, {
            dataField: 'pembayaran_tipe',
            text: 'Pembayaran'
        }, {
            text: 'Status',
            // formatter:(cell, row) => {
            //     if(row.bebas_total_bayar === row.bebas_tagihan){
            //         return <div className="text-success">Lunas</div>
            //     }else{
            //         return <div className="text-danger">Belum Lunas</div>
            //     }
            // }
        }, {
            dataField: "Aksi",
            text: "Aksi",
            align: 'center',
            headerAlign: 'center',
            // make delete and update button
            formatter: (cellContent, row) => {
                return (
                    <div>
                        <Container>
                            <Row>
                                <Col>
                                    {/* <Link to={`/admin/jurusan/ubah/${row.jurusan_id}`} > */}
                                    <Button variant="warning" className="mr-2 " block >
                                        <FontAwesomeIcon icon={faInfo} />
                                    </Button>
                                    {/* </Link> */}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                );
            },
        }];

        return (
            <div>
                <div className="data-user">
                    {/* Navbar */}


                    {/* Sidebar */}


                    {/* Data Table  */}
                    <Card body>
                        {/* Tampilan Desktop */}
                        <div className="desktop">
                            <BootstrapTable
                                keyField='id'
                                data={this.state.datasiswa}
                                columns={desktop}
                                noDataIndication="Table is Empty"
                                bordered={false}
                            />
                        </div>


                        {/* Tampilan Mobile */}
                        <div className="mobile">
                            <BootstrapTable
                                keyField='id'
                                data={this.state.datasiswa}
                                columns={mobile}
                                noDataIndication="Table is Empty"
                                bordered={false}
                            />
                        </div>
                    </Card>


                </div>
            </div >
        );
    }
}
