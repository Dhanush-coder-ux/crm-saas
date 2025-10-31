import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const AddContactForm = () => {
  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">
        Add New Contact
      </h2>
      <form className="space-y-4">
        <div>
          <Label className={'mb-2'} htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter product name" />
        </div>

        <div>
          <Label className={'mb-2'}  htmlFor="price">Mobile Number</Label>
          <Input id="price" type="number" placeholder="Enter price" />
        </div>

        <div>
          <Label className={'mb-2'}  htmlFor="quantity">Email</Label>
          <Input id="quantity" type="number" placeholder="Enter quantity" />
        </div>

        <div>
          <Label className={'mb-2'}  htmlFor="productType">Fax</Label>
          <Input id="productType" placeholder="e.g. Electronics" />
        </div>

        <Button type="submit" className="w-full bg-blue-900">
          Add Contact
        </Button>
      </form>
    </div>
    </div>

  );
};

export default AddContactForm;
