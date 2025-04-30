const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Income</h2>
                    <p className="text-2xl font-bold">$5,000</p>
                </div>
                <div className="p-4 bg-red-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Expenses</h2>
                    <p className="text-2xl font-bold">$3,200</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Remaining Budget</h2>
                    <p className="text-2xl font-bold">$1,800</p>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">March 19, 2025</td>
                            <td className="border p-2">Salary</td>
                            <td className="border p-2 text-green-600">+ $3,000</td>
                        </tr>
                        <tr>
                            <td className="border p-2">March 18, 2025</td>
                            <td className="border p-2">Groceries</td>
                            <td className="border p-2 text-red-600">- $150</td>
                        </tr>
                        <tr>
                            <td className="border p-2">March 17, 2025</td>
                            <td className="border p-2">Dining Out</td>
                            <td className="border p-2 text-red-600">- $60</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;