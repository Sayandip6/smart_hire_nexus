import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById, applyToJob } from '../services/api';
import './JobDetails.css';
import background from "../components/assets/gradiant.jpg";
import Navbar from "../components/navigation/Navbar";

const JobDetails = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getJobById(jobId);
        setJob(response.data);
      } catch (err) {
        setError('Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) return <div className="job-details-loading">Loading...</div>;
  if (error) return <div className="job-details-error">{error}</div>;
  const applyJob = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please log in to apply for jobs');
      navigate('/login');
      return;
    } else if (user.role === 'admin') {
      alert('Admins cannot apply for jobs');
      return;
    }
    try {
      const response = await applyToJob(id);
      alert(response.data.message);
    } catch (err) {
      alert('Failed to apply for job');
    }
  };
  return (
    <div className={`nav-contente ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="job-details-background">
        <img src={background} alt="Background" className="background-image" />
        <div className="job-details-container">
          {job && (
            <>
              {/* Job Header */}
              <div className="job-header">
                <img src={job.image} alt={job.title} className="job-image" />
                <div>
                  <h1 className="job-title">{job.title}</h1>
                  <p className="job-company">{job.company}</p>
                  <p className="job-location">{job.location} ({job.city})</p>
                  <p className="job-type">Type: {job.type}</p>
                </div>
              </div>

              {/* Salary */}
              <div className="job-salary">
                💰 Salary: <strong>{job.salaryMin} - {job.salaryMax} INR</strong>
              </div>

              {/* Description */}
              <div className="job-description">
                <h3>Job Description</h3>
                <p>{job.description}</p>
              </div>

              {/* Requirements */}
              <div className="job-requirements">
                <h3>Requirements</h3>
                <ul>
                  {job.requirements && job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Metadata */}
              <div className="job-meta">
                <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(job.updatedAt).toLocaleString()}</p>
              </div>
              <div className="job-footer">
                <button className="apply-button" onClick={() => applyJob(job._id)}>Apply Now</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
