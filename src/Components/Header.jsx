import React from 'react'
import { Badge, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts } from '../REDUX/Slices/productSlice'

function Header({ insideHome }) {

  const dispatch = useDispatch()
  const wishlistCount = useSelector(state => state.wishlistReducer).length
  const carCount = useSelector(state => state.cartReducer).length
  return (
    <>
      <Navbar style={{ backgroundColor: "#6610F2", zIndex: '10' }} data-bs-theme="light" className='position-fixed top-0 w-100'>
        <Container>
          <Navbar.Brand href="#home" style={{ fontSize: "30px", color: 'white' }}><i class="fa-solid fa-truck me-2 "
            style={{ color: "white" }} ></i><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>E Cart</Link></Navbar.Brand>

          {insideHome &&
            <div onChange={(e) => dispatch(searchProducts(e.target.value.toLowerCase()))} className="midDiv ms-auto ">
              <Form.Control
                type="text"
                placeholder="Search Products!!"
                className=" mr-sm-2"
              /></div>
          }
          <Nav className="ms-auto">
            <Nav.Link style={{ color: 'white' }}><i class="fa-solid fa-heart me-2" style={{ color: "white", }}>
            </i><Link to={'/wishlist'} style={{ textDecoration: 'none', color: 'white' }}>Wishlist <Badge bg="secondary">{wishlistCount}</Badge></Link></Nav.Link>
            <Nav.Link style={{
              color: 'white'
            }}><i class="fa-solid fa-cart-shopping me-2" style={{ color: "white" }}></i>
              <Link to={'/cart'} style={{ textDecoration: 'none', color: 'white' }}>Cart <Badge bg="secondary">{carCount}</Badge></Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </ >
  )
}

export default Header