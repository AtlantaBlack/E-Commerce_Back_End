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
      return res.status(200).json({
        "message": "No tags exist"
      });
    }
    res.status(200).json(tagsData);
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = req.params.id;
    const errorMsg = `Tag with ID ${tagId} could not be found`;

    const selectedTagById = await Tag.findByPk(tagId, {
      include: [
        { model: Product }
      ]
    });

    if (!selectedTagById) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    res.status(200).json(selectedTagById);
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;

    if (!tag_name) {
      return res.status(400).json({
        "message": "Please add a tag name"
      });
    }

    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {
    const tagId = req.params.id;
    const errorMsg = `Update failed because Tag with ID ${tagId} could not be found`;

    const { tag_name } = req.body;

    if (!tag_name) {
      return res.status(400).json({
        "message": "Please enter a valid tag name"
      });
    }

    const updatedTagData = await Tag.update(
      { tag_name },
      {
        where: {
          id: tagId
        }
      });

    if (!updatedTagData[0]) {
      return res.status(404).json({
        "message": errorMsg
      });
    }

    res.status(200).json({
      "message": "Tag successfully updated",
      updatedTagData
    });
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {

    const tagId = req.params.id;
    const errorMsg = `Delete failed because Tag with ID ${tagId} could not be found`;

    const tagData = await Tag.destroy({
      where: {
        id: tagId
      }
    });

    if (!tagData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }

    res.status(200).json({
      "message": "Tag successfully deleted",
      tagData
    });
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

module.exports = router;
