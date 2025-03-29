import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import './AddExpenseModal.css';

const AddExpenseModal = ({ isOpen, onClose, fetchExpenses, selectedExpense }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    date: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    if (selectedExpense) {
      setFormData({
        name: selectedExpense.name,
        category: selectedExpense.category,
        amount: selectedExpense.amount,
        date: selectedExpense.date.split('T')[0], // Format date for input
      });
    } else {
      // Reset form when adding a new expense
      setFormData({
        name: '',
        category: '',
        amount: '',
        date: '',
      });
    }
    // Reset error message when the modal opens or selectedExpense changes
    setErrorMessage('');
  }, [selectedExpense, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    const method = selectedExpense ? 'PUT' : 'POST';
    const url = selectedExpense
      ? `http://localhost:3000/api/expenses/${selectedExpense._id}`
      : 'http://localhost:3000/api/expenses';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save expense');
      }

      // Show toast notification for success
      toast.success(selectedExpense ? 'Updated Successfully' : 'Added Successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast', // Custom class for styling
      });

      // Fetch updated expenses
      fetchExpenses();

      // Reset form
      setFormData({ name: '', category: '', amount: '', date: '' });

      // Close the modal immediately after showing the toast
      onClose();
    } catch (error) {
      // Show error message in the modal
      setErrorMessage(error.message || 'An error occurred while saving the expense');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{selectedExpense ? 'Edit Expense' : 'Add Expense'}</h4>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Expense Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-label="Expense Name"
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              aria-label="Expense Category"
            >
              <option value="">Select Category</option>
              <option value="Home utilities">Home utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Food & dining">Food & dining</option>
              <option value="Health & insurance">Health & insurance</option>
              <option value="Shopping entertainment">Shopping entertainment</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              aria-label="Expense Amount"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              aria-label="Expense Date"
            />
          </div>
          <div className="modal-actions">
            <button type="submit">{selectedExpense ? 'Update' : 'Add'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;