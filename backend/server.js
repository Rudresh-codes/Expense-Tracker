import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


//Expense Schema
const expenseSchema = new mongoose.Schema({
  title: String,
    description: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

//Routes
app.get('/', (req, res) => {
  res.send('Expense Tracker API');
});

app.post('/api/expenses', async (req, res) => {
  const newExpense = new Expense(req.body); 
    try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/expenses/summary', async (req, res) => {
  try {
    const summary = await Expense.aggregate([
        { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
