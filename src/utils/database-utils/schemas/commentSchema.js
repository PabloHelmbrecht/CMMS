//Third party imports
import mongoose from "mongoose";

//Project import
import index, { validator } from "../hexcode";

const { Schema } = mongoose;

export default new Schema({
  identificador: {
    type: String,
    index: true,
    unique: false,
    required: true,
    uppercase: true,
    default: index(),
    immutable: true,
    validate: {
      validator: validator,
      message: "Identificador no es un código hexadecimal",
    },
  },
  usuario: {
    type: String,
    default: 'Anónimo'
  },
  comentario: {
    type: String,
    required: true,
  },
  fechaCreación: {
    type: Date,
    default: Date.now,
    required: true,
  },
  fechaModificación: {
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
