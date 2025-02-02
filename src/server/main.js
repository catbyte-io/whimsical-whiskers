import express from "express";
import ViteExpress from "vite-express";

const app = express();

const server = app.listen(3000, "0.0.0.0", () =>
  console.log("Server is listening...")
);

ViteExpress.bind(app, server);
