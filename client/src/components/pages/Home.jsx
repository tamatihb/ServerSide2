import React , {Fragment}from 'react'
import  {Container,Jumbotron}  from "react-bootstrap";
import Hero from '../common/Hero';

const Home = () => {
    return (
   <Fragment>
     <Hero/>
     <br />
     <Jumbotron fluid>
            <Container>
                <h1>Welcome to the Home Page.</h1>
                <p>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque error 
                 ullam, impedit laborum sint aperiam placeat delectus modi eveniet omnis. Corrupti ullam modi in doloribus 
                 aliquam! Reiciendis pariatur fugiat, excepturi aut maxime natus labore. Incidunt ab rerum aliquam sint quis illum 
                 accusantium quas magnam! Cum provident vitae ex non aliquid.
                 </p>
            </Container>
        </Jumbotron>
    </Fragment>
    )
}

export default Home
