import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requiered: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name.toLowerCase().split(" ").join("-");
  }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
