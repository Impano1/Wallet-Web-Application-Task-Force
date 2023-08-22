// ... previous code ...

// Initialize UI elements
document.addEventListener('DOMContentLoaded', function () {
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const generateReportBtn = document.getElementById('generateReportBtn');

    addTransactionBtn.addEventListener('click', function () {
        const account = document.getElementById('account').value;
        const transactionType = document.querySelector('input[name="transactionType"]:checked').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;

        if (transactionType === 'expense') {
            checkBudgetExceed(1000, amount); // Example budget limit
        }

        addTransaction(account, transactionType, amount, category);
    });

    generateReportBtn.addEventListener('click', function () {
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);

        generateReport(startDate, endDate);
    });
});

/* Basic styling for header */
header {
    text - align: center;
    padding: 20px;
    background - color: #333;
    color: white;
}

/* Styling for transaction form and data display */
#transaction - form {
    padding: 20px;
    border: 1px solid #ccc;
    background - color: #f7f7f7;
    margin - bottom: 20px;
}

#transaction - form input[type = "number"],
    #transaction - form input[type = "text"],
        #transaction - form select {
    margin - right: 10px;
    margin - bottom: 10px;
    padding: 5px;
    width: 150px;
}

#transaction - list ul {
    list - style - type: none;
    padding: 0;
}

/* Styling for report section */
#report {
    padding: 20px;
    border: 1px solid #ccc;
    background - color: #f7f7f7;
    margin - bottom: 20px;
}

#startDate,
    #endDate {
    margin - right: 10px;
}

/* Styling for notification section */
#notification {
    padding: 10px;
    background - color: #ff9999;
    color: white;
    text - align: center;
    font - weight: bold;
}

/* ... previous styles ... */
