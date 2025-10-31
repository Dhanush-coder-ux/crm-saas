import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddOrderForm = () => {
  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
            <div className="max-w-screen bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">
        Add New Order
      </h2>
      <form className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* top */}
        <div>
          <div>
          <Label className={'py-6'} htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter product name" />
        </div>

        <div>
          <Label className={'py-6'}  htmlFor="price">Product Type</Label>
          <Input id="price" type="number" placeholder="Enter price" />
        </div>

        <div>
          <Label className={'py-6'}  htmlFor="quantity">Quantity</Label>
          <Input id="quantity" type="number" placeholder="Enter quantity" />
        </div>

        <div>
          <Label className={'py-6'}  htmlFor="productType">Total Price</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>
        <div>
          <Label className={'py-6'}  htmlFor="productType">Discount</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>
        </div>

        {/* bottom  */}
        <div>
          <div>
          <Label className={'py-6'}  htmlFor="productType">Final Amount</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>
        <div>
          <Label className={'py-6'}  htmlFor="productType">Requested Date</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>
        <div>
          <Label className={'py-6'}  htmlFor="productType">Delivery Date</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>
        <div>
          <Label className={'py-6'}  htmlFor="productType">Shipping</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>
        <div>
          <Label className={'py-6'}  htmlFor="productType">Payment Terms</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>

        </div>

        
        <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
          <Button type="submit" className="w-full bg-blue-900">
          Place Order
        </Button>
        </div>
        
      </form>
    </div>
    </div>

  );
};

export default AddOrderForm;
