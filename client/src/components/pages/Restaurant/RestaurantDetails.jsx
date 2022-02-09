// Import React modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import npm packages
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { TiArrowBack } from 'react-icons/ti';

// Import custom components
import AlertMessage from '../../common/AlertMessage';
import Loader from '../../common/Loader';
import { useAuth } from '../../../contexts/AuthContext';
import "../../css/menu.css"

// Custom Styles
const Styles = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;

  .image-splash {
    max-height: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
   
  }
`;


const HeroBox = styled.div`
  padding: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  background-color: #3A6073;
  color: white;
  border-radius: 1rem 1rem 1rem 1rem;
  text-align: center;
  color:black;
  space-between:5rem;

  box-shadow: 0px 0px 15px -5px;
  height: 500px
  border-radius: 4 rem;
  margin-bottom: 1rem;
  
`;

const H2 = styled.h2`
  font-weight: bold;
`;


const RestaurantDetails = (props) => {

  const { user } = useAuth()

  const [state, setState] = useState("IDLE");
  const [data, setData] = useState({
    id: props.match.params.id,
    RestaurantName: '',
    RestaurantCategory: '',
    RestaurantRating: '',
    RestaurantCuisine:'',
    RestaurantImage: '',
  }); 
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMesageVariant, setAlertMesageVariant ] = useState('info');
  const { id, RestaurantName, RestaurantCategory, RestaurantRating, RestaurantCuisine,
  RestaurantImage } = data;
  const history = useHistory();

// Form Functions
  
  useEffect(() => {
    setState("INITLOAD");
    async function fetchData() {
      try {
// Call to API
        const response = await axios.get(`/api/Restaurant/${id}`);
        const json = response.data
        console.log(json);
        setData(RestaurantData => ({...RestaurantData,...json}));

// Success 
        setAlertMessage('This is just one of your favourite restaurants.');
        setAlertMesageVariant('success');
        setState("LOADED");

      } catch (err) {
// Error
        console.log(err.response.data);
        setState("ERROR");
        setAlertMessage('There was a problem with the server');
        setAlertMesageVariant('danger');
      }
    }
    fetchData();

  }, [id]);
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setState("LOADING");
    try {
      const response = await axios.delete(`/api/restaurant/${id}`);
      const json = response.data
      console.log(json);

// Success
      setState("SUCCESS");
      history.push('/restaurant');
      
    } catch (err) {
// Error Message
      console.log(err.response.data);
      setState("ERROR");
      setAlertMessage('There was a problem with the server');
      setAlertMesageVariant('danger');
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }
  }

  if(state === "INITLOAD"){
    return (
      <Container className="text-center" style={{marginTop: "10rem"}}>
        <Loader />
      </Container>
    )
  } else {
    return (
      <Styles>
      
        <Container >
          <div className="title-header text-center mt-4 mb-4">
            <H2>{RestaurantCategory}</H2>
            
{/* Success / Error Alert */}
            <div className="mt-3">
              { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMesageVariant} /> : null }
            </div>
          </div>
      
{/* Title, Description and Image */}
          <HeroBox>
            <Container>
              <Row>
                <Col>
                  <h2>{RestaurantName}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit necessitatibus asperiores harum nam quas eum! Ipsa veritatis assumenda consectetur eius laborum iure, expedita vero doloribus aperiam blanditiis tempora. Doloribus quis, iure eaque minima sed facilis aliquam saepe. Vel, neque est.</p>
                
           {/* Image and Name */}
                  {RestaurantImage ? 
                    <img id="pop" className="image-splash" src={RestaurantImage} alt={RestaurantName}></img> :
                    <p>No Image Uploaded - Edit Restaurant Here: <a href={`/EditRestaurant/${id}`}>{RestaurantName}</a></p>
                  }
                  <br></br>
               {/* Ratings */}
                  <h2>A Rating of {RestaurantRating}</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit necessitatibus asperiores harum nam quas eum! Ipsa veritatis assumenda consectetur eius laborum iure, expedita vero doloribus aperiam blanditiis tempora. Doloribus quis, iure eaque minima sed facilis aliquam saepe. Vel, neque est.</p>
                {/* Cuisine */}
                  <h2>{RestaurantCuisine} Cuisine</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit necessitatibus asperiores harum nam quas eum! Ipsa veritatis assumenda consectetur eius laborum iure, expedita vero doloribus aperiam blanditiis tempora. Doloribus quis, iure eaque minima sed facilis aliquam saepe. Vel, neque est.</p>
                </Col>
              </Row>
            </Container>
          </HeroBox>

          {/* Admin Buttons*/}
          { user ? <HeroBox>
            <Container>
              <Row>
                <Col>
                  <h4>Admin Functions</h4>
                  <p>Please navigate to the desired page to alter {RestaurantName} item on the server and database.</p>
                </Col>
              </Row>
              <Row className="mt-4">
                {/* EDIT BUTTON */}
                <Col>
                  <Button className="w-100" href={`/EditRestaurant/${id}`} variant="success">Edit</Button>
                </Col>

                {/* DELETE BUTTON */}
                <Col>
                  <Button 
                    variant="danger" 
                    className={state === "LOADING" ? "button-gradient-loading btn-block" : "btn-block"}
                    disabled={state === "LOADING"}
                    onClick={ handleDeleteClick }
                  >
                    {state === "LOADING" 
                      ? <Spinner className="mb-1" as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                      : 'Delete'
                    }
                  </Button>
                </Col>
              </Row>
            </Container>
          </HeroBox> :null}
          {/*  ? = if and : = else  */}

          {/* Back Button */}
          <Row className="justify-content-center mt-4">
            <Link to="/Restaurant" className="btn btn-secondary mt-4">
              <TiArrowBack />
              {' '}Back to Restaurant Menu
            </Link>
          </Row>

        </Container>
      </Styles>
    )
  }
}

export default RestaurantDetails