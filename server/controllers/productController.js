import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, category, brand, stock } =
      req.body;

    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      images,
      category,
      brand,
      stock,
      createdBy: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    //Search by name
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    //Filter by category
    const categoryFilter = req.query.category
      ? { category: req.query.category }
      : {};

    //Filter by price range
    const priceFilter = {};
    if (req.query.minPrice) priceFilter.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) priceFilter.$lte = Number(req.query.maxPrice);
    const priceQuery = Object.keys(priceFilter).length
      ? { price: priceFilter }
      : {};

    const filters = { ...keyword, ...categoryFilter, ...priceQuery };

    const count = await Product.countDocuments(filters);
    const products = await Product.find(filters)
      .populate("category", "name slug")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.status(201).json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "namme slug",
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, description, price, images, category, brand, stock } =
      req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
