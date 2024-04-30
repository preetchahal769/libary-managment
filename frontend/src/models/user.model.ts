/**
 * User schema
 * @description Defines the properties of a user
 * @type {mongoose.Schema}
 */
import mongoose ,{Schema ,Document} from "mongoose";

export interface User extends Document{
  studentName: string;
  email: string;
  studentRollNo: string;
  studentContactNo: string;
  password: string;
  role: string;
  createdAt: Date;
  borrowBooks: any[];
  isVerified: boolean;
  
}
const userSchema : Schema<User> = new Schema({
  /**
   * Student name
   * @type {string}
   */
  studentName: {
    type: String,
    required: [true, "Please add a name"],
  },
  /**
   * Email
   * @type {string}
   */
  email: {
  type: String,
  required: [true, "Please add an email"],
  unique: true,
},
  /**
   * Student roll number
   * @type {string}
   */
  studentRollNo: {
    type: String,
    required: [true, "Please add a roll number"],
    unique: true,
  },
  /**
   * Student contact number
   * @type {string}
   */
  studentContactNo: {
    type: String,
    required: [true, "Please add a contact number"],
    unique: true ,
  },
  /**
   * Password
   * @type {string}
   */
  password: {
    type: String,
    required: true,
  },
  /**
   * Is user verified
   * @type {boolean}
   */
  isVerified: {
    type: Boolean,
    default: false,
  },
  /**
   * User role
   * @type {string}
   */
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  /**
   * User created at
   * @type {Date}
   */
  createdAt: {
    type: Date,
    default: Date.now,
  },
  borrowBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
  ],
  
});

/**
 * User model
 *   Defines the user model and returns it
 */
const User = (mongoose.models.users as mongoose.Model<User>) || mongoose.model<User>("users", userSchema);

export default User;
