const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // // find all categories

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

router.post("/", async (req, res) => {
  // create a new category
  try {
    const { category_name } = req.body;

    // insert category in the DB
    const newCategory = await Category.create({ category_name });
    return res.json(newCategory);
  } catch (error) {
    console.log(`[ERROR]: Failed to create new category | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const category = Category.findByPk(id);

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
  // delete a category by its `id` value
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
