const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();
const { adicionar, contar } = require('./repositories/:id/like');
app.use(adicionar);

app.use(express.json());
app.use(cors());

function countRequest (resquest, response, next){
  const adicionar = async (req, res, next) => {
    contador += 1;
    next();
  };
  
  const contar = () => {
    return contador;
  };
  
  module.exports = {
    adicionar,
    contar,
  };
}

const contador = 0;



const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

    const project = {id: uuid(), title, url, techs};

    projects.push(project);

    return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
    const {title, url, techs} = request.body;

    const repositoriesIndex = repositories.findIndex(project => project.id == id);

    if(repositoriesIndex < 0){
        return response.status(400).json({error : 'Project not found.'})
    }
    const repositorie ={
        id,
        title,
        url,
        techs,
    };
    repositories[repositoriesIndex] = repositorie;

    return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

    const repositoriesIndex = repositories.findIndex(project => project.id == id);

    if(repositoriesIndex < 0){
        return response.status(400).json({error : 'Project not found.'})
    }
    repositories.splice(repositoriesIndex, 1);


    return response.status(204).send();
});

app.post("/repositories/:id/like", countRequest, (request, response) => {
    return contar;
});

module.exports = app;
