const express = require('express');
const fs = require("fs");
const dbFile = fs.readFileSync(`${__dirname}/../db.json`, {encoding:"utf-8"});
const dbData = JSON.parse(dbFile);
let todos = dbData.todos;

// create server
const app = express();
// allow us to read json body
app.use(express.json());


// GET
app.get("/", (req,res)=>{
   res.send("Todo app");
});

// GET /todos
app.get("/todos", (req,res)=>{
    res.send(todos);
});

// GET single /todo/:id
app.get("/todos/:id", (req,res)=>{
    let {id} = req.params;
    let todo = todos.find((t)=> t.id === Number(id));
    if(!todo){
        res.send(404).send(`No product found with id ${id}`);
    }
    res.send(todo);
});

// DELETE /todo/:id
app.delete("/todo/:id", (req, res)=>{
    let {id} = req.params;
    let index = todos.findIndex((t)=> t.id === Number(id));
    todos.splice(index,1)
    res.send(todos);
})

// POST /todos
app.post("/todos", (req, res)=>{
    todos.push(req.body);
    res.send("Data successfully added")
});

// PATCH /todos
app.patch("/todos/:id", (req, res)=>{
    let {id} = req.params;
    todos = todos.map((t)=>{
        if(t.id === Number(id)){
            return {
                ...t, ...req.body
            }
        }else{
            return t;
        }
    });
    res.send("Data updated successfully")
})


app.listen(8050, ()=>{
    console.log('listening on port 8050');
});

