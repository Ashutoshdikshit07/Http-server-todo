const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3002;
  
app.use(bodyParser.json());
  
module.exports = app;


// storage is a array used as a database. 
// var storage =[{
//   id :'1',
//   title : 'Buy Groceries',
//   completed :'False',
//   description : 'I should buy groceries'

// },
// {
//   id :'2',
//   title : 'Study cohort week 2',
//   completed :'False',
//   description : 'I should study and complete assignments'
// }]

var storage=[]

// it shows all the todo items present in the array
app.get('/todos', function(req, res) {
  res.json(storage)
})

//it fetches a specific item from the array if present
app.get('/todos/:id', function(req, res) {

  const taskId = req.params.id;
  let taskToUpdate = storage.find(task => task.id === taskId); 
  if (!taskToUpdate) {
    return res.status(404).send('Task not found');
  }

  res.status(200).json(taskToUpdate);
 
})

//it adds a new todo item to the array storage
app.post('/todos', function(req, res) {

  const newTask = {
    id:(storage.length+1).toString(),
    title:req.body['title'],
    completed:req.body['completed'],
    description:req.body['description']
  }
  storage.push(newTask)

  res.status(201).json(newTask)
})

// it helps us to update a specific todo item like mark it as complete
app.put('/todos/:id', function(req, res) {

  const taskId = req.params.id;

  let taskToUpdate = storage.find(task => task.id === taskId);  //instead of for loop used before to iterate use the find method.
  if (!taskToUpdate) {
    return res.status(404).send('Task not found!!');
  }

  if (req.body.title) {
    taskToUpdate.title = req.body.title;
  }
  if (req.body.completed) {
    taskToUpdate.completed = req.body.completed;
  }
  if (req.body.description) {
    taskToUpdate.description = req.body.description;
  }


  res.status(200).json(taskToUpdate );
})


//It deletes the item from the list
app.delete('/todos/:id', function(req, res) {
  
  
  const taskId = req.params.id;

   // Find the index of the task with the specified id
  const taskIndex = storage.findIndex(task => task.id === taskId);
  
  // Check if the task was not found
  if (taskIndex === -1) {
    return res.status(404).send('Task not found');

  }
  const deletedTask = storage.splice(taskIndex, 1);
  res.status(200).send({ message: 'Task deleted successfully', data: deletedTask });
})

app.use((req, res, next) => {
    res.status(404).send();
  });

app.listen(port, function() {

  console.log(`Example app listening on port ${port}`)
})