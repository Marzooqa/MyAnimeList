import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let array = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/view", (req, res) => {
  res.render("view.ejs", { array: array });
});
app.post("/submit", (req, res) => {
  array.push({
    name: req.body["name"],
    genre: req.body["genre"],
    url: req.body["url"],
    rating: req.body["rating"],
  });
  res.redirect("/view");
});

app.post("/delete/:index", (req, res) => {
  const index = req.params.index;
  array.splice(index, 1);
  res.redirect("/view");
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  //   console.log(array[index]);
  res.render("edit.ejs", { element: array[index], index: index });
});

app.post("/change/:index", (req, res) => {
  const index = req.params.index;
  array[index] = {
    name: req.body["name"],
    genre: req.body["genre"],
    url: req.body["url"],
    rating: req.body["rating"],
  };
  res.redirect("/view");
});

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
