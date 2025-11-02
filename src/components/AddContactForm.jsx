import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const AddContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    fax: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
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
          Add New Contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter contact name"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="number"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <Label className="mb-2" htmlFor="fax">Fax</Label>
            <Input
              id="fax"
              value={form.fax}
              onChange={handleChange}
              placeholder="Enter fax number"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            )}
            {loading ? "Adding..." : "Add Contact"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddContactForm;
