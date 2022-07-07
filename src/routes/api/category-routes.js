const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  const getAllCategories = async (req, res) => {
    try {
      console.log("category is");
      const data = await Category.findAll({
        include: [
          { model: Product, attributes: ["product_name", "price", "stock"] },
        ],
      });

      console.log(data);

      return res.json({ success: true, data });
    } catch (error) {
      console.log(`[ERROR]: Failed to get all categories | ${error.message}`);

      return res.status(500).json({ success: false });
    }
  };
  // be sure to include its associated Products
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
