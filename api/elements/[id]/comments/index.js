//Project imports
import elementDAO from "../../../../src/utils/database-utils/DAOs/element-dao";

const elements = new elementDAO();

//API
export default async function handler(request, response) {
    const { method, body, query } = request;
    const {id} = query


    // Get all comments from one element based on the identificador field
    if (method === "GET") {
        try {
            response.status(200).json({
                status: 200,
                method: request.method,
                response: (await elements.getAllComments(id)) || {},
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                method: request.method,
                response: `Error: ${error}`,
            });
        }
    }

    // Post a new comment to an element
    if (method === "POST") {
        try {
            response.status(200).json({
                status: 200,
                method: request.method,
                response: (await elements.saveComment(id,body)) || {},
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                method: request.method,
                response: `Error: ${error}`,
            });
        }
    }

    //Delete all comments from one element based on the identificador field
    if (method === "DELETE") {
        try {
            await elements.deleteAllComments(id);
            response.status(200).json({
                status: 200,
                method: request.method,
                response: `Los comentarios del elemento ${id} han sido eliminados`,
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                method: request.method,
                response: `Error: ${error}`,
            });
        }
    }
}
