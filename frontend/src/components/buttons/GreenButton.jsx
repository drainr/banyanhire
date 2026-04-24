import React from 'react';
import styled from 'styled-components';

const GreenButton = ({ text, onClick, type = "submit" }) => {
    return (
        <StyledWrapper>
            <button type={type} onClick={onClick}>
                {text}
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    button {
        padding: 10px 25px;
        border: none;
        border-radius: 30px;
        color: #FAF3E8; 
        background: #B5CD88; 
        position: relative;
        font-weight: 600;
        font-size: 17px;
        transition: all 250ms;
        overflow: hidden;
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
        
        border-radius: 30px;
        background-color: #FAF3E8; 
       
        z-index: -1;
        transition: all 250ms;
    }

    button:hover {
        color: #B5CD88;
    }

    button:hover::before {
        width: 100%;
    }
    
    button:active {
        transform: scale(0.98);
    }
`;

export default GreenButton;