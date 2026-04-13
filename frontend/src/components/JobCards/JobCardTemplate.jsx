import React from 'react';
import styled from 'styled-components';
import YellowButton from '../buttons/YellowButton.jsx';
import { FaRegBookmark } from 'react-icons/fa6';

const JobCardTemplate = ({
  title,
  company,
  type,
  location,
  imageUrl,
  imageAlt,
  description,
  buttonText = 'read more',
}) => {
  return (
    <StyledWrapper>
      <article className="card">
        <div className="imageWrap">
          <img className="image" src={imageUrl} alt={imageAlt || title} />
          <span className="badge">{type}</span>
        </div>
        <div className="content">
          <div className="headerRow">
            <FaRegBookmark className="bookmark" />
            <div>
              <p className="company">{company}</p>
              <p className="heading">{title}</p>
            </div>
          </div>
          <p className="meta">{location}</p>
          <p className="para">{description}</p>
          <YellowButton text={buttonText} />
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
    background: #583927;
    color: #faf3e8;
    box-shadow: 25px 20px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border-radius: 16px;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
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
  }

  .headerRow {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .bookmark {
    margin-top: 4px;
    flex-shrink: 0;
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
  }

`;

export default JobCardTemplate;
