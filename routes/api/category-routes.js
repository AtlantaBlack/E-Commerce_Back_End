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
          return res.status(404).json({ "message": "No categories found." });
      }

      res.status(200).json(categoryData);
  } catch (error) {
      res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id; 
    const errorMsg = `No category found with ID ${categoryId}`;

      const selectedCategoryById = await Category.findByPk(req.params.id, {
          include: { model: Product }
      });

      if (!selectedCategoryById) {
          return res.status(404).json({ "message": errorMsg });
      }

      res.status(200).json(selectedCategoryById);
  } catch (error) {
      res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
