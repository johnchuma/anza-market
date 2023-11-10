import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image, Table } from 'react-bootstrap';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import * as formik from 'formik';
import * as yup from 'yup';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomButton from '../../../widgets/button';
import Heading from '../../../widgets/heading';
import { addCategory, deleteBusinessCategory, getBusinessCategories } from '../../../controllers/category_controller';
import { mutedBackground } from '../../../utils/colors';
import { AiFillDelete } from 'react-icons/ai';
import Heading2 from '../../../widgets/heading2';



const AddCategory = ({ show, onHide }) => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  
 
  useEffect(() => {
    if(loading == false && deleting == false){
        getBusinessCategories().then((value)=>setCategories(value.body))
    }
  }, [loading,deleting]);
  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required('Category name is required')
  });
 
  const handleSubmit = (values) => {
    const data = {...values };
   
    setLoading(true)
    addCategory(data).then((status) => {
      if (status === true) {
        setLoading(false)
      }
      
    });
  };
  

 

  const [editorState, setEditorState] = useState(EditorState.createEmpty());




  return (
    <div>
       <Row>
        <Col md={12}>
        <Heading text={"product categories"}/>
    <Card style={{ backgroundColor:"white"}} className="mt-3">
        <Card.Body>
        <Table className="table table-hover ">
            <thead>
                <th>ID</th>
                <th>Category name</th>
                <th>Created at</th>
                <th>Action</th>
              
            </thead>
            <tbody>
                {categories.map((item,index)=>{
                    return <tr>
                    <td>#{index}</td>
                    <td>{item.name}</td>
                    <td>{item.createdAt}</td>
                    <td>
                    <div  onClick={()=>{
                setDeleting(true)
                deleteBusinessCategory(item.uuid).then((value)=>{
                    setDeleting(false)

                })
            }} className='btn border-0 p-0'>
            <AiFillDelete className='ms-2'/>
                </div> 
                    </td>
    
                   </tr>
                })}
               
            </tbody>
        </Table>
        </Card.Body>
        
    </Card>
        </Col>
        
        <Col md={12}>

          <Card className='mt-3'>
            <Card.Body>
              <Heading2 text={"Create new category"}/>
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
                  <CustomButton loading={loading} text={"Add category"} className={""}/>
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

export default AddCategory;
