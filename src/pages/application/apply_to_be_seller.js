import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image,Container, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { AiFillCheckCircle, AiFillClockCircle, AiOutlineUser } from 'react-icons/ai';
import { register } from '../../controllers/user_controller';

import { useNavigate } from 'react-router-dom';
import Heading from '../../widgets/heading';
import { mutedColor, primaryColor, textColor } from '../../utils/colors';
import Paragraph from '../../widgets/paragraph';
import CustomButton from '../../widgets/button';
import SmallText from '../../widgets/small_text';
import draftToHtml from 'draftjs-to-html';
import { addBusiness, getMyBusiness } from '../../controllers/business_controller';

const ApplyToBeSeller = () => {
    const [file, setFile] = useState(null);

 const [editorState, setEditorState] = useState(EditorState.createEmpty());


 const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  
  // Define the validation schema using Yup
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    sector: yup.string().required('Please select your sector'),
    region: yup.string().required('Please select your region')
  });
 const navigate =  useNavigate();
  // Handle form submission
  const [waiting, setwaiting] = useState(false);
  const [business, setBusiness] = useState(null);
  const [loading, setloading] = useState(false);


  const handleSubmit = (values) => {
    setwaiting(true)
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const data = {
        name:values.name,
        sector:values.sector,
        region:values.region,
        description:htmlContent
    }
  
  addBusiness(data).then((status)=>{
    if(status === true ){
     navigate("/")
     setwaiting(false)
    }

  })
    console.log(values);
  };
  useEffect(() => {
    setloading(true)
    getMyBusiness().then((value)=>{
     setBusiness(value.body)
    })
    setloading(false)
  }, []);

  return (
    <div  className='py-5'>
        <Container>
        <div>
            <Row>
                <Col md="8">
                  {/* {business.description} */}
                  {loading ?<Spinner/>: business == null ? <div>
                  {business}

                  <Heading className={"py-2"} color={textColor} text={'Want to become a seller ?'}  />
                  <SmallText text={"Send us your application, we will review and send you a feedback"}/>
              <Formik
                initialValues={{
                  name: '',
                  sector: '',
                  region: '',
                  

                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                
                    <Row className='mt-3' >
                        <Col md={12}>
                        <Form.Group  controlId='name'>
                      <Form.Label>Business name</Form.Label>
                      <Form.Control
                        type='text'
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group  controlId='name'>
                      <Form.Label>Business sector</Form.Label>
                      <Form.Select
                        type='text'
                        name='sector'
                        value={values.sector}
                        onChange={handleChange}
                        isInvalid={touched.sector && !!errors.sector}
                      >
                        
                        <option >Select sector</option>
                        <option value={"Agriculture"}>Agriculture</option>
                        <option value={"Crafting"}>Crafting</option>
                        <option value={"Carpentry"}>Carpentry</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.sector}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group  controlId='name'>
                      <Form.Label>Select your region</Form.Label>
                      <Form.Select
                        type='text'
                        name='region'
                        value={values.region}
                        onChange={handleChange}
                        isInvalid={touched.region && !!errors.region}
                      >
                        <option >Select region</option>
                        <option value={"Dar es salaam"}>Dar es salaam</option>
                        <option value={"Tanga"}>Tanga</option>
                        <option value={"Dodoma"}>Dodoma</option>

                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.region}</Form.Control.Feedback>
                    </Form.Group>
                        </Col>
                        <Col md={12}>
                        <Form.Group controlId='description'>
                      <Form.Label>Business description (Tell us about your business)</Form.Label>
                    
                        <Card>
                            <Card.Body>
                            <Editor
                          editorState={editorState}
                          onEditorStateChange={handleEditorStateChange}
                          // Adjust the height as needed
                        />
                            
                            </Card.Body>
                        </Card>
                    </Form.Group>
                        </Col>
                    </Row>
                 
                   
                   
                    <CustomButton loading={waiting} className=' mt-4' text='Send application' />

                    <Stack />
                
                  </Form>
                )} 
              </Formik>
                  </div>:business.active === true? <div>
                  <AiFillCheckCircle color={primaryColor} size={100}/>
                    <Heading text={"Congratulations Your application is accepted"}/>
                    <Paragraph text={"You can start selling on this platform"}/>
                    <CustomButton onClick={()=>navigate("/dashboard/")} className={"mt-3"} text={"Start selling"}/>
                  </div>:<div>
                    {business.name}
                    <AiFillClockCircle color={primaryColor} size={100}/>
                    <Heading text={"Your application is on review"}/>
                    <Paragraph text={"We will send you an email for any update"}/>
                  </div> }
                  
               
                </Col>
            </Row>
     
     </div>
            </Container>   
     
                   
              
                
            
        
      
    </div>
  );
};

export default ApplyToBeSeller;
