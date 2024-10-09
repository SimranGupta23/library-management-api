const Borrow = require('../models/Borrow');

exports.borrowBook = async (req, res) => {
  try {
    const borrow = new Borrow(req.body);
    await borrow.save();
    res.status(201).json(borrow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await Borrow.find().populate('userID bookID');
    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { userID, bookID, returnDate } = req.body;
    const borrowRecord = await Borrow.findOneAndUpdate(
      { userID, bookID },
      { returnDate },
      { new: true }
    );
    if (!borrowRecord) return res.status(404).json({ message: 'Borrow record not found' });
    res.status(200).json(borrowRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
