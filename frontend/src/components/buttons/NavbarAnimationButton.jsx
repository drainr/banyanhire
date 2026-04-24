import React from 'react';
import styled from 'styled-components';
import "../../App.css";

const NavbarAnimationButton = ({text, onClick}) => {
    return (
        <StyledWrapper>
            <button className="cta " onClick={onClick}>
                <span className="hover-underline-animation"> {text} </span>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .cta {
    border: none;
    background: none;
    cursor: pointer;
  }

  .cta span {
    padding-bottom: 7px;
    font-size: 15px;
    padding-right: 15px;
    color: #FAF3E8;
      font-weight: 400;
      font-style: normal;
      transform: skewX(-10deg);
      font-variation-settings:
              "wdth" 100;
  }
    
    
  .hover-underline-animation {
    position: relative;
    color: #FAF3E8;
    padding-bottom: 20px;
      
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 85%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #FAF3E8;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }`;

export default NavbarAnimationButton;
