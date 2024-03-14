import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/Slices/wishlistSlice'
import { addToCart } from '../REDUX/Slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function View() {

  const cart = useSelector(state => state.cartReducer)
  const wishlist = useSelector(state => state.wishlistReducer)
  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const { id } = useParams()

  useEffect(() => {
    if (sessionStorage.getItem("allProducts")) {
      const allProducts = JSON.parse
        (sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item => item.id == id))
    }
  }, [])
  // console.log(product);
  const handleWishlist = (product) => {
    if (wishlist?.includes(product)) {
      toast.warning("Item already in your Wishlist")
    } else {
      dispatch(addWishlistItem(product))
    }
  }

  const handleCart = (product) => {
    const exisitingProduct = cart?.find(item => item.id == product.id)
    if (exisitingProduct) {
      dispatch(addToCart(product))
      toast.success("Products added to your cart !!!")
    } else {
      dispatch(addToCart(product))
      toast.success("Product added to your cart !!!")
    }
  }

  return (
    < >
      <Header />
      <div style={{ marginTop: '150px' }} className='container d-flex align-items-center'>
        <div className='row mb-5 align-items-center'>
          <div className="col-lg-6">
            <img style={{ width: '400px', height: '400px' }} className='imag-fluid'
              src={product?.thumbnail} />
          </div>

          <div className="col-lg-6">
            <h5>PID: {product?.id}</h5>
            <h1>{product?.title}</h1>
            <h3 className='text-primary fw-bolder'>$ {product?.price}</h3>
            <p style={{ textAlign: 'justify' }}>{product?.description}</p>
            <div className='d-flex justify-content-around mt-5'>
              <button onClick={() => handleWishlist(product)} className='btn btn-outline-danger'><i class="fa-solid fa-heart me-2"  >
              </i>Add to Wishlist</button>
              <button onClick={() => handleCart(product)} className='btn btn-outline-danger'> <i class="fa-solid fa-truck me-2 "
              ></i>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default View