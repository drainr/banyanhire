import React from 'react';
import styled from 'styled-components';
import YellowButton from "./buttons/YellowButton.jsx";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onBookmark, isBookmarked }) => {
    const navigate = useNavigate();

    const formatSalary = (min, max) => {
        const fmt = (n) => "$" + (n / 1000).toFixed(0) + "k";
        return `${fmt(min)} – ${fmt(max)}`;
    };

    return (
        <StyledWrapper>
            <div className="card scale-75">
                <div className="content">
                    <div
                        className="bookmark"
                        onClick={(e) => {
                            e.stopPropagation();
                            onBookmark?.(job._id);
                        }}
                    >
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </div>
                    <p className="heading p-4">{job.title}</p>
                    <p className="company">{job.company}</p>
                    <p className="para">{job.location}</p>
                    <p className="salary">
                        {job.salaryMin && job.salaryMax
                            ? formatSalary(job.salaryMin, job.salaryMax)
                            : "Salary not listed"}
                    </p>
                    <YellowButton
                        text="View Details"
                        onClick={() => navigate(`/jobs/${job._id}`)}
                    />
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    background: #583927;
    color: #583927;
    box-shadow: 25px 20px 20px rgba(0, 0, 0, 0.2);
    padding: 32px;
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    color: #FAF3E8;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .content .heading {
    font-weight: 700;
    font-size: 32px;
  }

  .content .company {
    font-size: 16px;
    color: #91D8D4;
    font-weight: 600;
  }

  .content .para {
    line-height: 1.5;
  }

  .content .salary {
    color: #B5CD88;
    font-weight: 700;
    font-size: 14px;
  }

  .content .bookmark {
    cursor: pointer;
    font-size: 20px;
    align-self: flex-end;
    transition: color 0.3s;
  }

  .content .bookmark:hover {
    color: #B5CD88;
  }

  .card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 9px;
    background: #91D8D4;
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }
`;

export default JobCard;