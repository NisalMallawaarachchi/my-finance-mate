import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

Modal.setAppElement("#root");

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [formData, setFormData] = useState({
    month: "",
    essential: "",
    wants: "",
    savings: "",
    date: "",
  });
  const [formErrors, setFormErrors] = useState({
    essential: "",
    wants: "",
    savings: "",
  });

  // Fetch budgets on page load
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/budget/get");
      setBudgets(res.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const openModal = (budget = null) => {
    setEditMode(!!budget);
    setSelectedBudget(budget);
    setModalIsOpen(true);
    setFormData(
      budget || {
        month: "",
        essential: "",
        wants: "",
        savings: "",
        date: "",
      }
    );
    setFormErrors({
      essential: "",
      wants: "",
      savings: "",
    });
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedBudget(null);
    setFormData({
      month: "",
      essential: "",
      wants: "",
      savings: "",
      date: "",
    });
    setFormErrors({
      essential: "",
      wants: "",
      savings: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (parseFloat(formData.essential) <= 0) {
      errors.essential = "Essential must be greater than 0";
    }
    if (parseFloat(formData.wants) <= 0) {
      errors.wants = "Wants must be greater than 0";
    }
    if (parseFloat(formData.savings) <= 0) {
      errors.savings = "Savings must be greater than 0";
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
      if (editMode && selectedBudget) {
        await axios.put(`http://localhost:3000/api/budget/update/${selectedBudget._id}`, formData);
      } else {
        await axios.post("http://localhost:3000/api/budget/add", formData);
      }
      fetchBudgets();
      closeModal();
    } catch (error) {
      console.error("Error saving budget:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      try {
        await axios.delete(`http://localhost:3000/api/budget/${id}`);
        fetchBudgets();
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budget/downloadexcel", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Budget_details.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // Data for Pie Chart (Sum of all budgets for Essentials, Wants, and Savings)
  const pieChartData = {
    labels: ["Essential", "Wants", "Savings"],
    datasets: [
      {
        data: [
          budgets.reduce((sum, budget) => sum + parseFloat(budget.essential || 0), 0),
          budgets.reduce((sum, budget) => sum + parseFloat(budget.wants || 0), 0),
          budgets.reduce((sum, budget) => sum + parseFloat(budget.savings || 0), 0),
        ],
        backgroundColor: ["#003366", "#ADD8E6", "#87CEEB"],
        hoverBackgroundColor: ["#003366", "#ADD8E6", "#87CEEB"],
      },
    ],
  };

  return (
    <div className="p-6 bg-purple-100 rounded-lg shadow-lg mt-10 flex">
      <div className="w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Budget Goals Vs Savings Overview</h2>
        <p>Track your budget goals and save!</p>
        <br />
        <div className="flex justify-end">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-400 mb-4"
            onClick={() => openModal()}
          >
            + Add Budget Goal
          </button>
        </div>

        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-purple-300">
              <th className="py-2 px-4">Month</th>
              <th className="py-2 px-4">Essential</th>
              <th className="py-2 px-4">Wants</th>
              <th className="py-2 px-4">Savings</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget) => (
              <tr key={budget._id} className="border-t">
                <td className="py-2 px-4">{budget.month}</td>
                <td className="py-2 px-4">{budget.essential}</td>
                <td className="py-2 px-4">{budget.wants}</td>
                <td className="py-2 px-4">{budget.savings}</td>
                <td className="py-2 px-4">{budget.date.split("T")[0]}</td>
                <td className="py-2 px-4 flex items-center">
                  <button
                    className="bg-white text-black px-2 py-1 rounded-md mr-2 flex items-center"
                    onClick={() => openModal(budget)}
                  >
                    <FaEdit className="mr-2" />
                  </button>
                  <button
                    className="bg-white text-black px-2 py-1 rounded-md flex items-center"
                    onClick={() => handleDelete(budget._id)}
                  >
                    <FaTrash className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-400 mt-4"
          onClick={handleDownload}
        >
          Download Here!
        </button>

        {/* Modal for Add/Edit Budget */}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? `Update Budget - ${selectedBudget?.month}` : "Add Budget"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="month"
                placeholder="Month"
                value={formData.month}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="number"
                name="essential"
                placeholder="Essential"
                value={formData.essential}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
                required
              />
              {formErrors.essential && (
                <div className="text-red-500 text-sm">{formErrors.essential}</div>
              )}
              <input
                type="number"
                name="wants"
                placeholder="Wants"
                value={formData.wants}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
                required
              />
              {formErrors.wants && (
                <div className="text-red-500 text-sm">{formErrors.wants}</div>
              )}
              <input
                type="number"
                name="savings"
                placeholder="Savings"
                value={formData.savings}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
                required
              />
              {formErrors.savings && (
                <div className="text-red-500 text-sm">{formErrors.savings}</div>
              )}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
                required
              />
              <div className="flex justify-end">
                <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded-md">
                  {editMode ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="ml-2 bg-gray-300 px-4 py-2 rounded-md cancel-button"
                  onClick={closeModal}
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
        <h3 className="text-xl font-semibold mb-4">Budget Goals</h3>
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default Budget;
