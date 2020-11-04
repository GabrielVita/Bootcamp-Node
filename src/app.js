const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const requestsPerId = {};
function countRequest(request, response, next) {
  const { id } = request.params;
  if (requestsPerId[id]) {
    requestsPerId[id] += 1;
  } else {
    requestsPerId[id] = 1;
  }
  next();
}

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs };

  repositories.push(repository);

  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesIndex = repositories.findIndex(
    (project) => project.id == id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }
  const repository = {
    id,
    title,
    url,
    techs,
  };
  repositories[repositoriesIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (project) => project.id == id
  );

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }
  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", countRequest, (request, response) => {
  const { id } = request.params;

  const likes = requestsPerId[id] || 0;

  return response.json({
    likes: likes,
  });
});

module.exports = app;
