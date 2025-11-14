import { useNetWorkCall } from '../NetWorks/NetWorkCalls';
import React, { Children, createContext, useEffect, useState } from 'react'


export const ProductContext = createContext();


const ProductContextProvider = (props) => {
    const {NetWorkCalls} = useNetWorkCall();
    const [products,setProducts] = useState([]);
    const [productbyid,setProductById] = useState(null);

    const addProduct = async (form) => {
        try {
            const response = await NetWorkCalls({endpoint:"product",method:"POST",data:form});
            console.log(response);
            setProducts([...products,response.products]);
            
        } catch (error) {
            console.error("from add product",error);
            
        }
    }    
    const getProducts = async() => {
        try{
            const response = await NetWorkCalls({endpoint:"product",method:"GET"});
            if(response){
                setProducts(response.products)
            }    
        }catch(e){
            console.error("Failed to fetch products", e);
        }
    }

    const deleteProduct = async(productId) => {
        try {
            const response = await NetWorkCalls({endpoint:`product/${productId}`, method:"DELETE"});
            if(response){
                setProductById(response.products)
            }
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    }

    const editProduct = async(productId,data) => {
        try {
            data['product_id'] =productId
            const response = await NetWorkCalls({endpoint:`product`, method:"put",data:data});
            if(response){
                setProductById(response.products)
            }
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    }

    useEffect(()=>{
        getProducts()
    },[])
    
    const value = {
        products,
        productbyid,
        getProducts,
        deleteProduct,
        addProduct,
        editProduct 
    };

  
  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider
