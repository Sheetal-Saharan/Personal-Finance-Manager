import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

// Dummy Transactions Data (Replace with actual data)
const transactions = [
  { date: "2025-03-10", type: "Expense", category: "Food", amount: 50 },
  { date: "2025-03-09", type: "Income", category: "Salary", amount: 500 },
  { date: "2025-03-08", type: "Expense", category: "Shopping", amount: 100 },
];

// Function to export transactions as CSV
export const exportToCSV = () => {
  const csv = Papa.unparse(transactions);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Function to export transactions as PDF
export const exportToPDF = () => {
  const doc = new jsPDF();
  doc.text("Transaction Report", 14, 10);
  doc.autoTable({
    head: [["Date", "Type", "Category", "Amount"]],
    body: transactions.map((t) => [t.date, t.type, t.category, t.amount]),
  });
  doc.save("transactions.pdf");
};
