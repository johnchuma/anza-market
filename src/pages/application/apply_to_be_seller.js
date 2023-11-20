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
import { getSectors } from '../../controllers/sector_controller';
import { logout } from '../../utils/local_storage';

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
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getSectors().then((value)=>setCategories(value))
    }, []);
  
  const [loading, setloading] = useState(false);

  const handleSubmit = (values) => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const data = {
        name:values.name,
        business_sector_uuid:values.sector,
        region:values.region,
        description:htmlContent
    }
  setwaiting(true)
  addBusiness(data).then((status)=>{
    if(status === true ){
     setwaiting(false)
    }

  })
    console.log(values);
  };
  useEffect(() => {
    if(waiting == false){
      setloading(true)
      getMyBusiness().then((value)=>{
        if(value){
          setBusiness(value.body)
      setloading(false)

        }
      })
    }
  
  }, [waiting]);

 
  return (
    <div  className='py-5'>
        <Container>
        <div>
            <Row>
                <Col className='text-center d-flex justify-content-center' md={{ offset:3,span:6 }}>
                  {/* {business.description} */}
                  {loading ?<Spinner/>: business == null ? <div>
                  {business}

                  <Heading className={"py-2"} fontSize={"40px"} color={primaryColor} text={'Want to become a seller ?'}  />
                  <Paragraph text={"Send us your application, we will review and send you update"}/>
              <Formik
                initialValues={{
                  name:'',
                  sector:'',
                  region:''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form className='text-start ' noValidate onSubmit={handleSubmit}>
                
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
                    <Form.Group  className='mt-2' controlId='name'>
                      <Form.Label>Business sector</Form.Label>
                      <Form.Select
                        type='text'
                        name='sector'
                        value={values.sector}
                        onChange={handleChange}
                        isInvalid={touched.sector && !!errors.sector}
                      >
                        
                        <option >Select sector</option>
                        {categories.map((item)=><option value={item.uuid}>{item.name}</option>)}
                        
                     
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.sector}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-3' controlId='name'>
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
                    </Form.Group >
                        </Col>
                        <Col className='mt-3' md={12}>
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

                  </div>:business.status === "accepted"? <div className='text-center'>
              <Stack direction='horizontal' className='d-flex justify-content-center'>
              <div style={{ width:200 }}>
                    <Image src='https://img.freepik.com/free-vector/smart-guy-getting-award-winner-standing-pedestal-holding-golden-cup-cartoon-illustration_74855-14511.jpg' fluid/>
                  </div>
              </Stack>
                  
                    <Heading text={"Your request is approved"} className={"mt-3"}/>
                    <Paragraph className={"mb-3"} text={"You can now start selling on this platform"}/>
                    <Stack direction='horizontal' className='d-flex justify-content-center' >
                    <CustomButton  onClick={()=>{
                      logout();
                      navigate("/login")
                    }} className={"mt-2"} text={"Start selling"}/>
                    </Stack>
                  </div>:  
                  business.status === "rejected"?
                  <div>
                    {/* {business.name} */}
                    <div style={{ width:300 }}>
                    <Image src='https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-rejected_516790-961.jpg?w=360' fluid/>
                    </div>

                    <Heading className={"mt-3"} text={"Your application is rejected"}/>
                    <Paragraph text={"Sorry, we couldn't accept your application"}/>
                  </div>: <div>
                    {/* {business.name} */}
                    <div style={{ width:300 }}>
                    <Image src='https://cdn.dribbble.com/users/2043038/screenshots/4488715/girl_waiting.gif' fluid/>
                    </div>

                    
                    <Heading text={"Your application is on review"}/>
                    <Paragraph text={"We will send you an email after review"}/>
                  </div>}
                  
               
                </Col>
            </Row>
     
     </div>
            </Container>   
     
                   
              
                
            
        
      
    </div>
  );
};

export default ApplyToBeSeller;
