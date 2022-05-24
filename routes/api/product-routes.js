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
        { model: Category }, // include category
        { model: Tag } // include tags
      ]
    });
    // if no products exist, send message
    if (!productsData) {
      return res.status(200).json({
        "message": "No products exist"
      });
    }
    // send data for all found products
    res.status(200).json(productsData);
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    // create variables for use later
    const productId = req.params.id;
    const errorMsg = `Product with ID ${productId} could not be found`;

    // find the specified product
    const selectedProductData = await Product.findByPk(productId, {
      include: [
        { model: Category },
        { model: Tag }
      ]
    });
    // if there is no product found, send error message
    if (!selectedProductData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send data for specified product
    res.status(200).json(selectedProductData);
  } catch (error) {
    // error handling
    res.status(500).json({
      "message": "Something went wrong...",
      error
    });
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

  // destructure the req.body
  const {
    product_name, price, stock, category_id, tagIds
  } = req.body;

  // if the following keys aren't present in the post request, send an error message
  if (!product_name || !price || !stock || !category_id) {
    return res.status(400).json({
      "message": "Please enter a valid product name, price, category ID, and/or stock count"
    });
  }

  // create the product
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
      res.status(200).json({
        "message": "Product successfully added!", product
      });
    })
    .then((productTagIds) => {
      res.status(200).json({
        "message": "Product successfully added!", productTagIds
      });
    })
    .catch((error) => {
      // console.log(`\n---- ERROR`)
      // console.log(error);
      res.status(500).json({
        "message": "Something went wrong...",
        error
      });
    });
});

// update product
router.put('/:id', async (req, res) => {
  // create variables for later
  const productId = req.params.id;
  const errorMsg = `Update failed because Product with ID ${productId} could not be found`;

  // see if the specified product exists first
  const product = await Product.findByPk(productId);

  // if product does not exist, send error message
  if (!product) {
    return res.status(404).json({
      "message": errorMsg
    });
  }

  // if specified product exists, then update data
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

      // if tag ids are NOT to be updated, return the current tag id info
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
      // send success message
      res.status(200).json({
        "message": "Product successfully updated!", updatedProductTags
      });
    })
    .catch((error) => {
      // console.log(`\n------ ERROR`);
      // console.log(error);
      res.status(500).json({
        "message": "Something went wrong...",
        error
      });
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    // create variables for use later
    const productId = req.params.id;
    const errorMsg = `Delete failed because Product with ID ${productId} could not be found`;

    // destroy specified product
    const productData = await Product.destroy({
      where: {
        id: productId
      }
    });
    // if specified product doesn't exist, send error message
    if (!productData) {
      return res.status(404).json({
        "message": errorMsg
      });
    }
    // send success message
    res.status(200).json({
      "message": "Product successfully deleted",
      productData
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
