import { useContext, useMemo, useState, useEffect } from "react";
import ContactInfo from "../components/ContactInfo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Link, useParams } from "react-router-dom";
import { CustomerContext } from "../contexts/ContactContext";

const Contact = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { accountId } = useParams();

  const { contactId, getContactByAccountId,deleteContactById } = useContext(CustomerContext);

  const accountcontacts = useMemo(() => {
    if (!accountId) return contactId;
    return contactId.filter(
      (c) => String(c.customer_id) === String(accountId)
    );
  }, [accountId, contactId]);

  const handleRowClick = (contact) => {
    setAlertData(contact);
    setIsAlertOpen(true);
  };

  useEffect(() => {
    getContactByAccountId(accountId);
  }, []);

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Contacts Controls</h1>

      <ContactInfo accountId={accountId} />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Mobile Number</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {accountcontacts.map((c) => (
              <tr
                key={c.id}
                onClick={() => handleRowClick(c)}
                className="hover:bg-gray-100 transition duration-150 cursor-pointer"
              >
              <td className="px-6 py-3 border-b border-e-blue-950">{c.contact_name}</td>
              <td className="px-6 py-3 border-b border-e-blue-950">{c.contact_mobile}</td>
              <td className="px-6 py-3 border-b border-e-blue-950">{c.contact_email}</td>
                <td className="px-6 py-3 border-b border-e-blue-950">
                  <div className="space-x-2 py-1 flex">
                    <Link to={`/update-contact/${c.customer_id}/${c.id}`}>
                    <button className="bg-blue-950 cursor-pointer px-2 py-2 rounded-lg">
                      <img src="/icons/edit.svg" width={15} height={15} alt="edit" />
                    </button>
                    </Link>

                    <button onClick={()=>deleteContactById(c.id,c.customer_id)} className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg">
                      <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Contact Details
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertData && (
                <div className="text-sm space-y-2 mt-3">
              <p><strong>Name:</strong> {alertData.contact_name}</p>
              <p><strong>Mobile Number:</strong> {alertData.contact_mobile}</p>
              <p><strong>Email:</strong> {alertData.contact_email}</p>
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
