import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddOrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    productType: "",
    quantity: "",
    totalPrice: "",
    discount: "",
    finalAmount: "",
    requestedDate: "",
    deliveryDate: "",
    shipping: "",
    paymentTerms: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(form);
  };

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Add New Order
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          
          <div>
            <div>
              <Label className={'py-4'} htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="productType">Product Type</Label>
              <Input
                id="productType"
                value={form.productType}
                onChange={handleChange}
                placeholder="e.g. Electronics"
              />
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
              <Label className={'py-4'} htmlFor="shipping">Shipping</Label>
              <Input
                id="shipping"
                value={form.shipping}
                onChange={handleChange}
                placeholder="e.g. Free, Paid"
              />
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

        
          <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-900 text-white"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderForm;
