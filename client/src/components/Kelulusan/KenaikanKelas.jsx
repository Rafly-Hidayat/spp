import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, FormSelect, Card, Form, Breadcrumb} from 'react-bootstrap';
import DataSiswa from './DataSiswa';
import SimpleReactValidator from 'simple-react-validator';

export default class KenaikanKelas extends Component {
    constructor(props){
        super(props)
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

        this.state = {
            data: [],
            selected_kelas: "",
            kelas: [],
            visible: false,
            }
        }

        handleChange = (e) => {
            e.preventDefault();
            this.setState({
                [e.target.name]: e.target.value,
            });
        };
        
        getKelas = () => {
            axios.get("http://localhost:8000/kelas/")
            .then((res) => {
                this.setState({
                    kelas: res.data,
                });
            })
            .catch((err) => {});
        };
        
        componentDidMount() {
            this.getKelas();
            console.log(this.state.visible);
        }

        renderSelectedCard(selected_kelas) {
            if(!selected_kelas)
            return console.log('')
            const siswa = DataSiswa[selected_kelas];
            console.log(selected_kelas);
            return <DataSiswa name={this.state.selected_kelas}/>;
        }
        render() {
            
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
          <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Kenaikan Kelas</Card.Title>
            <hr/>
            <Form>
              <Row>
                <Col>
                <Form.Group className="mb-3">
                <Form.Label>Kelas*</Form.Label>
                <FormSelect  name="selected_kelas" onChange={this.handleChange}>
                  <option value="">=== Pilih Kelas ===</option>
                  {this.state.kelas.map((kelas) => {
                    return (
                      <option key={kelas.kelas_id} value={kelas.kelas_id}>
                        {kelas.kelas_nama}
                      </option>
                    );
                  })}
                </FormSelect>
                <div>
                {this.validator.message("Kelas", this.state.selected_kelas, `required`, {
                  className: "text-danger",
                })}
              </div>
              </Form.Group>
                </Col>
                </Row>
                </Form>
                </Card.Body>
                </Card>
                {this.renderSelectedCard(this.state.selected_kelas)}
      </div>
    )
  }
}
