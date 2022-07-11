const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      { model: Product, attributes: ["product_name", "price", "stock"] },
    ],
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const { id } = req.params;
  Tag.findByPk(id, {
    include: [
      { model: Product, attributes: ["product_name", "price", "stock"] },
    ],
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;

    // insert category in the DB
    const newTag = Tag.create({ tag_name });
    return res.json(newTag);
  } catch (error) {
    console.log(`[ERROR]: Failed to create new tag | ${error.message}`);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { id } = req.params;
    const tag = Tag.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    const { tag_name } = req.body;
    if (!tag_name) {
      return res.status(500).json({ message: "Unable to update tag" });
    }
    Tag.update({ tag_name }, { where: { id } });

    return res.status(200).json({ message: "Tag updated" });
  } catch (error) {
    console.error(`ERROR | ${error.message}`);
    return res.status(500).json(error);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
