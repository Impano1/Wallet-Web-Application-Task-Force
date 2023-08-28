// Load the required scripts programmatically
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.0/jspdf.umd.min.js"
)
  .then(() => {
    return loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.17/jspdf.plugin.autotable.min.js"
    );
  })
  .then(() => {
    initExpenseApp(); // Initialize the expense app after libraries are loaded
  })
  .catch((err) => {
    console.error("Failed to load script: ", err);
  });

function initExpenseApp() {
  document.getElementById("expForm").addEventListener("submit", addExpense);

  // initial array of expenses, reading from localStorage
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function addExpense(e) {
    e.preventDefault();
    let type = document.getElementById("type").value;
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let amount = parseFloat(document.getElementById("amount").value); // Convert string to float

    const newTotal = getTotalExpenses() + amount;
    if (newTotal > 1000000) {
      alert(
        "The total of all expenses exceeds the limit of 1,000,000. Please review your amounts."
      );
      return;
    }

    if (type !== "chooseOne" && name.length > 0 && date !== "" && amount > 0) {
      const expense = {
        type,
        name,
        date,
        amount,
        id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
      };

      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    document.getElementById("expForm").reset();
    showExpenses();
  }

  function showExpenses() {
    const expenseTable = document.getElementById("expenseTable");
    expenseTable.innerHTML = "";
    for (let i = 0; i < expenses.length; i++) {
      expenseTable.innerHTML += `
                      <tr>
                          <td>${expenses[i].type}</td>
                          <td>${expenses[i].name}</td>
                          <td>${expenses[i].date}</td>
                          <td>$${expenses[i].amount}</td>
                          <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">Delete</td>
                      </tr>
                  `;
    }
  }

  function deleteExpense(id) {
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].id == id) {
        expenses.splice(i, 1);
      }
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
  }

  function getTotalExpenses() {
    return expenses.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
  }

  function generateReport() {
    const pdf = new jsPDF();
    const headers = ["Type", "Name", "Date", "Amount"];
    const data = expenses.map((exp) => [
      exp.type,
      exp.name,
      exp.date,
      `$${exp.amount}`,
    ]);
    pdf.text("Expense Report", 10, 10);
    pdf.autoTable({
      head: [headers],
      body: data,
      startY: 20,
    });
    const total = getTotalExpenses();
    pdf.text(
      `Total Expenses: $${total}`,
      10,
      pdf.autoTable.previous.finalY + 10
    );
    pdf.save("expense_report.pdf");
  }

  // If you want the generateReport function to be accessible globally, attach it to the window object
  window.generateReport = generateReport;

  showExpenses();
}
