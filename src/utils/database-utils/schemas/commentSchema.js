//Third party imports
import mongoose from "mongoose";

//Project import
import index, { validator } from "../hexcode";

const { Schema } = mongoose;

export default new Schema({
  usuario: {
    type: String,
  },
  comentario: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: true,
  },
  adjuntos: {
    type: [String],
  },
  tipo: {
    type: String,
    enum: process.env.COMMENT_TYPES.split(","),
  },
});
