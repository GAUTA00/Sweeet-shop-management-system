import Sweet from "../models/Sweet.js";
import { generateNumericId } from "../utils/idGenerator.js";
// Controller to Add a sweet
export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
    // Check if sweet with same name and category exists
    let existingSweet = await Sweet.findOne({ name, category });
    if (existingSweet) {
      existingSweet.quantity += numericQuantity;
      existingSweet.price = numericPrice;
      await existingSweet.save();
      return res.status(200).json({
        message: 'Sweet already exists, quantity updated Successfully',
        sweet: existingSweet
      });
    }
    const sweetId = generateNumericId();
    const newSweet = new Sweet({ sweetId, name, category, price: numericPrice, quantity: numericQuantity });
    await newSweet.save();
    res.status(201).json({
      message: 'Sweet added successfully',
      sweet: newSweet
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error while adding sweet to the shop',
      error: error.message
    });
  }
};
//Controller to Update a sweet details 
export const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;
    const updatedSweet = await Sweet.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true }
    );
    if (!updatedSweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.status(200).json({
      message: 'Sweet updated successfully',
      sweet: updatedSweet
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error while updating sweet',
      error: error.message
    });
  }
};
// Controller to delete a sweet
export const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSweet = await Sweet.findByIdAndDelete(id);
    if (!deletedSweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.status(200).json({
      message: 'Sweet deleted successfully',
      sweet: deletedSweet
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error while deleting sweet',
      error: error.message
    });
  }
};
//Controller to Get all sweets
export const getAllSweets = async (req, res) => {
  try {
    const allSweets = await Sweet.find();
    res.status(200).json(allSweets);
  } catch (error) {
    res.status(500).json({
      message: 'Error while retrieving sweets',
      error: error.message
    });
  }
};

// Controller to Search sweets by category or name and sort them
// Below searchSweets is AI Assisted code
export const searchSweets = async (req, res) => {
  try {
    const { name, category, sortBy, order } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (category) filter.category = category;
    let sort = {};
    if (sortBy && ['price', 'quantity'].includes(sortBy)) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }
    const sweets = await Sweet.find(filter).sort(sort);
    res.status(200).json({ sweets });
  } catch (error) {
    console.error("Error in searchSweets:", error);
    res.status(500).json({ message: 'Error while searching sweets', error: error.message });
  }
};
// Controller to handle purchasing and restocking sweets
export const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    if (quantity > sweet.quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }
    sweet.quantity -= quantity;
    await sweet.save();
    res.status(200).json({ message: 'Sweet purchased successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Error while purchasing sweet', error: error.message });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const sweet = await Sweet.findById(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    sweet.quantity += quantity;
    await sweet.save();
    res.status(200).json({ message: 'Sweet restocked successfully', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Error while restocking sweet', error: error.message });
  }
};
