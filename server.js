const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/expense-tracker'; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    account: String,
    type: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// API Endpoints
app.post('/api/transactions', async (req, res) => {
    const { account, type, amount, category } = req.body;

    try {
        const newTransaction = new Transaction({ account, type, amount, category });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction' });
    }
});

app.get('/api/transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
