const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

router.get("/", (req, res) => {
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Category.findByPk(id, {
    include: [
      { model: Product, attributes: ["product_name", "price", "stock"] },
    ],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
router.post("/", async (req, res) => {
  try {
    const { category_name } = req.body;

    const newCategory = await Category.create({ category_name });
    return res.json(newCategory);
  } catch (error) {
    console.log(`[ERROR]: Failed to create new category | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { category_name } = req.body;
    if (!category_name) {
      return res.status(500).json({ message: "Unable to update tag" });
    }
    Category.update({ category_name }, { where: { id } });

    return res.status(200).json({ message: "Category updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});
// });

module.exports = router;
