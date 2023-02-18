const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

// Create a local array to store student data
let students = [  
    { id: 1 , name: 'Alejandro', email: 'alejandro@example.com', password: '1234' },  
    { id: 2 , name: 'Gustavo', email: 'gustavo@example.com', password: '12344' },  
    { id: 3 , name: 'Kevin', email: 'kevin@example.com', password: '12346' },  
    { id: 4 , name: 'Salvador', email: 'salvadroexample.com', password: '12347' },  
    { id: 5 , name: 'Derek', email: 'derek@example.com', password: '12344' }];

    // Generate a unique id for new students
function generateId() {
    return students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
  }
  
  // Insert a new student with hashed password 
  app.post('/insert', (req, res) => {
    const { name, email, password } = req.body;
    const id = generateId();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newStudent = { id, name, email, password: hashedPassword };
    students.push(newStudent);
    res.status(201).json(newStudent);
  });
  
  // Update a student
  app.put("/putuser", function(req, res){
    students[0]= req.body;
    res.send(students);
});
  // Endpoint to delete a student by ID
  app.delete("/delete", function(req, res){
    students.splice(1, 1);
    res.json(students)
});
  
  // Endpoint to show all the students 
  app.get('/getall', (req, res) => {
    res.json(students);
  });

  // Endpoint to show one specific student by name
app.get('/get', (req, res) => {
    const student = students.find(s => s.name === parseInt(req.params.name));
    if (student) {
      res.json(student);
    }
  });

  // Endpoint to login with email and password and use it with a new insert for the hash
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const student = students.find(s => s.email === email);
    if (student) {
      const passwordMatch = await bcrypt.compare(password, student.password);
      if (passwordMatch) {
        res.send('Login successful');
      } else {
        res.status(401).send('Invalid email or password');
      }
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
  
  
  const Port = 3000

app.listen(Port, ()=>{
    //console.log("App is running on port:" + Port)
    console.log(`App is running on port: ${Port}`)
});