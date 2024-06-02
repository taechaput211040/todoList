const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let todo = [];

// GET all todo
app.get("/todo", (req, res) => {
  res.json(todo);
});

// GET single todo
app.get("/todo/:id", (req, res) => {
  const todo = todo.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("not found");
  }
});

// POST new todo
app.post("/todo", (req, res) => {
  const todo = {
    id: todo.length + 1,
    title: req.body.title,
  };
  todo.push(todo);
  res.status(201).json(todo);
});

// PUT update existing todo
app.put("/todo/:id", (req, res) => {
  const index = todo.findIndex((t) => t.id === parseInt(req.params.id));
  if (index >= 0) {
    todo[index] = { ...todo[index], ...req.body };
    res.json(todo[index]);
  } else {
    res.status(404).send("not found");
  }
});

// DELETE a todo
app.delete("/todo/:id", (req, res) => {
  const index = todo.findIndex((t) => t.id === parseInt(req.params.id));
  if (index >= 0) {
    todo = todo.filter((t) => t.id !== parseInt(req.params.id));
    res.status(200).send("Deleted!!!");
  } else {
    res.status(404).send("not found !!!");
  }
});

app.listen(port, () => {
  console.log(`Todo List API server listening at http://localhost:${port}`);
});
