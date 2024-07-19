const express = require("express");
const {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    updateProductController,

} = require("../controllers/productController.js");





const router = express.Router();

router.post("/create-product", createProductController);
router.get("/get-products", getProductController);
router.put("/update-product/:id", updateProductController);
router.get("/get-product/:id", getSingleProductController);
router.delete("/delete-product/:id", deleteProductController);


module.exports = router;