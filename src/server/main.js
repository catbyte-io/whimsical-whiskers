import express from "express";
import ViteExpress from "vite-express";
import nunjucks from 'nunjucks';

import { characters } from "./calls";

const app = express();

// Configure app to use nunjucks for templating
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));

const server = app.listen(3000, "0.0.0.0", () =>
  console.log("Server is listening...")
);

ViteExpress.bind(app, server);

// Routes
app.get('/', (req, res) => {
  res.render('index.njk', 
    { characters },
  );
});
