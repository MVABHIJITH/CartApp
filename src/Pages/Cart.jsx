import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { incQuantity, removeCartItem, decQuantity, emptyCart } from '../REDUX/Slices/cartSlice'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cartReducer)
  const [cartTotal, setCartTotal] = useState(0)
  useEffect(() => {
    if (cartItems?.length > 0) {
      setCartTotal(cartItems?.map(item => item.totalPrice).reduce((t1, t2) => t1 + t2))
    } else {
      setCartTotal(0)
    }

  }, [cartItems])

  const handleDecrementQuantity = (product) => {
    if (product.quantity > 1) {
      dispatch(decQuantity(product.id))
    } else {
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCheckout =()=>{
    dispatch(emptyCart())
    toast.success('thanks to  purchasing for us!!')
    

  }

  return (
    < >
      <Header />
      <div className='container' style={{ marginTop: '100px' }}>
        {
          cartItems?.length > 0 ?
            <div className='row'>
              <div> <h3>summary</h3></div>
              <div className='col-8 mt-4'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems?.map((product, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{product.title.slice(0, 18)}...</td>
                          <td>
                            <img style={{ width: '40px' }} src={product.thumbnail} alt="" />
                          </td>
                          <td>
                            <div className='d-flex'>
                              <button onClick={() => handleDecrementQuantity(product)} className='btn fw-bolder'>-</button>
                              <input value={product.quantity} style={{ width: '40px' }} className='form-control' type="text" placeholder='0' readOnly />
                              <button onClick={() => dispatch(incQuantity(product.id))} className='btn fw-bolder'>+</button>
                            </div>
                          </td>
                          <td>${product.totalPrice}</td>
                          <td><button onClick={() => dispatch(removeCartItem(product.id))} ><i className="fa-solid fa-trash text-danger"></i></button></td>
                        </tr>
                      ))

                    }
                  </tbody>
                </table>
                <div className="d-flex " style={{ justifyContent: 'flex-end' }}>
                  <button onClick={() => dispatch(emptyCart())} className='p-1 btn btn-danger me-2 rounded'>EMPTY CART</button>
                  <Link to={'/'}>
                    <button className='p-1 btn btn-danger'>SHOP MORE</button>
                  </Link>
                </div>
              </div>
              <div className="col-4">
                <div className="container border rounded p-4">
                  <h4>Total Items:<b className='text-primary'>{cartItems.length}</b></h4>
                  <h4>Total Amount:<b className='text-primary'>${cartTotal}</b></h4>
                  <button onClick={handleCheckout} className='btn btn-success w-100 mb-2 mt-3  '>Check out</button>
                </div>
              </div>
            </div>
            :
            <div className=' container    '>
              <div className='justify-content-center  align-items-center w-100'>
                <img height={'300px'} src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" alt="" />
                <h3 className='text-danger mt-3 fw-bolder'>Cart is empty !!!</h3>
              </div>
            </div>
        }
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Cart

