// Import React modules
import React, { Fragment , useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'
import "../../css/AddRestaurant.css"
// Import modules
import { Card, Form, Button, Row, Spinner  } from 'react-bootstrap';
import { TiArrowBack } from 'react-icons/ti';


const AddRestaurant = () => {

// State managment and initial States
  const [state, setState] = useState("IDLE")
// 
  const [fileName, setFileName] = useState("Choose File")

  const [data, setData] = useState({
    RestaurantName:"",
    RestaurantCategory:"Fast & Casual",
    RestaurantCuisine:"Italian",
    RestaurantRating:"1",
    RestaurantImage:""
   
  })
//declare form variables
const {  RestaurantName,RestaurantCategory,RestaurantCuisine,RestaurantRating
} = data;

const history = useHistory();

//Form Functions
const handleTextChange = (e) => setData({
  ...data, [e.target.name]: e.target.value

});
                                  
// handling file change
  const handleFileChange = (e) => {
    const file = e.target.files[0]

    setFileName(file.name)
    setData({
      ...data, RestaurantImage: file
    })

  }


const handleSubmit = async (e) => {
  e.preventDefault();
  setState("LOADING");
try {
  // reconstructing form data
  const formData = prepareFormData(data);
  const formConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const response = await axios.post('./api/restaurant',
  formData,
  formConfig)
  console.log(response);
  setState("SUCCESS")
  history.push('/restaurant')

}catch (err) {
  console.log(err.response.data);
  setState("ERROR");
}}

function prepareFormData(data){
  let formData = new FormData();
  formData.append('RestaurantName', data.RestaurantName);
  formData.append('RestaurantCategory',data.RestaurantCategory);
  formData.append('RestaurantCuisine', data.RestaurantCuisine);
  formData.append('RestaurantRating', data.RestaurantRating);
  formData.append('RestaurantImage', data.RestaurantImage);
  return formData
}

  return (
    <Fragment>
        <div className="NewRestarant">
          <Card>
            <Card.Header className="text-center">
              <strong>ADD NEW RESTAURANT</strong>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={ handleSubmit }>
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
                 
                  />
                  {/* Category */}
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
                    label={fileName}
                    className="mb-4"
                    onChange={ handleFileChange }
                    custom
                  />
                </Form.Group>



                {/* button */}
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

        {/* Button to /restaurant */}
        <Row className="justify-content-center mt-4">
          <Link to="/restaurant" className="btn btn-success mt-4">
            <TiArrowBack />
            {' '}Back to restaurant Menu
          </Link>
        </Row>
      
   
    </Fragment>
  )
};

export default AddRestaurant