// Import React modules
import React, { useState, useEffect } from 'react';

// Import npm packages
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

import "../../css/menu.css"
import Loader from '../../common/Loader';
import AlertMessage from '../../common/AlertMessage';

// Custom Styles
const Styles = styled.div`
  margin-top: 0rem;
  margin-bottom: 5rem;
  border radius: 6rem;

  .title-header {
    margin-top: 2rem;
    margin-bottom: 4rem;
    text-align: center;
  }

  .card-image {
    border-radius: 2rem;
  }

  .card-box {
    box-shadow: 0px 0px 15px -5px;
    height: 500px
    border-radius: 4 rem;
    margin-bottom: 1rem;
    background-color: whitesmoke;
    color: #A9A9A9;
  }

  .custom-spinner{
    margin-top: 2rem;
    height: 100px;
    width: 100px;
  }
`;



const H2 = styled.h2`
  font-weight: bold;
`;

const RestaurantMenu = () => {
  // (ii) Set initial state
  const [state, setState] = useState("IDLE");
  const [data, setData] = useState([]); 

   // Dynamic Alert Message States
   const [alertMessage, setAlertMessage] = useState('');
   const [alertMesageVariant, setAlertMesageVariant ] = useState('info');
 

  // (iii) Lifecycle method on load (load API & set new state)
  useEffect(() => {

    setState("INITLOAD");
    async function fetchData() {
      try {
        const response = await axios.get('/api/restaurant');
        setData(response.data);

// Success Message:
         setAlertMessage('Click the button below to add your favourite restaurant.');
         setAlertMesageVariant('success');
         setState("LOADED");
      } catch (error) {

 // Error Message
        console.log(error.response.data);
        setState("ERROR");
        setAlertMessage('There was a problem with the server');
        setAlertMesageVariant('danger');
      }
    }
    fetchData();
  }, []);

console.log(data)

  if(state === "INITLOAD"){
    return (
      <Container className="text-center" style={{marginTop: "10rem"}}>
        <Loader />
      </Container>
    )
  } else {


  // (i) Initial Render Structure
  return (
    <Styles>
      <Container >
        <div className="title-header">
          <H2>OUR RESTAURAUNTS</H2>
          {state !== "LOADED" ? <Spinner className="custom-spinner" animation="grow" variant="success" /> : ''}
        </div>

{/* restaurant Menu  */}
        <Row xs={1} lg={4} className="justify-content-center">
          {data.map(restaurant => (
          
            <Col key={restaurant.id} >
              <Card id="pop" className="card-box mx-auto" border="light" style={{ width: '14rem', height:"16rem"}}>
                <Card.Img className="card-image" variant="top" style={{height:"10rem"}} src={restaurant.RestaurantImage} />
                <Card.Body className="text-center">
                  <Button href={`/restaurant/${restaurant.id}`} variant="dark" style={{background:"#3A6073" }}>{restaurant.RestaurantName}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
{/* end restaurant menu */}

{/* Add restaurant button */}
        <Row>
        <Col md={{ span: 4, offset: 4 }}>
{/* Success / Error Alert */}
            { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMesageVariant} /> : null }

              <div className="text-center mt-4 mb-4">
                <Button className="btn-block" href="/addrestaurant" variant="dark" style={{background:"#3A6073" }}>Add Restaurant</Button>
              </div>
           </Col>
        </Row>
{/* end restaurant button */}


      </Container>
      <div className="container pt-5">
          <p>
            tatis neque quidem corrupti dolor v
             elit sint excepturi. ipsum dolor sit amet consectetur adipisicing elit. Tempora quod fugiat, 
             olorum tenetur sunt maiores in iusto quae. Distinctio a at corporis tempore quos rem nisi qua
             m vitae magnam porro, animi, odit harum natus? Mollitia rerum quisquam ab sed quas hic, rem l
             audantium accusamus est unde dicta porro neque quidem. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, quia. Dolores exercitationem 
             porro dolorum saepe et, voluptatum quibusdam vero nemo!dfjsmdnbvzxm,.kj,ghmxfc
          </p>
        </div>
    </Styles>
  )
 }
}

export default RestaurantMenu
