//Project imports
import elementDAO from "../../src/utils/database-utils/DAOs/element-dao";

const elements = new elementDAO()

//API
export default async function handler(request, response) {
  response.status(200).json({
    status: 200,
    method: "GET",
    response: await elements.getAll()||{},
  });
}