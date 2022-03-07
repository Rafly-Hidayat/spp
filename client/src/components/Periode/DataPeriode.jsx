import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

export default class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  getAdmin = () => {
    axios.get("http://localhost:8000/periode/").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  handleRemove = (periode_id) => {
    axios
      .delete(`http://localhost:8000/hapus/periode/${periode_id}`)
      .then((res) => {})
      .catch((err) => {});
    this.getAdmin();
  };

  componentDidMount() {
    this.getAdmin();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "periode_id",
        text: "No",
      },
      {
        dataField: "periode_mulai",
        text: "Tahun Ajaran",
        formatter: (cellContent, row) => {
          return <div>{`${row.periode_mulai}/${row.periode_akhir}`}</div>;
        },
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
                  <Col md={2}>
                    <Link to={`/admin/periode/ubah/${row.periode_id}`}>
                      <Button variant="outline-warning" className="mr-2" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.periode_id)}
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
            <Link to={"/admin/periode/tambah"}>
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
