import React from 'react';
import styled from 'styled-components';
import YellowButton from "./buttons/YellowButton.jsx";
import { FaRegBookmark } from "react-icons/fa6";
// import { FaBookmark } from "react-icons/fa";

const JobCard = () => {
    return (
        <StyledWrapper>
            <div className="card scale-75">
                <div className="content">
                    <FaRegBookmark />
                    <p className="heading p-4">Card Hover Effect
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
      left: 40%;
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

  .content .para {
    line-height: 1.5;
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
