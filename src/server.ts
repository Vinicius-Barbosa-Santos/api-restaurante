import "express-async-errors";
import express from "express";
import { router } from "./routes";
import { errorHandling } from "./middlewares/errorHandling";

const app = express();
app.use(express.json());

app.use(router);
app.use(errorHandling);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
