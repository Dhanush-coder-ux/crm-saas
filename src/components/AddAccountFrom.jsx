import React, { useContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AccountContext } from "../contexts/AccountContext";
import { useNavigate, useParams } from "react-router-dom";



const AddAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const [btnlable,setBtnLable] = useState({'name':"Add Account", 'loading':"Adding Account..."})
  const { editAccountById, addAccount,account } = useContext(AccountContext);
  const { accountId } = useParams();
  const navigate  = useNavigate()
  const [form, setForm] = useState({
    name: "",
    mobile_number: "",
    email: "",
    website_url: "",
    no_of_employee: "", 
    gst_number: "",
    address: "",
    industry: "",     
    sector: "",        
    primary_contact: "",
  });

useEffect(() => {
    if (accountId && account.length > 0) {
      const accountToEdit = account.find((a) => a.id == accountId);

      if (accountToEdit) {
        console.log("Found account to edit:", accountToEdit);
        setBtnLable({ name: "Update Account", loading: "Updating Account..." });

        setForm({
          name: accountToEdit.name,
          mobile_number: accountToEdit.mobile_number,
          email: accountToEdit.email,
          website_url: accountToEdit.website, 
          no_of_employee: accountToEdit.number_of_employees,
          gst_number: accountToEdit.gst_number,
          address: accountToEdit.address,
          industry: accountToEdit.industry,
          sector: accountToEdit.sector,
          primary_contact: accountToEdit.primary_contact,
        });
      }
    }

  }, [accountId, account]);



  const handleChange = (e) => {
    const { id, value } = e.target;
    let finalValue = value;
    if (id === "no_of_employee") {
       finalValue = value === "" ? null : parseInt(value, 10);
    }
 
    else if (id === "website_url" && value === "") {
       finalValue = null;
    }

    setForm({ ...form, [id]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Submitting:", JSON.stringify(form, null, 2)); 

    try {
      if(accountId){
        await editAccountById(accountId,form)

      }else{
        await addAccount(form);
      }
      navigate('/accounts')
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const inputClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <div className="max-w-screen bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Add New Account</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="p-4" htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter account name" value={form.name} onChange={handleChange} />
            </div>

            <div>
              <Label className="p-4" htmlFor="mobile_number">Mobile Number</Label>
             
              <Input id="mobile_number" type="tel" placeholder="Enter mobile number" value={form.mobile_number} onChange={handleChange} />
            </div>

            <div>
              <Label className="p-4" htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} />
            </div>

            <div>
              <Label className="p-4" htmlFor="website_url">Website</Label>
              <Input id="website_url" placeholder="Enter website (e.g., https://google.com)" value={form.website_url || ""} onChange={handleChange} />
            </div>

            <div>
              <Label className="p-4" htmlFor="no_of_employee">Number of Employees</Label>
              <Input id="no_of_employee" type="number" placeholder="Enter number of employees" value={form.no_of_employee || ""} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="p-4" htmlFor="gst_number">GST Number</Label>
              <Input id="gst_number" placeholder="Enter GST number" value={form.gst_number} onChange={handleChange} />
            </div>

            <div>
              <Label className="p-4" htmlFor="address">Address</Label>
              <Input id="address" placeholder="Enter address" value={form.address} onChange={handleChange} />
            </div>

           
            <div>
              <Label className="p-4" htmlFor="industry">Industry</Label>
              <select id="industry" value={form.industry} onChange={handleChange} className={inputClasses} required>
                <option value="">Select Industry</option>
                <option value="It">IT</option>
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
              </select>
            </div>

            <div>
              <Label className="p-4" htmlFor="sector">Sector</Label>
              <select id="sector" value={form.sector} onChange={handleChange} className={inputClasses} required>
                <option value="">Select Sector</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <Label className="p-4" htmlFor="primary_contact">Contact Person</Label>
              <Input id="primary_contact" placeholder="Enter contact person" value={form.primary_contact} onChange={handleChange} />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
            <Button type="submit" disabled={loading} className="w-full bg-blue-600 text-white hover:bg-blue-700">
              {loading ? btnlable['loading'] : btnlable['name']}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountForm;