import React from 'react';
import styled from 'styled-components';
import YellowButton from "./buttons/YellowButton.jsx";

const JobCard = () => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="content">
                    <p className="heading">Card Hover Effect
                    </p><p className="para">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
                    laboriosam at voluptas minus culpa deserunt delectus sapiente
                    inventore pariatur
                </p>
                    <YellowButton text="read more"/>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
      background: #583927;
      color: #583927;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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

  .content .para {
    line-height: 1.5;
  }

  .content .btn {
    color: #e8e8e8;
    text-decoration: none;
    padding: 10px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .card::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .card:hover::before {
    height: 100%;
  }

  .card:hover {
    box-shadow: none;
  }

  .card:hover .btn {
    color: #212121;
    background: #e8e8e8;
  }

  .content .btn:hover {
    outline: 2px solid #e8e8e8;
    background: transparent;
    color: #e8e8e8;
  }

  .content .btn:active {
    box-shadow: none;
  }`;

export default JobCard;
