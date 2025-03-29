import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaArrowLeft, FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddExpenseModal from '../components/AddExpenseModal';
import Footer from '../components/Footer';
import './Expense.css';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch('http://localhost:3000/api/expenses');
    const data = await response.json();
    setExpenses(data);
    setFilteredExpenses(data);
  };

  useEffect(() => {
    const filtered = expenses.filter((expense) =>
      expense.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExpenses(filtered);
  }, [searchQuery, expenses]);

  // Filter expenses for the graph based on selected year and month
  const expensesForGraph = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1;

    const yearMatch = expenseYear === selectedYear;
    const monthMatch = selectedMonth ? expenseMonth === parseInt(selectedMonth) : true;

    return yearMatch && monthMatch;
  });

  // Aggregate expenses by date and sum their amounts
  const aggregatedExpenses = expensesForGraph.reduce((acc, expense) => {
    const expenseDate = new Date(expense.date);
    // Normalize date to YYYY-MM-DD format for grouping
    const dateKey = expenseDate.toISOString().split('T')[0]; // e.g., "2025-03-30"

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: expenseDate,
        totalAmount: 0,
      };
    }
    acc[dateKey].totalAmount += Number(expense.amount);
    return acc;
  }, {});

  // Convert aggregated data to arrays for the graph, sorted by date
  const aggregatedData = Object.values(aggregatedExpenses)
    .sort((a, b) => a.date - b.date); // Sort by date ascending

  const graphData = {
    labels: aggregatedData.map((entry) => entry.date.toLocaleDateString()),
    datasets: [
      {
        label: selectedMonth
          ? `Expenses in ${new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' })} ${selectedYear}`
          : `Expenses in ${selectedYear}`,
        data: aggregatedData.map((entry) => entry.totalAmount),
        borderColor: '#8B5CF6', // Purple theme
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#8B5CF6',
      },
    ],
  };

  const graphOptions = {
    plugins: {
      tooltip: {
        backgroundColor: '#8B5CF6',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
      },
      legend: {
        labels: {
          color: '#4B0082',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#4B0082',
        },
        grid: {
          color: 'rgba(139, 92, 246, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#4B0082',
        },
        grid: {
          color: 'rgba(139, 92, 246, 0.1)',
        },
      },
    },
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/expenses/${id}`, { method: 'DELETE' });
    fetchExpenses();
  };

  const openModal = (expense = null) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setSelectedMonth('');
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const years = [...new Set(expenses.map((exp) => new Date(exp.date).getFullYear()))].sort();

  const months = [
    { value: '', label: 'All Months' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const currentMonthExpenses = filteredExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    return (
      expenseDate.getMonth() === currentDate.getMonth() &&
      expenseDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const displayedExpenses = viewAll ? filteredExpenses : currentMonthExpenses.slice(0, 12);

  return (
    <div className="expense-container">
      <div className="top-buttons">
        <Link to="/offers">
          <button className="best-offers">Best Offers</button>
        </Link>
        <select value={selectedYear} onChange={handleYearChange} className="year-filter">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange} className="month-filter">
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="add-expense-btn" onClick={() => openModal()}>
          + Add Expense
        </button>
      </div>

      <div className="graph-section">
        <h3>EXPENSE OVERVIEW</h3>
        <p>Track your spending trends over time and gain insights into where your money goes</p>
        <Line data={graphData} options={graphOptions} />
      </div>

      <div className="expense-list">
        <div className="expense-list-header">
          <h3>{viewAll ? "All Expenses" : "This Month's Expenses"}</h3>
          {viewAll ? (
            <button className="back-btn" onClick={() => setViewAll(false)}>
              <FaArrowLeft /> Back
            </button>
          ) : (
            <button className="view-all-btn" onClick={() => setViewAll(true)}>
              View All
            </button>
          )}
        </div>
        {displayedExpenses.length === 0 ? (
          <p className="no-expenses">
            {viewAll ? "No expenses found." : "No expenses for this month."}
          </p>
        ) : (
          <>
            <div className="expense-grid-header">
              <span>Name</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Actions</span>
            </div>
            {displayedExpenses.map((expense) => (
              <div key={expense._id} className="expense-row">
                <span>{expense.name}</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
                <span className="expense-amount" data-type={expense.type === 'income' ? '+' : '-'}>
                  {expense.type === 'income' ? '+' : '-'} Rs. {Math.abs(expense.amount)}
                </span>
                <div className="expense-actions">
                  <FaEdit onClick={() => openModal(expense)} className="edit-icon" />
                  <FaTrash onClick={() => handleDelete(expense._id)} className="delete-icon" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />

      {isModalOpen && (
        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          fetchExpenses={fetchExpenses}
          selectedExpense={selectedExpense}
        />
      )}
    </div>
  );
};

export default Expense;