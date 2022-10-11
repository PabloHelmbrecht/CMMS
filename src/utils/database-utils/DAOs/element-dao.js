//Project imports
import { times } from "lodash";
import DAO from ".";
import elementSchema from "../schemas/elementSchema";
import { uniqueIndex } from "../hexcode";

export default class elementDAO extends DAO {
  constructor() {
    super("Element", elementSchema);
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

      //Get the element and push the comment
      const element = await this.getById(elementIndex);
      element.comentarios.push(comment);

      // Return the element with the new comment
      return await this.updateById(elementIndex, element);
    } catch (error) {
      console.log(
        `No se pudo guardar el comentario en el elemento ${element.nombre}. ${error}`
      );
      throw new Error(error);
    }
  }

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

  async updateCommentById(commentIndex, newText) {
    try {
      return await this.model.update(
        { "comentarios.identificador": commentIndex },
        {  $set: {"comentarios.$.comentario": abc} },
        { upsert: false }
      );
    } catch (error) {
      console.log(
        `No se pudo actualizar el comentario ${commentIndex}. ${error}`
      );
      throw new Error(error);
    }
  }

  async deleteCommentById() {}

  async deleteAllComments() {}

  async getChildren() {}
}
