const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include:
        { model: Product }
    });
    if (!tagsData) {
      return res.status(404).json({ "message": "No tags found." });
    }
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;
    const errorMsg = `No tag found with ID ${tagId}`;

    const selectedTagById = await Tag.findByPk(tagId, {
      include: [
        { model: Product }
      ]
    })
    if (!selectedTagById) {
      return res.status(404).json({ "message": errorMsg })
    }
    res.status(200).json(selectedTagById);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
