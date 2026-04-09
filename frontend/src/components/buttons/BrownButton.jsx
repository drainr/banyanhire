import React from 'react';
import styled from 'styled-components';

const BrownButton = ({text, onClick}) => {
    return (
        <StyledWrapper>
            <button onClick={onClick}>{text}</button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
   padding: 15px 25px;
   border: none;
   border-radius: 20px;
   color: #FAF3E8;
   z-index: 1;
   background: #583927;
   position: relative;
   font-weight: 1000;
   font-size: 17px;
   transition: all 250ms;
   overflow: hidden;
  }

  button::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 0;
   border-radius: 15px;
   background-color: #FAF3E8;
   z-index: -1;
   transition: all 250ms
  }

  button:hover {
   color: #583927;
  }

  button:hover::before {
   width: 100%;
  }`;

export default BrownButton;
