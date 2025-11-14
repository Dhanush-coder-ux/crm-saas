import React, { useContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerContext } from "../contexts/ContactContext";

const AddContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [btnlable, setBtnLable] = useState({
    name: "Add Contact",
    loading: "Adding Contact...",
  });

  const [loading, setLoading] = useState(false);
  const { contact, addContact, editContactById } = useContext(CustomerContext);
  const { accountId, contactcId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (contactcId && contact.length > 0) {
      const contactToEdit = contact.find((c) => c.id == contactcId);

      if (contactToEdit) {
        setBtnLable({
          name: "Update Contact",
          loading: "Updating Contact...",
        });

        setForm({
          name: contactToEdit.contact_name || "",
          mobile:contactToEdit.contact_mobile || "",
          email: contactToEdit.contact_email || "",
        });
      }
    }
  }, [contact, contactcId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  
    const payload = {
      name: form.name,
      mobile_number: form.mobile,
      email: form.email,
      customer_id: accountId,
      contact_id: contactcId
    };
    console.log(payload.customer_id);
    

    try {
      if (contactcId) {
        await editContactById(payload);
      } else {
        await addContact(payload);
      }

      navigate("/contact");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
            )}
            {loading ? btnlable.loading : btnlable.name}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddContactForm;
