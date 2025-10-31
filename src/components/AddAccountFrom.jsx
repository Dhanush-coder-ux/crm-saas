import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddAccountForm = () => {
  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Add New Account
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-4">
            <div>
              <Label className={'py-4'} htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter account name" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="number" placeholder="Enter mobile number" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="website">Website</Label>
              <Input id="website" placeholder="Enter website" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="employees">Number of Employees</Label>
              <Input id="employees" placeholder="Enter number of employees" />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div>
              <Label className={'py-4'} htmlFor="gst">GST Number</Label>
              <Input id="gst" placeholder="Enter GST number" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter address" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="Enter industry" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="sector">Sector</Label>
              <Input id="sector" placeholder="Enter sector" />
            </div>

            <div>
              <Label className={'py-4'} htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" placeholder="Enter contact person" />
            </div>
          </div>

          {/* Centered Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Add Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountForm;
