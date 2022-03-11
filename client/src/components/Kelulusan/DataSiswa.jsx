import axios from 'axios'
import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { Container, Button, Card, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";

export default class DataSiswa extends Component {
      constructor(props){
        super(props)

        this.state = {
          data: [],
        }
      }

      getSiswa = () => {
        const kelas_id = this.props.name;
        axios.get(`http://localhost:8000/siswa_kelas/${kelas_id}`).then((res) => {
          console.log(res.data);
          this.setState({
            data: res.data,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Gagal terhubung ke server, silahkan coba lagi!`,
          });
        });
        };

        componentDidCatch(){

        }
        componentDidUpdate(){
          
        }
        componentWillUnmount(){
          
        }
        componentDidMount(){
          this.getSiswa();
        }

  render() {
    const data = this.state.data;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      disablePageTitle: true,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: data.length
      }] // A numeric array is also available. the purpose of above example is custom the text
    };
    const columns = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "siswa_nis",
        text: "NIS",
        align: "center",
        headerAlign: "center",
      },
      {
        dataField: "siswa_gender",
        text: "Jenis Kelamin",
        align: "center",
        headerAlign: "center",
      },
      {
        dataField: "kelas_nama",
        text: "Kelas",
        align: "center",
        headerAlign: "center",
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
      },
    ];
    const defaultSorted = [
      {
        dataField: "siswa_nama",
        order: "asc",
      },
    ];
    return (
      <div>
      <br/>
        <Card>
          <Card.Body>
                    <div>
                  <BootstrapTable
                    keyField="id"
                    data={data}
                    columns={columns}
                    striped
                    hover
                    condensed
                    bordered={false}
                    pagination={paginationFactory(options)}
                    defaultSorted={defaultSorted}
                  />
                </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
