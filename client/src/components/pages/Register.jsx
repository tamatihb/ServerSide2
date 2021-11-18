import React from 'react'
import { Fragment } from 'react'
import {Container} from 'react-bootstrap'
import '../css/Register.css'

const Register = () => {
    return (
        <Fragment>
            <div class="form-container">
      <form class="register-form">
        <input
          id="first-name"
          class="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
        />
        <input
          id="last-name"
          class="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
        />
        <input
          id="email"
          class="form-field"
          type="text"
          placeholder="Email"
          name="email"
        />
        <button class="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
    
   <Container className="register">
            <h1>Simply Register Above to access premium services</h1>
                <p>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque error 
                 ullam, impedit laborum sint aperiam placeat delectus modi eveniet omnis. Corrupti ullam modi in doloribus 
                 aliquam! Reiciendis pariatur fugiat, excepturi aut maxime natus labore. Incidunt ab rerum aliquam sint quis illum 
                 accusantium quas magnam! Cum provident vitae ex non aliquid.
                 </p>
   </Container>
    </Fragment>
  )
  
}

export default Register
