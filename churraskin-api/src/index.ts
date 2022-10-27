import bodyParser from "body-parser";
import express, {
  ErrorRequestHandler,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import path from "path";
import HttpError from "./domain/http-error";
import logger from "./config/logger";
import database from "./database";
import appRouter from "./router";
import morgan from "morgan";
import morganMiddleware from "./config/morganMiddleware";

const PORT = process.env.PORT || 8000;

database();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
// Adicionando middleware de log
app.use(morganMiddleware);
app.use(appRouter);

const errorHandler: ErrorRequestHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("socando erro no log:", err);
  let msg = "Algo aconteceu de errado, tente novamente mais tarde.";

  if (err.msg) {
    msg = err.msg;
  }
  if (err.statusCode) {
    res.status(err.statusCode);
  } else {
    res.status(500);
  }

  res.json({
    msg,
  });
};

// Adicionando handler para erros
app.use(errorHandler);

// inciando o servidor
app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
