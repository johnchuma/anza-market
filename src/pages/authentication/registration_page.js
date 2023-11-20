import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import { AiOutlineUser } from 'react-icons/ai';
import { register } from '../../controllers/user_controller';

import { useNavigate } from 'react-router-dom';
import Heading from '../../widgets/heading';
import { mutedColor, primaryColor, textColor } from '../../utils/colors';
import Paragraph from '../../widgets/paragraph';
import CustomButton from '../../widgets/button';
import toast from 'react-hot-toast';



const RegisterPage = () => {
    const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
 const [schools, setSchools] = useState([]);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    if (event.target.files[0]) {
      setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };
  // Define the validation schema using Yup
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    password: yup.string().required('Password is required'),
    repeatPassword: yup.string().oneOf([yup.ref("password"),null],"Password does not match").required("Please repeat your password"),


  });
 const navigate =  useNavigate();
  // Handle form submission
  const [waiting, setwaiting] = useState(false);
  const handleSubmit = (values) => {
    setwaiting(true)
    const data = {file,...values}
    // console.log(data)
  register(data).then((data)=>{
    if(data.status === true ){
     navigate("/")
     setwaiting(false)
    }
    else{
    toast.error(data.message)
    setwaiting(false)
    }

  })
    console.log(values);
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
     
           
     <Container>
      <Row className='d-flex align-items-center'>
        <Col>
        <Image fluid src='https://designspace.io/wp-content/uploads/2019/03/01-Cover.png'/>
        </Col>
        <Col  md={6}>
          <Row>
            <Col md={{ offset:1,span:10 }}>
            <Card className='border-0'>

<Card.Body className='py-4 px-4'>
    
        <Stack direction='horizontal' className='d-flex justify-content-center' >
    <div>
    <div style={{ width:100 }} onClick={()=>navigate("/")}>
    <Image  src="/images/home/Shule-Yetu-–-52.png" fluid/>


</div>
    </div>
    
</Stack>
       
  
      <Heading className={"text-center py-2 mb-3"} color={textColor} text={'Register as customer'}  />
    
  <Formik
    initialValues={{
      name: '',
      email: '',
      phone: '',
      password: '',
      repeatPassword: '',

    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ handleSubmit, handleChange, values, touched, errors }) => (
      <Form noValidate onSubmit={handleSubmit}>
    
        <Row className='mt-3' >
            <Col md={12}>
            <Form.Group  controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            isInvalid={touched.name && !!errors.name}
          />
          <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
        </Form.Group>
            </Col>
            <Col md={12}>
            <Form.Group controlId='phone'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            name='phone'
            value={values.phone}
            onChange={handleChange}
            isInvalid={touched.phone && !!errors.phone}
          />
          <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
        </Form.Group>
            </Col>
        </Row>
       <Row>
       
        <Col md={12}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            isInvalid={touched.email && !!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
        </Form.Group>
            </Col>
       </Row>
       
       <Row>
       
        <Col md={12}>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            isInvalid={touched.password && !!errors.password}
          />
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
        </Form.Group>
        </Col>
        <Col md={12}>
        <Form.Group controlId='password'>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control
            type='password'
            name='repeatPassword'
            value={values.repeatPassword}
            onChange={handleChange}
            isInvalid={touched.repeatPassword && !!errors.repeatPassword}
          />
          <Form.Control.Feedback type='invalid'>{errors.repeatPassword}</Form.Control.Feedback>
        </Form.Group>
        </Col>
       </Row>
       
       
        <CustomButton loading={waiting} className='w-100 mt-4' text='Register' />

        <Stack />
        <Stack direction='horizontal' className='d-flex justify-content-center mt-3'>
      <div className=''><Paragraph  text={"Already registered ?"}/></div>
      <div className='btn border-0 px-1' onClick={()=>navigate("/login")}><Paragraph  fontWeight={700} color={primaryColor} text={"Login"}/></div>

    </Stack>
      </Form>
    )} 
  </Formik>
</Card.Body>
</Card>
            </Col>
          </Row>
          
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
