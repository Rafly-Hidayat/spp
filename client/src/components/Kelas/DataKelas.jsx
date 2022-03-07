import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

export default class DataKelas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  getkelas = () => {
    axios.get("http://localhost:8000/kelas/").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  handleRemove = (kelas_id) => {
    axios
      .delete(`http://localhost:8000/hapus/kelas/${kelas_id}`)
      .then((res) => {})
      .catch((err) => {});
    this.getkelas();
  };

  //   getAdmin = () => {
  //       axios.get('http://localhost:8000/jurusan/')
  //       .then((response) => response.json())
  //       .then((json) => {
  //
  //           this.setState({
  //               data : json
  //           })
  //       })
  //   }

  componentDidMount() {
    this.getkelas();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "kelas_id",
        text: "ID Kelas",
        sort: true,
      },
      {
        dataField: "kelas_nama",
        text: "Nama Kelas",
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              {/* <Sidebar /> */}
              <Container>
                <Row>
                  <Col md={2}>
                    <Link to={`/admin/kelas/ubah/${row.kelas_id}`}>
                      <Button variant="outline-warning" className="mr-2" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.kelas_id)}
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
    const defaultSorted = [
      {
        dataField: "kelas_id",
        order: "asc",
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
            <Link to={"/admin/kelas/tambah/"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Tambah
              </Button>
            </Link>
            <hr/>
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              defaultSorted={defaultSorted}
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
