import React, { useContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ProductContext } from "../contexts/ProductContext";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { navbarTheme } from "flowbite-react";

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    available_qty: "",
    product_type: "",
    description:''
  });

  const [btnlabel,setBtnlabel]=useState({'btn':{'name':"Add Product", 'loading':"Adding Product..."},'title':'Add new product'})
  const [loading, setLoading] = useState(false);
  const {addProduct,products,editProduct} = useContext(ProductContext);

  const { productId }=useParams()
  const navigator=useNavigate()
  useEffect(()=>{
    console.log(productId,"product id");
    
    if (productId!==null || productId!==''){
      
      
      const product=products.filter((e)=>e.id==productId)[0]
      if (product!==undefined){
        console.log("data sertyyu :",product);
        setBtnlabel({'btn':{'name':"Update Product", 'loading':"Updating Product..."},'title':'Update product'})
        setForm({
          name:product.name,
          price:product.price,
          available_qty:product.quantity,
          product_type:product.product_type,
          description:product.description
        })
      }
      else{
      //  navigator('/product')
      }
      
      
    }
  },[])
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
      try {
        if(productId){
          await editProduct(productId,form)
        }else{
          await addProduct(form)
        }
        navigator('/product')   
      } catch (error) {
        console.error(error);
        
      }finally{
        setLoading(false)
      }
        

    console.log(form);
  };

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          {btnlabel['title']}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2">
              Product Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>
          <div>
            <Label htmlFor="description" className="mb-2">
              Product description
            </Label>
            <Input
              id="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <Label htmlFor="price" className="mb-2">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div>
            <Label htmlFor="quantity" className="mb-2">
              Quantity
            </Label>
            <Input
              id="available_qty"
              type="number"
              value={form.available_qty}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <Label htmlFor="product_type" className="mb-2">
              Product Type
            </Label>
            <Input
              id="product_type"
              value={form.product_type}
              onChange={handleChange}
              placeholder="e.g. Electronics"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-900 text-white"
            disabled={loading}
          >
            {loading ? btnlabel['btn']['loading'] : btnlabel['btn']['name']}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
