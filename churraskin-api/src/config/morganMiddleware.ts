import morgan from "morgan";
import logger from "./logger";

const stream = {
  write: (message: any) => logger.http(message),
};

export default morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream }
);
