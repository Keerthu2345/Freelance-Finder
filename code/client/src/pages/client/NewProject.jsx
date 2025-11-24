import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../../styles/client/newProject.css'


const NewProject = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [skills, setSkills] = useState('');
    const [deadline, setDeadline] = useState('');

    const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const response = await axios.post(
      "http://localhost:6001/new-project",
      {
        title,
        description,
        budget,
        skills,
        deadline,
        clientId: localStorage.getItem("userId"),
        clientName: localStorage.getItem("username"),
        clientEmail: localStorage.getItem("email"),
      },
      config
    );

    alert("New project added!!");
    setTitle("");
    setDescription("");
    setBudget(0);
    setSkills("");
    setDeadline("");   
    navigate("/client");

  } catch (err) {
    console.log(err.response?.data?.msg || err.message);
    alert("Operation failed!!");
  }
};


  return (
    <div className="new-project-page">

          <h3>Post new project</h3>

          <div className="new-project-form">

              <div className="form-floating">
                <input type="text" className="form-control mb-3" id="floatingPassword" placeholder="Password" onChange={(e)=>setTitle(e.target.value)} />
                <label htmlFor="floatingPassword">Project title</label>
              </div>

              <div className="form-floating">
                <textarea type="text" className="form-control mb-3" id="floatingPassword" placeholder="Password"  onChange={(e)=>setDescription(e.target.value)}/>
                <label htmlFor="floatingPassword">Description</label>
              </div>

              <span>
  <div className="form-floating">
    <input
      type="number"
      className="form-control mb-3"
      id="budgetInput"
      placeholder="Budget"
      onChange={(e) => setBudget(e.target.value)}
    />
    <label htmlFor="budgetInput">Budget (in ₹)</label>
  </div>

  <div className="form-floating">
    <input
      type="date"
      className="form-control mb-3"
      id="deadlineInput"
      onChange={(e) => setDeadline(e.target.value)}
    />
    <label htmlFor="deadlineInput">Deadline</label>
  </div>

  <div className="form-floating">
    <input
      type="text"
      className="form-control mb-3"
      id="skillsInput"
      placeholder="Skills"
      onChange={(e) => setSkills(e.target.value)}
    />
    <label htmlFor="skillsInput">Required skills (seperate each with ,)</label>
  </div>
</span>

              <button className='btn' onClick={handleSubmit} >Submit</button>

          </div>

    </div>
  )
}

export default NewProject