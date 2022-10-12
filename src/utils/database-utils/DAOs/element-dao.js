//Project imports
import { times } from "lodash";
import DAO from ".";
import elementSchema from "../schemas/elementSchema";
import { uniqueIndex } from "../hexcode";

export default class elementDAO extends DAO {
  constructor() {
    super("Element", elementSchema);
  }

  //*-------------------------------- OVERRIDES----------------------------------------
  async save(document) {
    try {
      //Create a unique index using the uniqueIndex function and a checker function
      const checkerCallback = async (indexToCheck) => {
        return await this.model.findOne({
          identificador: indexToCheck,
        })
      }
      const index = await uniqueIndex(checkerCallback)

      //Push the index into the document
      document = { identificador: index, ...document }

      // Create the document and retrieve it
      const element = await this.model.create(document)

      //Fill the parent field in the children
      this.addParentToChildren(index)

      return element

    } catch (error) {
      console.log(
        `No se pudo crear el documento en ${this.schemaName}. ${error}`
      )
      throw new Error(error)
    }
  }

  async updateById(index, newDocument) {
    try {
      //Delete the parent field from the children
      this.deleteParentFromChildren(index)

      // Update the element
      await this.model.updateOne(
        { identificador: index },
        { ...newDocument, fechaModificación: new Date() },
        { upsert: true }
      )

      //Fill the parent field in the children
      this.addParentToChildren(index)

      return `Elemento ${index} actualizado correctamente`
    } catch (error) {
      console.log(
        `No se pudo actualizar el elemento ${this.schemaName}: ${index}. ${error}`
      )
      throw new Error(error)
    }
  }

  async deleteById(index) {
    try {
      //Fill the parent field in the children
      this.deleteParentFromChildren(index)

      //Delete element
      await this.model.deleteOne({ identificador: index })
    } catch (error) {
      console.log(
        `No se pudo eliminar el elemento ${this.schemaName}: ${index}. ${error}`
      )
      throw new Error(error)
    }
  }

  //*-------------------------------- COMMENTS METHODS---------------------------------

  async getAllComments(elementIndex) {
    try {
      const element = await this.getById(elementIndex);
      return element.comentarios;
    } catch (error) {
      console.log(
        `No se pudieron obtener los comentarios del elemento ${element.nombre}. ${error}`
      );
      throw new Error(error);
    }
  }

  async saveComment(elementIndex, comment) {
    try {
      //Create a unique index using the uniqueIndex function and a checker function
      const checkerCallback = async (indexToCheck) => {
        return await this.model.findOne(
          { "comentarios.identificador": indexToCheck },
          { "comentarios.$": 1 }
        );
      };
      const commentIndex = await uniqueIndex(checkerCallback);

      //Push the index into the comment
      comment = { identificador: commentIndex, ...comment };

      await this.model.updateOne(
        { identificador: elementIndex },
        { $push: { comentarios: comment } }
      )
      return await this.getCommentById(commentIndex)
    } catch (error) {
      console.log(
        `No se pudo guardar el comentario en el elemento ${element.nombre}. ${error}`
      );
      throw new Error(error);
    }
  }

  async deleteAllComments(elementIndex) {
    try {
      return (await this.updateById(elementIndex, { comentarios: [] }))
    } catch (error) {
      console.log(
        `No se pudieron eliminar los comentarios del elemento ${elementIndex}. ${error}`
      );
      throw new Error(error);
    }
  }

  async getCommentById(commentIndex) {
    try {
      return await this.model.findOne(
        { "comentarios.identificador": commentIndex },
        { "comentarios.$": 1 }
      );
    } catch (error) {
      console.log(`No se pudo obtener el comentario ${commentIndex}. ${error}`);
      throw new Error(error);
    }
  }

  async updateCommentById(commentIndex, comment) {
    try {
      const { comentario } = comment
      return await this.model.updateOne(
        { "comentarios.identificador": commentIndex },
        { "comentarios.$.comentario": comentario },
        { upsert: false }
      );
    } catch (error) {
      console.log(
        `No se pudo actualizar el comentario ${commentIndex}. ${error}`
      );
      throw new Error(error);
    }
  }

  async deleteCommentById(elementIndex, commentIndex) {

    try {
      return await this.model.updateOne(
        { identificador: elementIndex },
        {
          $pull: { comentarios: { identificador: commentIndex } },
        });
    } catch (error) {
      console.log(
        `No se pudo eliminar el comentario ${commentIndex}. ${error}`
      );
      throw new Error(error);
    }

  }

  //*-------------------------------- CHILDREN METHODS---------------------------------

  async getAllChildren(elementIndex) {
    try {
      return await this.model.find({ elementoPadre: elementIndex })
    } catch (error) {
      console.log(`No se pudieron extraer los elementos hijos de ${elementIndex}. ${error}`)
      throw new Error(error);
    }
  }

  async addParentToChildren(elementIndex) {
    try {
      const childrenIndexArray = await this.model.findOne({ identificador: elementIndex })
      if (!childrenIndexArray) return
      await this.model.updateMany({ identificador: { $in: childrenIndexArray } }, { elementoPadre: elementIndex })
    } catch (error) {
      console.log(`No se pudieron actualizar los elementos hijo de ${elementIndex}. ${error}`)
    }
  }

  async deleteParentFromChildren(elementIndex) {
    try {
      const childrenIndexArray = await this.model.findOne({ identificador: elementIndex })
      if (!childrenIndexArray) return
      await this.model.updateMany({ identificador: { $in: childrenIndexArray } }, { $unset: { elementoPadre: '' } })
    } catch (error) {
      console.log(`No se pudieron eliminar los elementos hijos de ${elementIndex}. ${error}`)
    }
  }

}
