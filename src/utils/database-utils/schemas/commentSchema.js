//Third party imports
import mongoose from "mongoose";

const { Schema } = mongoose;

//Project import
import index, { validator } from '../hexcode';

export default new Schema({
    identificador: {
        type: String,
        index: true,
        unique: true,
        required: true,
        uppercase: true,
        default: index(),
        immutable: true,
        validate: {
            validator: validator,
            message: 'Identificador no es un código hexadecimal'
        }
    },
    usuario: {
        type:String
    },
    comentario: {
        type: String,
        required: true

    },
    fecha: {
        type: Date,
        default: Date.now,
        required: true
    },
    adjuntos: {
        type:[String]
    },
    tipo: {
        type: String,
        enum: process.env.COMMENT_TYPES.split(','),
    }
});