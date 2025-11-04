import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { Children, createContext, useState } from 'react'


export const ProductContext = createContext();


const ProductContextProvider = (props) => {
    const {NetWorkCalls} = useNetWorkCall();
    const [products,setProducts] = useState([]);
    const [productbyid,setProductById] = useState(null);


    const getProducts = async() => {
        try{
            const response =  await NetWorkCalls({endpoint:"product",method:"GET"});
            if(response){
                setProducts(response.products)
            }    
        }catch(e){
            console.error("Failed to fetch products", e);
        }
    }

    const deleteProduct = async(productId) => {
        try {
            const response = await NetWorkCalls({endpoint:`product/${productId}`, method:"GET"});
            if(response){
                setProductById(response.products)
            }
        } catch (error) {
            
        }
    }
    const value = {
        products,
        productbyid,
        getProducts,
        deleteProduct
    };

  
  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
