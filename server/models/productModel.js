import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please Enter Product Category"],
        ref: "category",
      },
    ],
    gender: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS"],
      required: [true, "Please specify the target gender for the product"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [
        {
          user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
          name: { type: String, required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    more_details: {
      type: Object,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

productSchema.index(
  { name: "text", description: "text" },
  { weights: { name: 10, description: 5 } }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
