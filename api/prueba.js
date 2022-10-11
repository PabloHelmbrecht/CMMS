export default function handler(request, response) {
    response.status(200).json({
        body: request.body,
        query: request.query,
        cookies: request.cookies,
        method: request.method,
        status: request.status,
        otro: JSON.stringify(request)
    });
}