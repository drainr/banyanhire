import React from 'react';
import styled from 'styled-components';

const CremeButton = ({text, onClick}) => {
    return (
        <StyledWrapper>
            <button onClick={onClick}>{text}</button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  button {
   padding: 10px 20px;
   border: none;
   border-radius: 30px;
   color: #583927;
   z-index: 1;
   background: #FAF3E8;
   position: relative;
   font-weight: 600;
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
   background-color: #583927;
   z-index: -1;
   transition: all 250ms
  }

  button:hover {
   color: #FAF3E8;
  }

  button:hover::before {
   width: 100%;
  }`;

export default CremeButton;
