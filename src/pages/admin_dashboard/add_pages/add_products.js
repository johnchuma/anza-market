import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { BsCloudUpload, BsImage, BsTrash } from 'react-icons/bs';
import * as formik from 'formik';
import * as yup from 'yup';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import { AiFillBackward, AiOutlineArrowLeft, AiOutlineFileImage } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Heading2 from '../../../widgets/heading2';
import CustomButton from '../../../widgets/button';
import { addProduct } from '../../../controllers/product_controller';
import Heading from '../../../widgets/heading';



const AddProduct = ({ show, onHide }) => {
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
  
  }, []);
  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleFileInputChange = (event) => {
    var imageFiles = files;
    imageFiles.push(event.target.files[0])
    setFiles(imageFiles);
    if (event.target.files[0]) {
      var previews= imagePreviews;
      previews.push(URL.createObjectURL(event.target.files[0]))
      setImagePreviews(previews);
    }
  };

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    oldPrice: yup.string().required('Enter old product price'),
    newPrice: yup.string().required('Enter new product price'),
    amount: yup.string().required('Enter stock amont'),
  });

  const handleSubmit = (values) => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const data = { ...values,description:htmlContent};
    setLoading(true)
    addProduct(data,files).then((status) => {
      if (status === true) {
        setLoading(false)
        navigate(-1)
      }
    });
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  return (
    <div>
      
 <Formik
            initialValues={{
              name: '',
              oldPrice: '',
              amount:"",
              newPrice: ""      
            }}
            onSubmit={handleSubmit}
            validationSchema={schema}
          >
             
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                 <Stack direction='horizontal' className='d-flex justify-content-between mb-3'>
     <Stack direction='horizontal'><AiOutlineArrowLeft onClick={()=>navigate(-1)} className='me-3'/>
     <Heading text={"New product"}/></Stack> 
         <CustomButton loading={loading} text={"Add product"}/>
        </Stack>
                <Row>
                  <Col md={4} className='text-center' >
                    <Card className='text-start mt-2'>
                      <Card.Body className='text-start'>
                      <Heading2 className={"mb-3"} text={"Price info"}/>

                      <Form.Group>
                              <Form.Label>Old product price</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='oldPrice'
                                value={values.oldPrice}
                                isInvalid={!!errors.oldPrice && touched.oldPrice}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.oldPrice}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mt-3'>
                              <Form.Label>New product price</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='newPrice'
                                value={values.newPrice}
                                isInvalid={!!errors.newPrice && touched.newPrice}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.newPrice}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mt-3'>
                              <Form.Label>Amount in stock</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='amount'
                                value={values.amount}
                                isInvalid={!!errors.amount && touched.amount}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                            </Form.Group>
                      </Card.Body>
                    </Card>

                   
                  </Col>
                  <Col md={8}>
                    <Card className='text-start mt-2'>
                      <Card.Body>
                        <Heading2 className={"mb-3"} text={"Basic info"} />
                        <Row>
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Product name</Form.Label>
                              <Form.Control
                                onChange={handleChange}
                                name='name'
                                value={values.name}
                                isInvalid={!!errors.name && touched.name}
                              />
                              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Form.Group className='mt-2'>
                      <Form.Label>Product description</Form.Label>
                      <Card className='p-3'>
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={handleEditorStateChange}
                          // Adjust the height as needed
                        />
                            </Card>
                            </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                    <Card className='text-start mt-2'>
                      <Card.Body>
                        <Stack className='d-flex justify-content-between' direction='horizontal'>
                        <Heading2 className={"mb-3"} text={"Product images"}/>
                        <BsCloudUpload onClick={()=>{
                          document.getElementById('file').click()
                        }} size={25}/>
                        </Stack>
                        <Row>
                          <Col md={12}>
                          <Form.Group className='mt-2'>
                            
                           <Row>
                          {imagePreviews.map((item,index)=><Col md={4}>
                          <BsTrash onClick={()=>{
                            var imageFiles = files;
                            var previews = imagePreviews;
                            var newImageFiles = [...imageFiles.slice(0, index), ...imageFiles.slice(index + 1)];
                            var newImagePreviews = [...previews.slice(0, index), ...previews.slice(index + 1)];
                            setFiles(newImageFiles);
                            setImagePreviews(newImagePreviews);
                        
                            
                          }}/>
                          <Image src={item} style={{ objectFit:"cover" }} className='rounded'  fluid />
                          
                          </Col>)}
                           </Row>
                          
                          <Form.Control
                            name='image'
                            type='file'
                            id='file'
                            onChange={(event) => {
                              handleChange(event);
                              handleFileInputChange(event)
                            }}
                            style={{ display: 'none' }}
                            isInvalid={!!errors.image && touched.image}
                          />
                          <Form.Control.Feedback type='invalid'>{errors.image}</Form.Control.Feedback>
                        </Form.Group>
                          </Col>
                         
                        </Row>
                      </Card.Body>
                    </Card>

                  </Col>
                </Row>
               
              </Form>
            )}
          </Formik>
          <br/>
          <br/>
          <br/>

    </div>
         
       
  );
};

export default AddProduct;
