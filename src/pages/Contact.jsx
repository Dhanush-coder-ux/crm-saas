import { useState } from "react";
import ContactInfo from "../components/ContactInfo";
import { contacts } from "../constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

const Contact = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

 
  const handleRowClick = (contact) => {
    setAlertData(contact);
    setIsAlertOpen(true);
  };

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Contacts Controls</h1>

      <ContactInfo />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Mobile Number</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Fax</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                onClick={() => handleRowClick(contact)}
                className="hover:bg-gray-100 transition duration-150 cursor-pointer"
              >
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.name}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.mobile_number}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.email}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">{contact.fax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔔 Alert Dialog for Contact Details */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Contact Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertData && (
                <div className="text-sm space-y-2 mt-3">
                  <p><strong>Name:</strong> {alertData.name}</p>
                  <p><strong>Mobile Number:</strong> {alertData.mobile_number}</p>
                  <p><strong>Email:</strong> {alertData.email}</p>
                  <p><strong>Fax:</strong> {alertData.fax}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-4">
            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contact;
