import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from 'react-bootstrap/Breadcrumb'


export default class DataPos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  getPos = () => {
    axios.get("http://localhost:8000/pos/").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  handleRemove = (pos_id) => {
    axios
      .delete(`http://localhost:8000/hapus/pos/${pos_id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.getAdmin();
    };

  componentDidMount() {
    this.getPos();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "pos_id",
        text: "No",
      },
      {
        dataField: "pos_nama",
        text: "Nama Pos",
      },
      {
        dataField: "pos_deskripsi",
        text: "Pos Deskripsi",
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              
              <Container>
                <Row>
                  <Col md={3}>
                    <Link to={`/admin/pos/ubah/${row.pos_id}`} >
                      <Button variant="outline-warning" className="mr-2" block >
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link> 
                  </Col>
                  <Col >
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.pos_id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        },
      },
    ];
    return (
      <div>
      <Card>
          <Card.Body>
            <Breadcrumb
              style={{
                marginTop: "-10px",
                marginBottom: "-22px",
              }}
            >
              <Breadcrumb.Item><Link to="/admin/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
              <br/>
        <Card>
          <Card.Body>
            <Link to={"/admin/pos/tambah"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Tambah
              </Button>
            </Link>
            <hr/>
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              striped
              hover
              condensed
              bordered={false}
              // selectRow={ selectRow }
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
