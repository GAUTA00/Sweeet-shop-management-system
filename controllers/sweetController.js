import Sweet from "../models/Sweet.js";
import { generateNumericId } from "../utils/idGenerator.js";
// Controller to Add a sweet
export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const numericQuantity = Number(quantity);
    const numericPrice = Number(price);
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
