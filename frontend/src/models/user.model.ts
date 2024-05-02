/**
 * User schema
 * @description Defines the properties of a user
 * @type {mongoose.Schema}
 */
import mongoose ,{Schema ,Document} from "mongoose";
import { object, string } from "zod";

export interface User extends Document{
  studentName: string;
  email: string;
  studentRollNo: string;
  studentContactNo: string;
  password: string;
  role: string;
  createdAt: Date;
  borrowBooks: Array<{
    
    _id: string;
    borrowDate: Date;
    
    
    returnDate: Date;
    fine: number;
    isReturned: boolean;
  }>
  isVerified: boolean;
  fines: number;
  balance: number;
  
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
      type: new Schema({
        bookId: {
          type: Schema.Types.ObjectId,
          ref: "books", // replace "Book" with the actual model name for the book
        },
        borrowDate: {
          type: Date,
          default: Date.now,
          required: true,
        },
        returnDate: {
          type: Date,
          default: null,
        },
        fine: {
          type: Number,
          default: 0,
        },
        isReturned: {
          type: Boolean,
          default: false,
        },
      }),
    },
  
  ],
  /**
   * Fines
   * @type {number}
   */
  fines: {
    type: Number,
    default: 0,
  },
  /**
   * Balance
   * @type {number}
   */
  balance: {
    type: Number,
    default: 0,
  },
  
});

/**
 * User model
 *   Defines the user model and returns it
 */
const User = (mongoose.models.users as mongoose.Model<User>) || mongoose.model<User>("users", userSchema);

export default User;
