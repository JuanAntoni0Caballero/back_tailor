const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      lowercase: true,
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required.']
    }
  },
  {
    timestamps: true
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
