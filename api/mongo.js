import mongoose from "mongoose";
import index,{validator} from "../src/utils/database-utils/hexcode";
import { elementTypes } from "../src/utils/ElementDefinition";

const { Schema } = mongoose;

//Connect to Mongo Atlas
const URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://vercel-admin-user:1sYjGzD8VA3Yq5zj@cmms.crebytk.mongodb.net/admin";

const db = mongoose.connect(URI, function (error) {
  if (error) console.log(error);
  console.log("connection successful");
});

const elementSchema = new Schema({
  identificador: {
    type: String,
    index: true,
    unique: true,
    required: true,
    uppercase: true,
    default: index(),
    immutable: true,
     validate: {
      validator: validator(),
      message: 'Identificador no es un código hexadecimal'
    }
  },
  nombre: {
    type: String,
    enum: elementTypes,
    required: true,
  },
});

const dd = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const Blog = db.model("Blog", elementSchema);
// ready to go!
