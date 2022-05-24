const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: { model: Product } // include associated products
    });
    // send a message if there are no existing categories
    if (!categoryData) {
      return res.status(200).json({
        "message": "No categories exist"
      });
    }
    // send data for all categories
    res.status(200).json(categoryData);
  } catch (error) {
    // if error occurs, show msg and error
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // define variables to use later
    const categoryId = req.params.id;
    const errorMsg = `Category with ID ${categoryId} could not be found`;

    // search for selected category incl. products
    const selectedCategoryData = await Category.findByPk(categoryId, {
      include: { model: Product }
    });
    // if there is no category data found, send error message
    if (!selectedCategoryData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send data for specified category
    res.status(200).json(selectedCategoryData);
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.post('/', async (req, res) => {
  // create a new category      
  /* req.body structure:
    {
      "category_name": "example name"
    }
  */
  try {
    // destructure req.body obj
    const { category_name } = req.body;

    // if category name is null/an empty string
    if (!category_name) {
      return res.status(400).json({
        "message": "Please enter a category name"
      });
    }
    // create the category
    const newCategory = await Category.create(req.body);
    // send success message and data for the newly created category
    res.status(200).json({
      "message": "Category successfully added!",
      newCategory
    });
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  /* req.body structure:
    {
      "category_name": "example updated name"
    }
  */
  try {
    // create variables to use later
    const categoryId = req.params.id;
    const errorMsg = `Update failed because Category with ID ${categoryId} could not be found`;
    // destructure req.body
    const { category_name } = req.body;

    // if category name is null/an empty string
    if (!category_name) {
      return res.status(400).json({
        "message": "Please enter a valid category name"
      });
    }
    // update the category
    const updatedCategoryData = await Category.update(
      { category_name }, // update the name
      {
        where: {
          id: categoryId // using the params
        }
      }
    );
    // if there is no category to update, send an error message
    if (!updatedCategoryData[0]) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send a success message and data for the updated category
    res.status(200).json({
      "message": "Category successfully updated!",
      updatedCategoryData
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
  // delete a category by its `id` value

  try {
    // create variables for use later
    const categoryId = req.params.id;
    const errorMsg = `Delete failed because Category with ID ${categoryId} could not be found`;

    // destroy the category
    const categoryData = await Category.destroy({
      where: {
        id: categoryId
      }
    });
    // if there isn't a category to destroy, send error message
    if (!categoryData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send success message
    res.status(200).json({
      "message": "Category successfully deleted",
      categoryData
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
