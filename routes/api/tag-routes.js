const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include:
        { model: Product } // include the tag
    });
    // if there are no tags, send message
    if (!tagsData) {
      return res.status(200).json({
        "message": "No tags exist"
      });
    }
    // send data for all found tags
    res.status(200).json(tagsData);
  } catch (error) {
    // error handling
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
    // create variables for use later
    const tagId = req.params.id;
    const errorMsg = `Tag with ID ${tagId} could not be found`;

    // find specified tag
    const selectedTagById = await Tag.findByPk(tagId, {
      include: [
        { model: Product }
      ]
    });

    // if no tag found, send error message
    if (!selectedTagById) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send data for specified tag
    res.status(200).json(selectedTagById);
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body structure:
    {
      "tag_name": "example tag" 
    }
  */
  try {
    // destructure req.body
    const { tag_name } = req.body;

    // if tag name is null/empty
    if (!tag_name) {
      return res.status(400).json({
        "message": "Please enter a tag name"
      });
    }
    // create new tag
    const newTag = await Tag.create(req.body);
    // send success msg
    res.status(200).json({
      "message": "Tag successfully added!",
      newTag
    });
  } catch (error) {
    // error
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // create variables for later
    const tagId = req.params.id;
    const errorMsg = `Update failed because Tag with ID ${tagId} could not be found`;
    // destructure req.body
    const { tag_name } = req.body;

    // if no tag name entered, send error message
    if (!tag_name) {
      return res.status(400).json({
        "message": "Please enter a valid tag name"
      });
    }
    // update the tag
    const updatedTagData = await Tag.update(
      { tag_name },
      {
        where: {
          id: tagId
        }
      });
    // if tag doesn't exist, send error message
    if (!updatedTagData[0]) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send success message
    res.status(200).json({
      "message": "Tag successfully updated!",
      updatedTagData
    });
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    // create variables for use later
    const tagId = req.params.id;
    const errorMsg = `Delete failed because Tag with ID ${tagId} could not be found`;

    // destroy the specified tag
    const tagData = await Tag.destroy({
      where: {
        id: tagId
      }
    });
    // if tag doesn't exist, send error message
    if (!tagData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send success message
    res.status(200).json({
      "message": "Tag successfully deleted",
      tagData
    });
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

module.exports = router;
