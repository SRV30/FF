import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: [true, "Address is required"],
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity should be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
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
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
      default: 0,
    },
    shipping: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmountWithGST: {
      type: Number,
      required: true,
    },
    totalAmountWithShipping: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
      default: "",
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      default: "PENDING",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    orderHistory: [
      {
        status: {
          type: String,
          enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
        changedBy: {
          type: String,
        },
        notes: {
          type: String,
          default: "",
        },
      },
    ],
    deliveryDate: {
      type: Date,
      required: true,
    },
    trackingId: {
      type: String,
      default: "",
    },
    transactionId: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to update the total amounts
orderSchema.pre("save", function (next) {
  this.totalAmountWithGST = this.totalAmount + (this.gst || 0);
  this.totalAmountWithShipping = this.totalAmountWithGST + (this.shipping || 0);
  next();
});

orderSchema.index({ user: 1 });
orderSchema.index({ orderStatus: 1 });

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
