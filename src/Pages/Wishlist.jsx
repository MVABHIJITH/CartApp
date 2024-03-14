import React from 'react'
import Header from '../Components/Header'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../REDUX/Slices/wishlistSlice'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Wishlist() {
  const cart = useSelector(state => state.cartReducer)

  const Wishlist = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()

  const handleCart = (product) => {
    const exisitingProduct = cart?.find(item => item.id == product.id)
    if (exisitingProduct) {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      toast.success("Products added to your cart !!!")
    } else {
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
     }
  }


  return (
    < >
      <Header />

      <div className='container' style={{ marginTop: '100px' }}>
        {Wishlist?.length > 0 ?
          <Row>
            {
              Wishlist?.map(product => (
                <Col>
                  <Card style={{ width: "18rem" }} >
                    <Card.Img style={{ height: '200px' }} variant="top" src={product?.thumbnail} />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0, 15)}...</Card.Title>
                      <div className='d-flex justify-content-between'>
                        <button onClick={() => dispatch(removeWishlistItem(product?.id))} ><i class="fa-solid fa-heart-circle-xmark text-primary"></i> </button>
                        <button onClick={() => handleCart(product)}  ><i class="fa-solid fa-cart-plus text-success "></i></button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
          :
          <div className='w-100 d-flex justify-content-center align-items-center flex-column '>
            <img style={{ width: '400px' }} src="https://cdn-icons-png.flaticon.com/512/2037/2037366.png" alt="" />
            <h4>Empty wish list</h4>
          </div>
        }
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Wishlist