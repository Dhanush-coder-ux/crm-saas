import { useContext, useMemo, useState, useEffect } from "react";
import ContactInfo from "../components/ContactInfo";
import DetailView from "../components/DetailView";
import { Link, NavLink, useParams } from "react-router-dom";
import { CustomerContext } from "../contexts/ContactContext";

const Contact = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { accountId } = useParams();
  const { contactId, getContactByAccountId, deleteContactById } =
    useContext(CustomerContext);

  useEffect(() => {
    getContactByAccountId(accountId).finally(() => setLoading(false));
  }, []);

  const accountcontacts = useMemo(() => {
    if (!accountId) return contactId || [];
    return (contactId || []).filter(
      (c) => String(c.customer_id) === String(accountId)
    );
  }, [accountId, contactId]);

  const handleRowClick = (contact) => {
    setAlertData(contact);
    setIsAlertOpen(true);
  };

  // Skeleton Loader Component
  const TableSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-48 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );

  const contents = [
    { label: "Name", value: alertData?.contact_name },
    { label: "Mobile Number", value: alertData?.contact_mobile },
    { label: "Email", value: alertData?.contact_email },
  ];

  const actionButtons = [
    {
      id: "edit",
      element: (
        <NavLink
          to={`/update-contact/${alertData?.customer_id}/${alertData?.id}`}
        >
          <button className="bg-blue-950 cursor-pointer px-2 py-2 rounded-lg">
            <img src="/icons/edit.svg" width={15} height={15} alt="edit" />
          </button>
        </NavLink>
      ),
    },
    {
      id: "delete",
      element: (
        <button
          onClick={() => {
            deleteContactById(alertData?.id, alertData?.customer_id),
              window.location.reload();
          }}
          className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg"
        >
          <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
        </button>
      ),
    },
  ];

  const alertActions = [
    { id: "orders", label: "View Orders", link: `/orders/${alertData?.customer_id}` },
    { id: "close", label: "Close", onClick: () => setIsAlertOpen(false) },
  ];

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
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <TableSkeleton />
            ) : (
              accountcontacts.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => handleRowClick(c)}
                  className="hover:bg-gray-100 transition duration-150 cursor-pointer"
                >
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {c.contact_name}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {c.contact_mobile}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {c.contact_email}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DetailView
        title={"Contact Details"}
        topButtons={actionButtons}
        contents={contents}
        alertButtons={alertActions}
        canOpenAlert={isAlertOpen}
        setAlert={setIsAlertOpen}
      />
    </div>
  );
};

export default Contact;
