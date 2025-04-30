/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

Modal.setAppElement("#root");

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    category: "",
    date: "",
  });
  const [formErrors, setFormErrors] = useState({
    amount: "",
  });

  // Fetch budgets on page load
  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/income/get");
      setIncomes(res.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const openModal = (income = null) => {
    setEditMode(!!income);
    setSelectedIncome(income);
    setModalIsOpen(true);
    setFormData(
      income || {
        source: "",
        amount: "",
        category: "",
        date: "",
      }
    );
    setFormErrors({
      amount: "",
    });
  };
  

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedIncome(null);
    setFormData({
      source: "",
      amount: "",
      category: "",
      date: "",
    });
    setFormErrors({
      amount: "",
    });
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (parseFloat(formData.amount) <= 0 || isNaN(parseFloat(formData.amount))) {
      errors.amount = "Amount must be greater than 0";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      if (editMode && selectedIncome) {
        await axios.put(`http://localhost:3000/api/income/update/${selectedIncome._id}`, formData);
      } else {
        await axios.post("http://localhost:3000/api/income/add", formData);
      }
      fetchIncomes();
      closeModal();
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await axios.delete(`http://localhost:3000/api/income/${id}`);
        fetchIncomes();
      } catch (error) {
        console.error("Error deleting income:", error);
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/income/downloadexcel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Income_details.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // Data for Pie Chart
  const pieChartData = {
    labels: incomes.map((i) => i.source),
    datasets: [
      {
        data: incomes.map((i) => parseFloat(i.amount || 0)),
        backgroundColor: [
          "#6A0DAD", // Purple
          "#FF6384", // Pink
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#00C49F", // Teal
          "#FF8C00", // Orange
          "#9ACD32"  // Green Yellow
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };
  
  

  return (
    <div className="p-6 bg-purple-100 rounded-lg shadow-lg mt-10 flex">
      <div className="w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Income Overview</h2>
        <p>Track your income !</p>
        <br />
        <div className="flex justify-end">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-400 mb-4 cursor-pointer"
            onClick={() => openModal()}
          >
            + Add Income
          </button>
        </div>

        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-purple-300 ">
              <th className="py-2 px-4 border-b border-white">Source</th>
              <th className="py-2 px-4 border-b border-white">Amount</th>
    
              <th className="py-2 px-4 border-b border-white">Date</th>
              <th className="py-2 px-4 border-b border-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income._id} className="border-t">
                <td className="py-2 px-22 border-r border-purple-300 border-b ">{income.source}</td>
                <td className="py-2 px-22 border-r border-purple-300 border-b">{income.amount}</td>

           
                <td className="py-2 px-22 border-r border-purple-300 border-b ">{income.date.split("T")[0]}</td>
                <td className="py-2 px-20 flex items-center border-r border-b border-purple-100  bg-purple-100 ">
                  <button
                    className=" text-black px-2 py-1 rounded-md mr-2 flex items-center bg-purple-100 "
                    onClick={() => openModal(income)}
                  >
                    <FaEdit className="mr-2 text-blue-400 hover:text-blue-600 cursor-pointer" />
                  </button>
                  <button
                    className=" text-black px-2 py-1 rounded-md flex items-center bg-purple-100 "
                    onClick={() => handleDelete(income._id)}
                  >
                    <FaTrash className="mr-2 text-red-400 hover:text-red-700 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        

        <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 mt-4 cursor-pointer"
          onClick={handleDownload}
        >
          Download Here!
        </button>
        <div>
        <h6 className="text-xs font-small">
            Download Your Income Summary Report from Here!
        </h6>
        </div>
        </div>

        {/* Modal for Add/Edit Budget */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <div className="p-8 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-all duration-300 ease-in-out transform scale-100">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? `Update Income ` : "Add Income"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                     <label htmlFor="income-source" className="block  text-sm font-medium text-gray-700">Source</label>
                     <input
                        type="text"
                         name="source"
                         placeholder="Income Source"
                         style={{
                            
                            fontSize: '14px', 
                            height: '48px', 
                            padding: '12px 16px',
                            border: '2px solid #8B5CF6', 
                          }}
                         value={formData.source}
                         onChange={handleChange}
                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          required
                    />
                  </div>


                  <div>
    <label htmlFor="income-amount" className="block text-sm font-medium text-gray-700">Amount</label>
    <input
      type="number"
      name="amount"
      placeholder="Amount"
      style={{
                            
        fontSize: '14px', // Input text size
        height: '48px', 
        padding: '12px 16px' ,
        border: '2px solid #8B5CF6',
      }}
      value={formData.amount}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      required
    />
    {formErrors.amount && (
      <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
    )}
  </div>

 <div>
    <label htmlFor="income-category" className="block text-sm font-medium text-gray-700">Category</label>
    <input
      type="text"
      name="category"
      placeholder="Category"
      style={{
        height: '48px', 
        padding: '12px 16px' ,                   
        fontSize: '14px',
        border: '2px solid #8B5CF6',
      }}
      value={formData.category}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      required
    />
  </div>

              
  <div>
    <label htmlFor="income-date" className="block text-sm font-medium text-gray-700">Date</label>
    <input
      type="date"
      name="date"
      value={formData.date}
      style={{
        height: '48px', 
        padding: '12px 16px' ,                   
        fontSize: '14px',
        border: '2px solid #8B5CF6',
      }}
      onChange={handleChange}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      required
    />
  </div>

  <div className="flex justify-end space-x-2 mt-6">
    <button
      type="submit"
      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
    >
      {editMode ? "Update" : "Add"}
    </button>
    <button
      type="button"
      onClick={closeModal}
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
    >
      Cancel
    </button>
  </div>
            </form>
          </div>
        </Modal>
      </div>

      {/* Pie Chart*/}
      <div className="w-1/3 ml-6">
        <h3 className="text-xl font-semibold mb-4">Your Income</h3>
        <div style={{ width: "100%", height: "400px" }}>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Income;
