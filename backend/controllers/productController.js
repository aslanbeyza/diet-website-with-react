const db = require("../models");
const { Op } = require("sequelize");


const getAllProducts = async (_req, res) => {
 
  try {
    const { searchTerm } = _req.query;
/*     console.log("beyza3",searchTerm);
 */    
let queryOptions = {};
if (searchTerm) {
  queryOptions.where = {
    ...queryOptions.where,
    name: { [Op.like]: `%${searchTerm}%` },
  };
}
    const products = await db.Product.findAll(queryOptions);
    return res.json(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};



const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    console.log(product_id);

    const product = await db.Product.findOne({
      where: { id: product_id },
      include: [{ model: db.Review }],
      include: [db.Category],
    });

    if (!product) {
      return res.status(404).send("Product not found");
    }

    return res.json(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getProductByName = async (req, res) => {

  try {
    const products = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.params.productName}%`, // Case-sensitive arama Todo: capitalize
        },
      },
    });

    if (products.length === 0) {
      return res.status(404).send("No products found");
    }

    return res.json(products);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      short_explanation,
      slug,
      photo_src,
      comment_count,
      average_star,
    } = req.body;

    const createProduct = await db.Product.create({
      name,
      short_explanation,
      slug,
      photo_src,
      comment_count,
      average_star,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!createProduct) {
      return res.status(400).send("Product not created");
    }

    return res.status(201).send("Product Created Successfully");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getAllProduct = async (req, res) => {
  try {
      const products = await db.Product.findAll();

      res.json(products);
  } catch (err) {
      res.status(500).send(err.message);
  }
}

module.exports = {
  getAllProducts,
  getProductByName,
  getProductById,
  createProduct,
  getAllProduct,
};
