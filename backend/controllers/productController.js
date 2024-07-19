const productModel = require("../models/productModel.js");

const createProductController = async (req, res) => {
  try {
    const { _id, name, description, price, category, brand } = req.body;
    if (!_id || !name || !description || !price || !category || !brand) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const product = new productModel({ _id, name, description, price, category, brand }); 
    await product.save();
    res.status(201).send({ success: true, message: "Product created successfully", product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send({ success: false, error, message: "Error in creating product" });
  }
};




const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({ success: true, countTotal: products.length, message: "All products", products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).send({ success: false, message: "Error in getting products", error: error.message });
  }
};

const getSingleProductController = async (req, res) => {
  try {
   
    const productId = Number(req.params.id);
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }
    res.status(200).send({ success: true, message: "Single product fetched", product });
  } catch (error) {
    console.error('Error getting single product:', error);
    res.status(500).send({ success: false, message: "Error while getting single product", error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params; 

    const product = await productModel.findByIdAndDelete(id); 
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    res.status(200).send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send({ success: false, message: "Error while deleting product", error });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, brand } = req.body;
    const { id } = req.params; 

    if (!name || !description || !price || !category || !brand) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const product = await productModel.findByIdAndUpdate(id, { name, description, price, category, brand }, { new: true });
    if (!product) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    res.status(201).send({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ success: false, error, message: "Error in updating product" });
  }
};

  

module.exports = {
    createProductController,
    getProductController,
    getSingleProductController,
    deleteProductController,
    updateProductController,
  };