import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/freelancer/MyProjects.css'

const MyProjects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      const pros = response.data.filter(
        pro => pro.freelancerId === localStorage.getItem('userId')
      );
      setProjects(pros);
      setDisplayProjects([...pros].reverse());
    } catch (err) {
      console.log(err);
      fetchProjects();
    }
  };

  const handleFilterChange = (value) => {
    if (value === "") {
      setDisplayProjects([...projects].reverse());
    } 
    else if (value === "In Progress") {
      setDisplayProjects(
        projects.filter(p => p.status === "Assigned").reverse()
      );
    } 
    else if (value === "Completed") {
      setDisplayProjects(
        projects.filter(p => p.status === "Completed").reverse()
      );
    }
  };

  return (
    <div className="my-projects-page">

      <div className="my-projects-list">

        <div className="my-projects-header">
          <h3>My Projects</h3>

          <select className="form-control"
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">Choose Project Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <hr />

        {displayProjects.map((project) => (
          <div
            className="listed-project"
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <div className="listed-project-head">
              <h3>{project.title}</h3>
              <p>{project.postedDate}</p>
            </div>

            <h5>Budget -  ₹ {project.budget}</h5>
            <p>{project.description}</p>

            <div className="bids-data">
              <h6>Status - {project.status}</h6>
            </div>

            <hr />
          </div>
        ))}

      </div>

    </div>
  );
};

export default MyProjects;
