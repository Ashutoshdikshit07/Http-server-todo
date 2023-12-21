const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
  
app.use(bodyParser.json());
  
module.exports = app;

var storage =[{
  id :'1',
  title : 'Buy Groceries',
  completed :'False',
  description : 'I should buy groceries'

},
{
  id :'2',
  title : 'Study cohort week 2',
  completed :'False',
  description : 'I should study and complete assignments'
}]



app.get('/todos', function(req, res) {
  res.send(storage)
})

app.get('/todos/:id', function(req, res) {

  const taskId = req.params.id;
  let taskToUpdate = storage.find(task => task.id === taskId); 
  if (!taskToUpdate) {
    return res.status(404).send('Task not found');
  }

  res.status(200).send({ message: 'Task Retreived successfully', taskToUpdate });
 
})

app.post('/todos', function(req, res) {
  

  // const newTask = {                                       // One way to do it using req.headers also you can send a json using body
  //   id : (storage.length+1).toString(),
  //   title:req.headers['title'],
  //   completed:req.headers['completed'],
  //   description:req.headers['description']
  // }

  const newTask = {
    id:(storage.length+1).toString(),
    title:req.body['title'],
    completed:req.body['completed'],
    description:req.body['description']
  }
  storage.push(newTask)

  res.status(201).send({id:newTask['id']})
})

app.put('/todos/:id', function(req, res) {

  const taskId = req.params.id;

  let taskToUpdate = storage.find(task => task.id === taskId);  //instead of for loop used before to iterate use the find method.
  if (!taskToUpdate) {
    return res.status(404).send('Task not found');
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


  res.status(200).send({ message: 'Task updated successfully', data: taskToUpdate });
})

app.delete('/todos/:id', function(req, res) {
  
  
  const taskId = req.params.id;

   // Find the index of the task with the specified id
  const taskIndex = storage.findIndex(task => task.id === taskId);
  
  // Check if the task was not found
  if (taskIndex === -1) {
    return res.status(404).send('Task not found');

  }
  const deletedTask = storage.splice(taskIndex, 1)[0];
  res.status(200).send({ message: 'Task deleted successfully', data: deletedTask });
})


app.listen(port, function() {

  console.log(`Example app listening on port ${port}`)
})