//Third party imports
import mongoose from 'mongoose';

//Project import
import index, { validator } from '../hexcode';
import commentSchema from './commentSchema';

const { Schema } = mongoose;

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
    tipo: {
        type: String,
        enum: process.env.ELEMENT_TYPES.split(','),
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripción: {
        type: String,
    },
    cantidad: {
        type: Number,
        min: 1,
        required: true,
        default: 1,
    },
    elementoPadre: {
        type: String,
        index: true,
        uppercase: true,
        validate: {
            validator: validator,
            message: 'Elemento padre no es válido'
        }
    },
    elementosHijos: {
        type: [String]
    },
    estado: {
        type: String,
        enum: process.env.ELEMENT_STATUS.split(','),
        default: 'Activo',
        required: true,
    },
    nivelDeCriticidad: {
        type: String,
        enum: process.env.ELEMENT_CRITICALITY_LEVEL.split(','),
    },
    nivelDeMantenimiento: {
        type: String,
        enum: process.env.ELEMENT_MAINTENANCE_LEVELS.split(','),
    },
    proovedor: {
        type: String,
        enum: process.env.ELEMENT_PROVIDERS.split(','),
    },
    skuProovedor: {
        type: String
    },
    fabricante: {
        type: String
    },
    linkDocumentacion: {
        type: String
    },
    fechaCreación: {
        type: Date,
        default: Date.now,
        required: true
    },
    fechaModificación: {
        type: Date,
        default: Date.now,
        required: true
    },
    actividades: {
        type: [String]
    },
    paradas: {
        type: [String]
    },
    insumos: {
        type: [String]
    },
    comentarios: {
        type: [commentSchema],
    }
});