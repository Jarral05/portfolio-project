import Products from "../models/products.model.js";

//create product function

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, productImage } = req.body;

    if (!title || !description || !price || !category || !productImage) {
      res.status(400).json({ message: "All Fields are mandatory" });
    }

    const newProduct = new Products({
      title,
      description,
      price,
      category,
      productImage,
    });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

//get all product's data

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

// get single product's data
export const getSingularProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

// update single product by id

export const updateSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(400).json({ message: "Got an Error in Catch Block" });
  }
};

//delete single record

export const deleteSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findByIdAndDelete(productId);
    if (product) {
      res.status(200).json({ message: "Successfully deleted User" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error found in catch block" });
  }
};
