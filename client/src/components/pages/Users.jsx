import React from 'react'
import { Table,Jumbotron,Container,   } from "react-bootstrap";
import '../css/Users.css'
const Users = () => {
    return (
        <div className="form">
            <h1 className="emp">Employees</h1>
         <Table className="table" striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id:</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>id:</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>id:</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>id:</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>id:</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</Table>
<br></br>

<Jumbotron fluid>
            <Container>
                <h1>List of employees.</h1>
                <p>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque error 
                 ullam, impedit laborum sint aperiam placeat delectus modi eveniet omnis. Corrupti ullam modi in doloribus 
                aliquam! Reiciendis pariatur fugiat, excepturi aut maxime natus labore. Incidunt ab rerum aliquam sint quis illum 
                accusantium quas magnam! Cum provident vitae ex non aliquid.
                 </p>
          
            </Container>
        </Jumbotron>
        </div>
    )
}

export default Users
