
document.getElementById("expForm").addEventListener("submit", addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense(e) {
  e.preventDefault();

  // get type, name, date, and amount
  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let amount = parseFloat(document.getElementById("amount").value); // Convert string to float

  const newTotal = getTotalExpenses() + amount;
  // Check if the total sum of expenses after adding the new amount exceeds the limit
  if (newTotal > 1000000) {
    alert(
      "The total of all expenses exceeds the limit of 1,000,000. Please review your amounts."
    );
    return; // Return early from the function
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
    // localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  document.getElementById("expForm").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");

  expenseTable.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].name}</td>
                <td>${expenses[i].date}</td>
                <td>$${expenses[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                    Delete</td>
            </tr>
        `;
  }
};

const deleteExpense = (id) => {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      expenses.splice(i, 1);
    }
  }

  // localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
};

showExpenses();

function getTotalExpenses() {
  return expenses.reduce(
    (total, expense) => total + parseFloat(expense.amount),
    0
  );
}
