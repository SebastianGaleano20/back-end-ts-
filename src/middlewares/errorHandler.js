import HTTP_STATUS from "../helpers/httpStatus";

const ERROR_HANDLERS = {
    sqlError: (response, error) => {
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Database error: ${error.message}`
      });
    },
    genericError: (response, error) => {
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: `Internal Server Error: ${error.message}`
      });
    },
    defaultError: (response, error) => {
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      });
    }
  };
  
const errorHandler = (error, _request, response, _next) => {
    console.error('Error handler:', error);
  
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  
    handler(response, error);
};
  
export default errorHandler;