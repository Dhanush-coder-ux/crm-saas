import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const AddProductForm = () => {
  return (
    <div className="max-w-md bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">
        Add New Product
      </h2>
      <form className="space-y-4">
        <div>
          <Label className={'mb-2'} htmlFor="name">Product Name</Label>
          <Input id="name" placeholder="Enter product name" />
        </div>

        <div>
          <Label className={'mb-2'}  htmlFor="price">Price</Label>
          <Input id="price" type="number" placeholder="Enter price" />
        </div>

        <div>
          <Label className={'mb-2'}  htmlFor="quantity">Quantity</Label>
          <Input id="quantity" type="number" placeholder="Enter quantity" />
        </div>

        <div>
          <Label className={'mb-2'}  htmlFor="productType">Product Type</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>

        <Button type="submit" className="w-full bg-blue-900">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductForm;
