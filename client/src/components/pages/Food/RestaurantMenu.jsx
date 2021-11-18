// Import React modules
import React, { useState, useEffect } from 'react';

// Import npm packages
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

// Custom Styles
const Styles = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;

  .title-header {
    margin-top: 2rem;
    margin-bottom: 4rem;
    text-align: center;
  }

  .card-image {
    border-radius: 3rem;
  }

  .card-box {
    margin-bottom: 1rem;
    background-color: whitesmoke;
    color: #212529;
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

const RestauranMenu = () => {
  // (ii) Set initial state
  const [state, setState] = useState("IDLE");
  const [data, setData] = useState([]); 

  // (iii) Lifecycle method on load (load API & set new state)
  useEffect(() => {
    setState("LOADING");
    async function fetchData() {
      try {
        const response = await axios.get('/api/restaurant');
        console.log(response.data);
        setData(response.data);

        // Success Message:
        setState("LOADED");
      } catch (error) {
        // Error Message:
        setState("ERROR")
      }
    }
    fetchData();
  }, []);

  // (i) Initial Render Structure
  return (
    <Styles>
      <Container >
        <div className="title-header">
          <H2>OUR RESTAURAUNTS</H2>
          {state !== "LOADED" ? <Spinner className="custom-spinner" animation="grow" variant="success" /> : ''}
        </div>

        {/* restaurant Menu Display */}
        <Row xs={1} lg={4} className="justify-content-center">
          {data.map(restaurant => (
            <Col key={restaurant.id} >
              <Card className="card-box mx-auto" border="light" style={{ width: '14rem' }}>
                <Card.Img className="card-image" variant="top" src={restaurant.restaurantImage} />
                <Card.Body className="text-center">
                  <Button href={`/restaurant/${restaurant.id}`} variant="dark">{restaurant.restaurantName}</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
        <Col md={{ span: 4, offset: 4 }}>
              <div className="text-center mt-4 mb-4">
                <Button className="btn-block" href="/addrestaurant" variant="success">Add Restaurant</Button>
              </div>
      
        </Col>
        </Row>
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

export default RestauranMenu
