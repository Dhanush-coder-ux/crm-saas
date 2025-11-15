import { useContext, useEffect, useState } from "react";
import AccountInfo from "../components/AccountInfo";
import { Link, NavLink } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import DetailView from "../components/DetailView";

const Accounts = () => {
  const [alertData, setAlertData] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { account, getAccount, deleteAccountById } =
    useContext(AccountContext);

  useEffect(() => {
    const fetchAccount = async () => {
      await getAccount();
      setLoading(false);
    };
    fetchAccount();
  }, []);

  const handleRowClick = (acc) => {
    setAlertData(acc);
    setIsAlertOpen(true);
  };

  // 🟦 TABLE SKELETON LOADER (9 columns)
  const TableSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="animate-pulse">
          {Array.from({ length: 9 }).map((_, idx) => (
            <td key={idx} className="px-6 py-4">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const contents = [
    { label: "Name", value: alertData?.name },
    { label: "Mobile Number", value: alertData?.mobile_number },
    { label: "Email", value: alertData?.email },
    { label: "Website", value: alertData?.website_url },
    { label: "Employees", value: alertData?.no_of_employee },
    { label: "GST Number", value: alertData?.gst_number },
    { label: "Address", value: alertData?.address },
    { label: "Industry", value: alertData?.industry },
    { label: "Sector", value: alertData?.sector },
  ];

  const actionButtons = [
    {
      id: "edit",
      element: (
        <NavLink to={`/update-account/${alertData?.id}`}>
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
            deleteAccountById(alertData?.id), window.location.reload();
          }}
          className="bg-red-600 cursor-pointer px-2 py-2 rounded-lg"
        >
          <img src="/icons/delete.svg" width={15} height={15} alt="delete" />
        </button>
      ),
    },
  ];

  const alertActions = [
    {
      id: "contact",
      label: "View Contact",
      link: `/contact/${alertData?.id}`,
    },
    {
      id: "orders",
      label: "View Orders",
      link: `/orders/${alertData?.id}`,
    },
    {
      id: "close",
      label: "Close",
      onClick: () => setIsAlertOpen(false),
    },
  ];

  return (
    <div className="w-[90%] ml-[12%] p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">
        Accounts Controls
      </h1>

      {/* If you want skeleton for AccountInfo, tell me the structure */}
      <AccountInfo loading={loading} />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left border border-gray-200">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="px-6 py-3 border-b">Name</th>
              <th className="px-6 py-3 border-b">Mobile Number</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Website</th>
              <th className="px-6 py-3 border-b">Employees</th>
              <th className="px-6 py-3 border-b">GST Number</th>
              <th className="px-6 py-3 border-b">Address</th>
              <th className="px-6 py-3 border-b">Industry</th>
              <th className="px-6 py-3 border-b">Sector</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <TableSkeleton />
            ) : (
              account.map((acc) => (
                <tr
                  key={acc?.id}
                  onClick={() => handleRowClick(acc)}
                  className="hover:bg-gray-100 transition duration-150 cursor-pointer"
                >
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.name}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.mobile_number}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.email}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.website_url}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.no_of_employee}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.gst_number}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.address}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.industry}
                  </td>
                  <td className="px-6 py-3 border-b border-e-blue-950">
                    {acc?.sector}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DetailView
        title={"Account Details"}
        topButtons={actionButtons}
        contents={contents}
        alertButtons={alertActions}
        canOpenAlert={isAlertOpen}
        setAlert={setIsAlertOpen}
      />
    </div>
  );
};

export default Accounts;
