import './App.css';
import { useState } from "react";
import Login from "./Login";
import { Container, Row, Col, Form, FormGroup, FormControl, FormLabel, Button, Table, Navbar } from 'react-bootstrap';
import Axios from "axios";
// jshint ignore:start
function App() {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [newProduct, setNewProduct] = useState(0);
  const [productList, setProductList] = useState([]);
  
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }

  const addProduct = () => {
    Axios.post('http://localhost:3001/create', {
      product_name: product_name,
      product_description: product_description

    }).then(() => {
      setProductList([
        ...productList,
        {
          product_name: product_name,
          product_description: product_description
        }
      ]);
      // console.log("success");
    });
  }


  const getProducts = () => {
    Axios.get('http://localhost:3001/products').then((response) => {
      setProductList(response.data);
    });
  }


  const updateProductDescription = (product_id) => {
    Axios.put("http://localhost:3001/product_update", { newProduct: newProduct, product_id: product_id }).then((response) => {
      console.log(response);
      setProductList(productList.map((val) => {
        // eslint-disable-next-line eqeqeq
        return val.product_id == product_id
          ? {
            product_id: product_id,
            product_name: val.product_name,
            product_description: val.product_description,
            newProduct: setNewProduct,
          }
          : val;
      })
      )
    }
    )
  };

  const deleteProduct = (product_id) => {
    // console.log(id);
    const getId = product_id;
    console.log(getId);
    // eslint-disable-next-line no-template-curly-in-string
    Axios.delete('http://localhost:3001/product_delete/' + getId).then((response) => {
      setProductList(productList.filter((val) => {
        // eslint-disable-next-line eqeqeq
        return val.product_id != product_id
      }))
    });
  };


  return (    
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">WarHouse Dashboard</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">SKiranFED9&nbsp;&nbsp;&nbsp;</a>
          </Navbar.Text>
          {/* <a href="/" type="button" variant="info" className="custBtnShow alignSpace"> LogOut</a> */}
          <Button className="custBtnShow alignSpace" variant="info" href="/">Logout</Button>
        </Navbar.Collapse>
      </Navbar>
      <Row className="justify-content-md-center">
        <Form>
          <FormGroup>
            <FormLabel>Product Name : </FormLabel>
            <FormControl type="text" onChange={(event) => { setProductName(event.target.value) }}></FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Product Description : </FormLabel>
            <FormControl type="text" onChange={(event) => { setProductDescription(event.target.value) }}></FormControl>
          </FormGroup>
          <FormGroup>
            <Button className="custBtnShow alignSpace" onClick={addProduct}>Create Product</Button>
            <Button className="custBtnShow alignSpace" onClick={getProducts}>Show Product Lists</Button>
          </FormGroup>
        </Form>

      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Table striped bordered hover size="sm" className="tableStyle">
            <thead>
              <tr>
                <th>ProductID</th>
                <th>ProductName</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((val, key) => {
                return (
                  <tr>
                    <td>{val.product_name}</td>
                    <td>{val.product_description}</td>
                    <td>
                      <Button className="custBtn" onClick={() => { updateProductDescription(val.product_id) }}>Update</Button>
                    </td>
                    <td>
                      <Button className="custBtn" onClick={() => { deleteProduct(val.product_id) }}>Delete</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
       </Row>
    </Container>
  );
}

export default App;
