// Import React modules
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Import modules
import axios from 'axios';
import styled from 'styled-components';
import { Card, Form, Button, Container, Row, Col, Spinner, Image } from 'react-bootstrap';
import { TiArrowBack } from 'react-icons/ti';

// Import custom modules
import Hero from "../../common/Hero";
import AlertMessage from '../../common/AlertMessage';
import Loader from '../../common/Loader';
import { prepareFormData, getFilePathFromUrl } from '../../../utilities/writeServices';

// Custom Styles
const Styles = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;

  .image-preview {
    max-height: 200px;
  }
`;

const EditRestaurant = ( props ) => {
  // STATE MANAGEMENT & INITIAL STATES
  const [state, setState] = useState("IDLE");
  const [data, setData] = useState ({
    id: props.match.params.id,
    RestaurantName: "",
    RestaurantCategory: "Bistro Meals",
    RestaurantCuisine:"",
    RestaurantRating:"",
    RestaurantImage:"",
    
  });
  // File Path of Existing downloadURL (for potential deletion)
  const [filePath, setFilePath] = useState('');
  // Dynamic File Label
  const [fileName, setFileName] = useState('Choose File');
  // Dynamic Alert Message States
  const [alertMessage, setAlertMessage] = useState('');
  const [alertMesageVariant, setAlertMesageVariant ] = useState('info');

  // DECLARE FORM VARIABLES
  const { id, RestaurantName, RestaurantCategory, RestaurantRating, RestaurantCuisine,
    RestaurantImage } = data;
  const history = useHistory();

  // FORM FUNCTIONS
  // [1] Lifecycle method on load (load API & set new state for pre-population of fields)
  useEffect(() => {
    setState("INITLOAD");
    async function fetchData() {
      try {
        // Call to API
        const response = await axios.get(`/api/Restaurant/${id}`);
        const json = response.data
        console.log(json);

        // Using the spread, we OVERWRITE our default states with the new data!
        setData(restaurantData => ({...restaurantData,...json}));

        // Set file name value to RestaurantImage stem
        if (!json.RestaurantImage) {      
          console.log('No downloadURL provided by the DataBase'); 
          setFileName('Choose File');
        } else {
          const existingFileName = getFilePathFromUrl(json.RestaurantImage);
          setFileName(existingFileName);
          setFilePath(existingFileName);
        }

        // Success Message:
        setState("LOADED");
        setAlertMessage('Restaurant Retrieved Successfully');
        setAlertMesageVariant('success');

      } catch (err) {
        // Error Message
        console.log(err.response.data);
        setState("ERROR");
        setAlertMessage('There was a problem with the server');
        setAlertMesageVariant('danger');
      }
    }
    fetchData();
  }, [id]);





  
  //Form Functions
const handleTextChange = (e) => setData({
  ...data, [e.target.name]: e.target.value

});

  // [3] handleFileChange will handle change in state for the file upload
  const handleFileChange = (e) => {
    setState("FILECHANGE");
    const file = e.target.files[0];
    setData({
      ...data, RestaurantImage: file
    });
    setFileName(e.target.files[0].name);
  }

  // [4] handleSubmit will control button event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState("LOADING")
    try {
      const formData = prepareFormData(data, filePath);
      const formConfig = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      const response = await axios.put(
        `/api/restaurant/${id}`, 
        formData, 
        formConfig
      );
      console.log(response)
      history.push('/restaurant');
      //Erro within data
    } catch (err) {
      console.log(err.response.data);
      setState("ERROR");
      setAlertMessage(err.response.data);
      setAlertMesageVariant('danger');
      window.scroll({top: 420, left: 0, behavior: 'smooth' });
    }
  };

  if(state === "INITLOAD"){
    return (
      <Container className="text-center" style={{marginTop: "10rem"}}>
        <Loader />
      </Container>
    )
  } else {
    return (
      <Styles>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Edit Restaurant Section - CONDITIONAL on LOAD */}
        <Container>
          <div className="mt-5">
            <Card>
              <Card.Header className="text-center">
                <strong>EDIT RESTAURANT: { RestaurantName }</strong>
              </Card.Header>
              <Card.Body>

                {/* Error Alert */}
                { alertMessage ? <AlertMessage msg={alertMessage} variant={alertMesageVariant} /> : null }

                <Form onSubmit ={ handleSubmit } >

                   {/* Restaurant name */}
                <Form.Group controlId="RestaurantName">
                  <Form.Label>Restaurant Name: </Form.Label>
                  <Form.Control 
                    type='Text'
                    placeholder='Enter restaurant name'
                    name='RestaurantName'
                    value={RestaurantName}
                    minLength="2"
                    onChange={ handleTextChange }
                 
                  /> {/* Category */}
                  </Form.Group>
                  <Form.Group controlId="RestaurantCategory">
                    <Form.Label>Restaurant Category: </Form.Label>
                    <Form.Control 
                    
                      as='select'
                      name='RestaurantCategory'
                      value={RestaurantCategory}
                      onChange={ handleTextChange }
                      custom
                    >
                    
                      <option value="American BBQ &amp; Smoked Meats" >American BBQ &amp; Smoked Meats</option>
                      <option value="Drinks &amp; Grazing" >Drinks &amp; Grazing</option>
                      <option value="Bistro Meals">Bistro Meals</option>
                      <option value="Fine Dining &amp; Wine">Fine Dining &amp; Wine</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Fast &amp; Casual">Fast &amp; Casual</option>
                      <option value="Buffet">Buffet</option>
  
                    </Form.Control>
                  </Form.Group>
  
                 

                  {/* Cuisine */}
        
                <Form.Group controlId="RestaurantCuisine">
                  <Form.Label>Restaurant Cuisine: </Form.Label>
                  <Form.Control 
                    as='select'
                    name='RestaurantCuisine'
                    value={RestaurantCuisine}
                    onChange={ handleTextChange }
                    custom
                  >
                  
                    <option value="Italian" >Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Food and Wine">Food and Wine</option>
                    <option value="Greek">Greek</option>
                    <option value="Michelen Starred">Michelen Starred</option>
                    <option value="Indian">Indian</option>
                    <option value="Modern Australian">Modern Australian</option>
                    <option value="French">French</option>
                  </Form.Control>
                </Form.Group>

{/* Ratings */}
<Form.Group  controlId="RestaurantRating">
                  <Form.Label>Restaurant Rating: </Form.Label>
                  <Form.Control 
                    type='number'
                    placeholder='Restaurant Rating'
                    name='RestaurantRating'
                    value={RestaurantRating}
                    onChange={ handleTextChange }
                    as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
                </Form.Group>

                {/* 6. restaurant Image */}
                <Form.Label>Restaurant Image:</Form.Label>
                <Form.Group controlId="RestaurantImage">
                  <Form.File 
                    id="customFile"
                    type="file"
                    label={ fileName }
                    className="mb-4"
                    onChange={ handleFileChange }
                    custom
                    
                  />
                </Form.Group>

                
                  {/* 6b. CONDITIONAL Preview Image of File from DB */}
                  { RestaurantImage && state === "LOADED" ? 

                    <div className="text-center mt-2 mb-5">
                      <h6>Current Image:</h6>
                      <Image className="image-preview" src={RestaurantImage} rounded />
                    </div>

                    : null 
                  }

                  {/* 7. Submit Button */}
                  <div>
                    <Button 
                      variant="success" 
                      type="submit"
                      className={state === "LOADING" ? "button-gradient-loading btn-block" : "btn-block"}
                      disabled={state === "LOADING"}
                    >
                      {state === "LOADING" 
                        ? <Spinner className="mb-1" as="span" animation="border" size="sm" role="status" aria-hidden="true"/> 
                        : 'Submit'
                      }
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>

          {/* Back Button */}
          <Row className="mt-4 justify-content-center">
            <Col md={{ span: 3, offset: 1 }}>
              <Link to="/Restaurant" className="btn btn-success mt-4">
                <TiArrowBack />
                {' '}Back to Restaurant Menu
              </Link>
            </Col>
            <Col md={{ span: 3 }}>            
              <Link to={`/Restaurant/${id}`} className="btn btn-success mt-4">
                <TiArrowBack />
                {' '}Back to {RestaurantName}
              </Link>
            </Col>
          </Row>
        </Container>
      </Styles>
    )
  }
};

export default EditRestaurant