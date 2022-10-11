//Project imports
import elementDAO from "../../src/utils/database-utils/DAOs/element-dao";

const elements = new elementDAO();

//API
export default async function handler(request, response) {
  const { method, body } = request;

  if (method === "GET") {
    try {
      response.status(200).json({
        status: 200,
        method: request.method,
        response: (await elements.getAll()) || {},
      });
    } catch (error) {
      response.status(500).json({
        status: 500,
        method: request.method,
        response: `Error: ${error}`,
      });
    }
  }

  if (method === "POST") {
    try {
      const newElement = await elements.save(body);
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
      await elements.deleteAll();
      response.status(200).json({
        status: 200,
        method: request.method,
        response: "Elementos eliminados",
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
