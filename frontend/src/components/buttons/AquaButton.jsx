import React from 'react';
import styled from 'styled-components';

const AquaButton = ({text, onClick, type = "submit"}) => {
    return (
        <StyledWrapper>
            <button type={type} onClick={onClick}>{text}</button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
   padding: 10px 20px;
   border: none;
   border-radius: 30px;
   color: #583927;
   background: #91D8D4;
   position: relative;
   font-weight: 600;
   font-size: 17px;
   transition: all 250ms;
   overflow: visible;
   cursor: pointer;
   z-index: 1;
  }

  button::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 0;
   border-radius: 15px;
   background-color: #583927;
   z-index: 0;
   transition: all 250ms;
   pointer-events: none;
  }

  button:hover {
   color: #91D8D4;
  }

  button:hover::before {
   width: 100%;
  }`;

export default AquaButton;
