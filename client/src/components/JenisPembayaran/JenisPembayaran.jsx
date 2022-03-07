import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar/SideBar";

export default class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tipe: "",
    };
  }

  getAdmin = () => {
    axios.get("http://localhost:8000/pembayaran/").then((res) => {
      this.setState({
        data: res.data,
        tipe: res.data[0].pembayaran_tipe,
      });
    });
  };

  handleRemove = (pembayaran_id) => {
    axios
      .delete(`http://localhost:8000/hapus/pembayaran/${pembayaran_id}`)
      .then((res) => {})
      .catch((err) => {});
    this.getAdmin();
  };

  componentDidMount() {
    this.getAdmin();
    // const get = this.state.data.map((data))
    //
  }
  render() {
    const data = this.state.data;
    const get = this.state.data.map((data) => {
      return data.periode_akhir;
    });

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "pembayaran_tipe",
        text: "Tipe",
      },
      {
        dataField: "periode_mulai",
        text: "Tahun Ajaran",
        formatter: (cellContent, row) => {
          return <div>{`${row.periode_mulai}/${row.periode_akhir}`}</div>;
        },
      },
      {
        dataField: "pos_nama",
        text: "Nama Pos",
      },
      {
        text: "Set Tarif",
        formatter: (cellContent, row) => {
          return (
            <div>
              <Link to={`/admin/pembayaran/set_tarif/${row.pembayaran_id}`}>
                <Button variant="primary" className="mr-2" block>
                  Set Tarif
                </Button>
              </Link>
            </div>
          );
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
                    <Link to={`/admin/pembayaran/ubah/${row.pembayaran_id}`}>
                      <Button variant="warning" className="mr-2" block>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => this.handleRemove(row.pembayaran_id)}
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
            <Link to={"/admin/jenispembayaran/tambah"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Create
              </Button>
            </Link>
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
