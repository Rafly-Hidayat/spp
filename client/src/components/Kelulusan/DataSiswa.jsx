import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class DataSiswa extends Component {

  render() {
    return (
      <div>
          <br/>
        <Card style={{color: 'black'}}>
            <Card.Body>
           <Card.Title>Data Kelas</Card.Title>
           <hr/>
            {this.props.name}     
            </Card.Body>
        </Card>
        </div>
    )
  }
}
