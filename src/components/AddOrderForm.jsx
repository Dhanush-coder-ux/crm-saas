import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { OrderContext } from "../contexts/OrderContext";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { AccountContext } from "../contexts/AccountContext";


const AddOrderForm = () => {
  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
    totalPrice: "",
    discount: "",
    finalAmount: "",
    requestedDate: "",
    deliveryDate: "",
    shipping: "",
    paymentTerms: "",
    freightTerms:""

  });

  const [loading, setLoading] = useState(false);
  const { addOrders,editOrders,orders} = useContext(OrderContext);
  const {orderId} = useParams();
  const [btnlabel,setBtnlabel]=useState({'btn':{'name':"Add Orders", 'loading':"Adding orders..."},'title':'Add new order'})
  const navigate = useNavigate();
  const {products} = useContext(ProductContext);
  const {account} = useContext(AccountContext);

  useEffect(() => {
    if (orderId && orders.length > 0) {
      const order = orders.find((e) => e.id == orderId);
      if (order) {
        console.log("order", order);
        setBtnlabel({'btn':{ name: "Update orders", loading: "Updating orders..." },'title':'Update Order'});
        setForm({
                  customer_id: order.customer_id || "",
                  product_id: order.product_id || "",
                  quantity: order.quantity || "",
                  totalPrice: order.total_price || "",
                  discount: order.discount_price || "",
                  finalAmount: order.final_price || "",
                  requestedDate: order.delivery_info.requested_date || "",
                  deliveryDate: order.delivery_info.delivery_date || "",
                  shipping: order.delivery_info.shipping_method || "",
                  paymentTerms: order.delivery_info.payment_terms || "",
                  freightTerms: order.delivery_info.freight_terms || "",
                });
      }
    }
  }, [orderId, orders]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      customer_id: form.customer_id,
      product_id: form.product_id,
      quantity: Number(form.quantity),
      total_price: Number(form.totalPrice),
      discount_price: Number(form.discount),
      final_price: Number(form.finalAmount),

      delivery_info: {
        requested_date: form.requestedDate,
        delivery_date: form.deliveryDate,
        shipping_method: form.shipping,   
        payment_terms: form.paymentTerms,
        freight_terms: form.freightTerms,
      }
    };

    try {
      if (orderId) {
        await editOrders(orderId, payload);
      } else {
        await addOrders(payload);
      }

        navigate('/orders')   
      } catch (error) {
        console.error(error);
        
      }finally{
        setLoading(false)
      }
    console.log(payload);
  };

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          {btnlabel['title']}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          
            <div>
            
          
            <div>
              <Label htmlFor="customer_id" className={'py-4'}>Customer</Label>
              <select
                id="customer_id"
                className="border p-2 rounded-md w-full"
                value={form.customer_id}
                onChange={handleChange}
              >
                <option value="">Select Customer</option>
                {account?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className={'py-4'} htmlFor="product_id">Product</Label>
              <select
                id="product_id"
                className="border p-2 rounded-md w-full"
                value={form.product_id}
                onChange={handleChange}
              >
                <option value="">Select Product</option>
                {products?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.product_type})
                  </option>
                ))}
              </select>
            </div>


            <div>
              <Label className={'py-4'} htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="totalPrice">Total Price</Label>
              <Input
                id="totalPrice"
                type="number"
                value={form.totalPrice}
                onChange={handleChange}
                placeholder="Enter total price"
              />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                value={form.discount}
                onChange={handleChange}
                placeholder="Enter discount"
              />
            </div>
          </div>

          
          <div>
            <div>
              <Label className={'py-4'} htmlFor="finalAmount">Final Amount</Label>
              <Input
                id="finalAmount"
                type="number"
                value={form.finalAmount}
                onChange={handleChange}
                placeholder="Calculated after discount"
              />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="requestedDate">Requested Date</Label>
              <Input
                id="requestedDate"
                type="date"
                value={form.requestedDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={form.deliveryDate}
                onChange={handleChange}
              />
            </div>

          <div>
            <Label className={'py-4'} htmlFor="shipping">Shipping Method</Label>
                <select
                  id="shipping"
                  className="border p-2 rounded-md w-full"
                  value={form.shipping}
                  onChange={handleChange}
                >
                  <option value="">Select Shipping Method</option>
                  <option value="mail">Mail</option>
                  <option value="fax">Fax</option>
                </select>
          </div>


            <div>
              <Label className={'py-4'} htmlFor="paymentTerms">Payment Terms</Label>
              <Input
                id="paymentTerms"
                value={form.paymentTerms}
                onChange={handleChange}
                placeholder="e.g. Cash, Net 30"
              />
            </div>
          </div>

          <div>
          <Label className={'py-4'} htmlFor="freightTerms">Freight Terms</Label>
          <Input
            id="freightTerms"
            value={form.freightTerms}
            onChange={handleChange}
            placeholder="Enter freight terms"
          />
        </div>


        
          <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-900 text-white"
              disabled={loading}
            >
          {loading ? btnlabel['btn']['loading'] : btnlabel['btn']['name']}

            </Button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default AddOrderForm;
