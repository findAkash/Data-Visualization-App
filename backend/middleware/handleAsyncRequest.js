class APIResponse {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleAsyncRequest = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res, next);

    if (!res.headersSent) {
      if (result instanceof APIResponse) {
        res.status(200).send(result);
      } else {
        res
          .status(200)
          .send(new APIResponse(true, 'Operation successful', result));
      }
    }
  } catch (e) {
    console.error('Error:', e);

    if (!res.headersSent) {
      if (e instanceof APIError) {
        res.status(e.statusCode || 500).send(new APIResponse(false, e.message));
      } else {
        res.status(500).send(new APIResponse(false, 'Internal Server Error'));
      }
    }

    next(e); // Ensure the error is properly propagated
  }
};

module.exports = { APIError, APIResponse, handleAsyncRequest };
