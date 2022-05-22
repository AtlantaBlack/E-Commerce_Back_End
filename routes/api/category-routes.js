const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: { model: Product }
    });

    if (!categoryData) {
      return res.status(200).json({
        "message": "No categories exist"
      });
    }

    res.status(200).json(categoryData);
  } catch (error) {
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
    const categoryId = req.params.id;
    const errorMsg = `Category with ID ${categoryId} could not be found`;

    const selectedCategoryData = await Category.findByPk(categoryId, {
      include: { model: Product }
    });

    if (!selectedCategoryData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }

    res.status(200).json(selectedCategoryData);
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({
        "message": "Please add a category name"
      });
    }

    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = req.params.id;
    const errorMsg = `Update failed because Category with ID ${categoryId} could not be found`;

    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({
        "message": "Please enter a valid category name"
      });
    }

    const updatedCategoryData = await Category.update(
      { category_name },
      {
        where: {
          id: categoryId
        }
      }
    );

    if (!updatedCategoryData[0]) {
      return res.status(404).json({
        "message": errorMsg
      });
    }

    res.status(200).json({
      "message": "Category successfully updated",
      updatedCategoryData
    });
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {

    const categoryId = req.params.id;
    const errorMsg = `Delete failed because Category with ID ${categoryId} could not be found`;

    const categoryData = await Category.destroy({
      where: {
        id: categoryId
      }
    });

    if (!categoryData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }

    res.status(200).json({
      "message": "Category successfully deleted",
      categoryData
    });
  } catch (error) {
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

module.exports = router;
