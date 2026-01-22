import React, { useState, useEffect } from 'react';
import { useUserContext } from './UserRoleContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

const TransactionList = () => {
  const { userData } = useUserContext();
  const [userTransactions, setUserTransactions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const userID = userData?.userID; // Ensure userID exists

  useEffect(() => {
    // Fetch the user's transactions when the component mounts
    if (userID) fetchUserTransactions(userID);
  }, [userID]);

  const fetchUserTransactions = async (userID) => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(
        `https://broker-nel-app-oial.onrender.com/api/getUserTransactions?userID=${userID}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userTransactionsData = await response.json();
      // Sort transactions in descending order based on a timestamp field
      userTransactionsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setUserTransactions(userTransactionsData);
    } catch (error) {
      console.error('Error fetching user transactions: ', error);
      toast.error("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  return (
    <div
      className="tx"
      style={{
        background: '#13151b',
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflowY: 'auto',
        overflowX: 'hidden',
        marginBottom: '80px',
      }}
    >
      <ToastContainer />
      <h2
        className="fixed-top text-center p-2 text-white"
        style={{ background: '#1F222D', marginLeft: '32%' }}
      >
        Your Transactions
      </h2>
      <div
        className="transaction-list container p-4"
        style={{
          width: '82.5%',
          marginLeft: '16.5%',
          marginRight: '3.5%',
          background: '#1F222D',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        {loading ? (
          <div className="text-center p-5">
            {/* Font Awesome Loading Spinner */}
            <i className="fa fa-spinner fa-spin fa-3x fa-fw text-light"></i>
            <p className="text-light mt-3">Loading Transactions...</p>
          </div>
        ) : (
          <>
            {userTransactions.length === 0 ? (
              <p className="text-center text-light">No transactions found.</p>
            ) : (
              userTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className={
                    transaction.status === 'success'
                      ? 'border border-success text-success p-2 mt-2'
                      : transaction.status === 'pending'
                      ? 'border border-warning text-warning p-2 mt-2'
                      : 'border border-danger text-danger p-2 mt-2'
                  }
                  style={{borderRadius: '9px'}}
                >
                  <div className="transaction-reference">
                    <span className="bold">Transaction Reference:</span> {transaction.transactionReference}
                  </div>
                  <div className="tx-type bold">{transaction.description}</div>
                  <div className="transaction-details d-flex justify-content-between">
                    <span>
                      Transaction{' '}
                      {transaction.status === 'success'
                        ? 'Successful'
                        : transaction.status === 'pending'
                        ? 'Pending'
                        : 'Failed'}
                    </span>{' '}
                    <span>
                      Amount: <span className="bold">${transaction.amount}</span>
                    </span>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
