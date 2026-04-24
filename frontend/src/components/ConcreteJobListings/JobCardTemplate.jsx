import React from 'react';
import styled from 'styled-components';
import YellowButton from '../buttons/YellowButton.jsx';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { deleteJob } from "../../utils/api";
import { useAuth } from '../../hooks/useAuth.js';

const JobCardTemplate = ({
    id,
    title,
    company,
    type,
    location,
    imageUrl,
    imageAlt,
    description,
    buttonText = 'read more',
    userRole,
    isBookmarked,
    onBookmark,
    onDelete,
}) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleDelete = async () => {
        try {
            await deleteJob(id, token);
            alert("Job deleted successfully");
            if (onDelete) onDelete(id);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <StyledWrapper>
            <article className="card">
                <div className="imageWrap">
                    <img className="image" src={imageUrl} alt={imageAlt || title} />
                    <span className="badge">{type}</span>
                </div>
                <div className="content">
                    <div className="headerRow">
                        {/* Seeker sees bookmark */}
                        {userRole === "seeker" && (
                            <div
                                className="action-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onBookmark?.(id);
                                }}
                            >
                                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                            </div>
                        )}
                        {/* Admin sees delete */}
                        {userRole === "admin" && (
                            <div
                                className="action-icon delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm("Delete this job posting?")) {
                                        handleDelete();
                                    }
                                }}
                            >
                                <IoCloseCircleOutline />
                            </div>
                        )}
                        <div>
                            <p className="company">{company}</p>
                            <p className="heading">{title}</p>
                        </div>
                    </div>
                    <p className="meta">{location}</p>
                    <p className="para">{description}</p>
                    <YellowButton
                        text={buttonText}
                        onClick={() => navigate(`/jobs/${id}`)}
                    />
                </div>
            </article>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 100%;
    max-width: 320px;
    height: 480px;
    background: #583927;
    color: #faf3e8;
    box-shadow: 25px 20px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 16px;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 30px 24px 28px rgba(0, 0, 0, 0.26);
  }

  .imageWrap {
    position: relative;
    height: 180px;
    overflow: hidden;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .badge {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: rgba(16, 16, 16, 0.7);
    color: #faf3e8;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    backdrop-filter: blur(6px);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 22px;
    flex: 1;
  }

  .headerRow {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .action-icon {
    margin-top: 4px;
    flex-shrink: 0;
    cursor: pointer;
    font-size: 20px;
    transition: color 0.3s;
  }

  .action-icon:hover {
    color: #B5CD88;
  }

  .action-icon.delete:hover {
    color: #BB616D;
  }

  .company {
    margin: 0;
    color: #91d8d4;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .heading {
    margin: 0;
    font-weight: 700;
    font-size: 1.45rem;
    line-height: 1.1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    margin: 0;
    color: rgba(250, 243, 232, 0.78);
    font-size: 0.9rem;
  }

  .para {
    margin: 0;
    line-height: 1.55;
    color: rgba(250, 243, 232, 0.94);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 6.2em;
  }
`;

export default JobCardTemplate;