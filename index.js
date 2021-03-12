// variables
const express = require("express");
//const students = require("./db/students");
const app = express();
var cors = require("cors");
let student = require("./db/students");

// process.env.PORT
const PORT = process.env.PORT || "3000";

// middleware
app.use(express.json()); // so that postman can send data over!
app.use(cors());

// deconstruct 


// GET Request
app.get("/", (req, res) => {
  res.send(student);
});

// POST Request
app.post("/", (req, res) => {
  const { id, name, company, role, linkedin, picture } = req.body;
  if (!id || !name || !company || !linkedin || !picture || !role) {
    return res.status(400).json({
      error: "name, company, linkedin, picture, and role are all required",
    });
  }
  console.log(req.body);
  students.push(req.body);
  res.status(200).json({ status: "Success" });
});

// DELETE Request => body {id}
app.delete("/", (req, res) => {
  const { id } = req.body; // or req.body.id works

  student = student.filter((students) => students.id !== id);
  res.status(200).json({ status: "Success" });
});

// UPDATE Request =>
app.put("/", (req,res) => {
  const students = student.find(student => student.id === req.body.id);
  if(!students) res.status(404).send("The person is not found");
  
  // update course
  students.name = req.body.name;
  students.role = req.body.role;
  students.company = req.body.company;
  students.picture = req.body.picture;
  students.linkedin = req.body.linkedin;
  res.send(student);
});

// port to open
app.listen(PORT, () => console.log(`Success! Listening on port: ${PORT}`));