import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    productType: "",
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
          Add New Product
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
              id="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <Label htmlFor="productType" className="mb-2">
              Product Type
            </Label>
            <Input
              id="productType"
              value={form.productType}
              onChange={handleChange}
              placeholder="e.g. Electronics"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-900 text-white"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
