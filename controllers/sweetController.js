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

