//Third party imports
import mongoose from "mongoose";

//Project imports
import { uniqueIndex } from "../hexcode"


mongoose.connect(process.env.MONGODB_URI)
    .then((connection) => {
        console.log("connection successful")
    })
    .catch((error) => {
        console.log(`Error en la conexión a la base de datos ${error}`)
    })

export default class DAO {
    constructor(schemaName, schema) {
        this.schemaName = schemaName
        this.schema = schema
        this.model = mongoose.model(this.schemaName, this.schema);
    }

    async save(document) {
        try {

            //Create a unique index using the uniqueIndex function and a checker function
            const checkerCallback = async (indexToCheck) => {
                return (await this.model.findOne(
                    { 'identificador': indexToCheck }
                ))
            }
            const index = uniqueIndex(checkerCallback)

            //Push the index into the document
            document = { identificador: index, ...document }

            // Create the document and return it
            return (await this.model.create(document))

        } catch (error) {
            console.log(`No se pudo crear el documento en ${this.schemaName}. ${error}`)
        }

    }

    async getAll() {
        try {
            return (await this.model.find({}))
        } catch (error) {
            console.log(`No se pudieron extraer los elementos ${this.schemaName}. ${error}`)
        }
    }

    async getById(index) {
        try {
            return (await this.model.findOne({ identificador: index }))
        } catch (error) {
            console.log(`No se pudo extraer el elemento ${this.schemaName}: ${index}. ${error}`)
        }
    }

    async updateById(index, newDocument) {
        try {
            return (await this.model.updateOne({ identificador: index }, newDocument))
        } catch (error) {
            console.log(`No se pudo actualizar el elemento ${this.schemaName}: ${index}. ${error}`)
        }
    }

    async deleteById(index) {
        try {
            await this.model.deleteOne({ identificador: index });
        } catch (error) {
            console.log(`No se pudo eliminar el elemento ${this.schemaName}: ${index}. ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({})
        } catch (error) {
            console.log(`No se pudieron eliminar los elementos en ${this.schemaName}. ${error}`)
        }
    }

}

