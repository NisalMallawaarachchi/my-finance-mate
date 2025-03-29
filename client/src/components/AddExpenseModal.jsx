import React, { useEffect, useState } from 'react';
import './AddExpenseModal.css';

const AddExpenseModal = ({ isOpen, onClose, fetchExpenses, selectedExpense }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        amount: '',
        date: '',
    });

    useEffect(() => {
        if (selectedExpense) {
            setFormData({
                name: selectedExpense.name,
                category: selectedExpense.category,
                amount: selectedExpense.amount,
                date: selectedExpense.date.split('T')[0],
            });
        }
    }, [selectedExpense]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = selectedExpense ? 'PUT' : 'POST';
        const url = selectedExpense
            ? `http://localhost:3000/api/expenses/${selectedExpense._id}`
            : 'http://localhost:3000/api/expenses';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        fetchExpenses();
        onClose();
        setFormData({ name: '', category: '', amount: '', date: '' });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>{selectedExpense ? 'Edit Expense' : 'Add Expense'}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Expense Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} required>
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