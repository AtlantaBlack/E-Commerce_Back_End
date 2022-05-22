const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productsData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    if (!productsData) {
      return res.status(200).json({ "message": "No products exist" });
    }
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ error, "message": "Something went wrong" });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productId = req.params.id;
    const errorMsg = `Product with ID ${productId} could not be found`;

    const selectedProductData = await Product.findByPk(productId, {
      include: [
        { model: Category },
        { model: Tag }
      ]
    })
    if (!selectedProductData) {
      return res.status(404).json({ "message": errorMsg });
    }
    res.status(200).json(selectedProductData);
  } catch (error) {
    res.status(500).json({ error, "message": "Something went wrong" });
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  const {
    product_name, price, stock, category_id, tagIds
  } = req.body;

  if (!product_name || !price || !stock || !category_id) {
    return res.status(400).json({ "message": "Please enter a valid product name, price, category ID, and/or stock count" });
  }

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (tagIds.length) {
        const productTagIdArr = tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error, "message": "Something went wrong"
      });
    });
});

// update product
router.put('/:id', async (req, res) => {

  const productId = req.params.id;
  const errorMsg = `Update failed because Product with ID ${productId} could not be found`;

  const product = await Product.findByPk(productId);

  if (!product) {
    return res.status(404).json({ "message": errorMsg });
  }

  // update product data
  Product.update(req.body, {
    where: {
      id: productId,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: productId } });
    })
    .then((productTags) => {

      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      if (!req.body.tagIds) {
        return productTagIds;
      }

      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: productId,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => {
      res.status(200).json({
        "message": "Successfully updated Product", updatedProductTags
      });
    })
    .catch((error) => {
      console.log(`\n------ ERROR`);
      console.log(error);
      res.status(400).json({
        error,
        "message": "Something went wrong"
      });
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
