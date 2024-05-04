const Faculty = require("../models/Faculty");
 const Grade = require("../models/Grade");
const Assignment = require("../models/Assignment")
const multer = require('multer')

const checkfacultylogin = async (request, response) => {
  try {
    const input = request.body;
    const faculty = await Faculty.findOne(input);
    response.json(faculty);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const facultyprofile = async (request, response) => {
  try {
    const email = request.params.email;
    const faculty = await Faculty.findOne({ email });
    if (faculty) {
      response.json(faculty);
    } else {
      return response.status(404).send('Faculty not found with the provided email id');
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const updatefacultyprofile = async (request, response) => {
  try {
    const input = request.body;
    const email = input.email; 
    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return response.status(404).send('Faculty not found with the provided email id');
    }
    for (const key in input) {
      if (key !== 'email' && input[key]) {
        faculty[key] = input[key];
      }
    }
    await faculty.save();
    response.status(200).send('Faculty Profile Updated Successfully');
  } catch (error) {
    response.status(500).send(error.message);
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});
const upload = multer({ storage: storage }).single('file');

const postassignment = async (req, res) => {
try 
    {
      upload(req, res, async function (err) 
      {
        if (err) 
        {
          console.error(err);
          return res.status(500).send(err.message);
        }
        
        const { name, coursetitle, coursecode, deadline  } = req.body;
        const fileName = req.file ? req.file.filename : undefined; // Extracting file name
  
        const newAssignment = new Assignment({
          name,
          coursetitle,
          coursecode,
          deadline,
          file: fileName // Save only the file name
        });
  
        await newAssignment.save();
        res.status(200).send('Assignment Posted Successfully');
      });
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).send(error.message);
    }
};

const viewassignment = async (request, response) => {
try {
  const assignment = await Assignment.find();
  if (assignment.length == 0) {
    response.send("DATA NOT FOUND");
  } else {
    response.json(assignment);
  }
} catch (error) {
  response.status(500).send(error.message);
}
};
 
const assignmentfile = async (req, res) => 
{
const filename = req.params.filename;
const filepath = path.join(__dirname, '../media', filename);
console.log(filepath)

  fs.readFile(filepath, (err, data) => {
    if (err) 
    {
      console.error(err);
      return res.status(500).send('Error reading image file');
    }
   
  const ext = path.extname(filename).toLowerCase();
  let contentType = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
contentType = 'image/jpeg';
} else if (ext === '.pdf') {
contentType = 'application/pdf';
} else if (ext === '.txt') {
contentType = 'text/plain';
}

  res.setHeader('Content-Type', contentType);
    res.send(data);
  })
}



const changeFacultypwd = async (request, response) => {
  try 
  {
    const { username, oldpassword, newpassword } = request.body;

    const student = await Faculty.findOne({ username, password: oldpassword });
    
     if (!student) 
    {
      response.status(400).send('Invalid Old Password');
    }
    else
    {
        if(oldpassword==newpassword)
        {
          response.status(400).send('Both Passwords are Same');
        }
        else
        {
          await Faculty.updateOne({username},{ $set: { password: newpassword } });
           response.json('Password Updated Successfully');
        }
      
    }
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};












module.exports = { checkfacultylogin, changeFacultypwd,facultyprofile,updatefacultyprofile, postassignment, viewassignment, assignmentfile,    };