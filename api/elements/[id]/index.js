//Project imports
import elementDAO from "../../../src/utils/database-utils/DAOs/element-dao";

const elements = new elementDAO();

//API
export default async function handler(request, response) {
    const { method, body, query } = request;
    const {id} = query

    if (method === "GET") {
        try {
            response.status(200).json({
                status: 200,
                method: request.method,
                response: (await elements.getById(id)) || {},
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                method: request.method,
                response: `Error: ${error}`,
            });
        }
    }

    if (method === "PATCH") {
        try {
            const newElement = await elements.updateById(id,body);
            response.status(200).json({
                status: 200,
                method: request.method,
                response: newElement || {},
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                method: request.method,
                response: `Error: ${error}`,
            });
        }
    }

    if (method === "DELETE") {
        try {
            await elements.deleteById(id);
            response.status(200).json({
                status: 200,
                method: request.method,
                response: `Elemento ${id} eliminado`,
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
