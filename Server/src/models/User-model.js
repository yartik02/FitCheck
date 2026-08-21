import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    defaultResume: {
      url: String,
      publicId: String,
      fileName: String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRY },
    );
  } catch (error) {
    console.error("JWT Generation Error:", error);
  }
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;