import React, { useContext, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AccountContext } from "../contexts/AccountContext";


const AddAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const {addAccount,editAccountById} = useContext(AccountContext)
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    website: "",
    employees: "",
    gst: "",
    address: "",
    industry: "",
    sector: "",
    contactPerson: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    
      await addAccount(form)
      
    } catch (error) {
      
    }
    console.log( form);
  };

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">
          Add New Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
        
          <div className="space-y-4">
            <div>
              <Label className={'p-4'} htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter account name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="number"
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="website">Website</Label>
              <Input
                id="website"
                placeholder="Enter website"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                placeholder="Enter number of employees"
                value={form.employees}
                onChange={handleChange}
              />
            </div>
          </div>

       
          <div className="space-y-4">
            <div>
              <Label className={'p-4'} htmlFor="gst">GST Number</Label>
              <Input
                id="gst"
                placeholder="Enter GST number"
                value={form.gst}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Enter industry"
                value={form.industry}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="sector">Sector</Label>
              <Input
                id="sector"
                placeholder="Enter sector"
                value={form.sector}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label className={'p-4'} htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                placeholder="Enter contact person"
                value={form.contactPerson}
                onChange={handleChange}
              />
            </div>
          </div>

        
          <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountForm;
