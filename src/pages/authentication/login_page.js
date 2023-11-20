import React, { useContext, useState } from 'react';
import { Card, Form, Button, Col, Row, Stack,Container, Image, ToastContainer, Toast } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { mutedBlack, primaryColor } from '../../utils/colors';
import { login } from '../../controllers/user_controller';
import { useNavigate } from 'react-router-dom';
import Heading2 from '../../widgets/heading2';
import Paragraph from '../../widgets/paragraph';
import CustomButton from '../../widgets/button';
import { AiFillCloseCircle } from 'react-icons/ai';
import FailureNotification from '../../utils/notifications';
import toast from 'react-hot-toast';
import { UserContext } from '../../contexts/user_context';


const LoginPage = () => {
  // Define the validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const [waiting, setwaiting] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

 const {refresh,setRefresh,setUser} =  useContext(UserContext)
const navigate = useNavigate()
  // Handle form submission
  const handleSubmit = (values) => {
    const data = {...values};
        setwaiting(true)
    login(data).then((response)=>{
        setwaiting(false)
        if(response){
          if(response.status === true){
           setRefresh(refresh+1)
           setUser(null)
           navigate("/")
        }
          else{
       
          toast.error(response.message)
          }
        }
        else{
          setshowError(true)
          seterrorMessage("Internal server error")
        }
        

  })


  };

  return (
    <div>
      <FailureNotification showError={showError} setShowError={setshowError} errorMessage={errorMessage}/>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
      <Container>
      <Row >
        <Col>
        <Image fluid src='https://designspace.io/wp-content/uploads/2019/03/01-Cover.png'/>
        </Col>

        <Col md={{ span:6 }}>
           
        <Card className='border-0'>
        <Card.Body className='py-4' >
        <Row>
          <Col md={{ span:10,offset:1 }}>
          <Stack direction='horizontal' onClick={()=>navigate("/")} className='d-flex justify-content-center'  >
                
                <div style={{ width:100 }} className='btn border-0 p-0' onClick={()=>navigate("/")}>
                <Image  src="/images/home/Shule-Yetu-–-52.png" fluid/>
                </div>
    </Stack>         
        <Heading2 fontWeight={500} className={"text-center py-2 mt-2"} text={"Login to continue"}/>
        
     
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
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
            <Form.Group className='mt-4' controlId='password'>
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
            <CustomButton loading={waiting} className={"w-100 mt-4"} text={'Login'}/>
            <Stack direction='horizontal' onClick={()=>navigate("/reset-password")} className='d-flex justify-content-end mt-3'>
              <div className='btn border-0 p-0'><Paragraph  text={"Forgot password ?"}/></div>
            
            </Stack>
            <Stack direction='horizontal' className='d-flex justify-content-center mt-3'>
              <div className=''><Paragraph  text={"Don't have an account ?"}/></div>
              <div className='btn border-0 px-1'   onClick={()=>navigate("/register")}><Paragraph  fontWeight={700} color={primaryColor} text={"Register"}/></div>

            </Stack>
          </Form>
        )}
      </Formik>
          </Col>
        </Row>
        
        </Card.Body>
      </Card>
        </Col>
      </Row>
      </Container>
     
      
    </div>
    </div>
    
  );
};

export default LoginPage;
