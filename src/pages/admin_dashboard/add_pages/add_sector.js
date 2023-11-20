import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image, Table } from 'react-bootstrap';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import * as formik from 'formik';
import * as yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomButton from '../../../widgets/button';

import Heading2 from '../../../widgets/heading2';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addSector } from '../../../controllers/sector_controller';



const AddBusinessSector = ({ show, onHide }) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate()
  
  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required('Category name is required')
  });
 
  const handleSubmit = (values) => {
    const data = {...values };
   
    setLoading(true)
    addSector(data).then((status) => {
      if (status === true) {
        setLoading(false)
        toast.success("Added succesfully")
        navigate(-1)
      }
      
    });
  };
  

 

  const [editorState, setEditorState] = useState(EditorState.createEmpty());




  return (
    <div>
       <Row>
     
        <Col md={12}>

          <Card className='mt-3'>
            <Card.Body>
              <Heading2 text={"Create new business sector"}/>
            <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
               
        
        
                <Row className='mt-3'>
                  <Col md={6} className='text-start' >
                         <Form.Group>
                              <Form.Control
                                onChange={handleChange}
                                name='name'
                                placeholder='Enter category name'
                                value={values.name}
                                isInvalid={!!errors.name && touched.name}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                  </Col>
                  <Col>
                  <CustomButton  loading={loading} text={"Add category"} className={"btn bg-danger"}/>
                  </Col>
                 
                </Row>
               
              </Form>
            )}
          </Formik>
            </Card.Body>
         
          </Card>
       
        </Col>
       </Row>
 
    </div>
         
       
  );
};

export default AddBusinessSector;
