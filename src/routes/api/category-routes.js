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
  Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      pages: req.body.pages,
      edition: req.body.edition,
      is_paperback: req.body.is_paperback,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        isbn: req.params.isbn,
      },
    }
  );

  Category.create({
    category_name: req.body.category_name,
  })
    .then((newCategory) => {
      // Send the newly created row as a JSON object
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
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
