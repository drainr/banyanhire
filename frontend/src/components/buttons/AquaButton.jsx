import React from 'react';
import styled from 'styled-components';

const AquaButton = ({ text, onClick, type = "submit" }) => {
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
        color: #583927; /* Brown text */
        background: #91D8D4; /* Aqua background */
        position: relative;
        font-weight: 600;
        font-size: 17px;
        transition: all 250ms;
        overflow: hidden; /* Clips the background fill */
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
        border-radius: 30px; /* Match button radius */
        background-color: #583927; /* Brown fill */
        z-index: -1; /* Sits behind text, but above aqua base */
        transition: all 250ms;
    }

    button:hover {
        color: #91D8D4; /* Text turns aqua on hover */
    }

    button:hover::before {
        width: 100%;
    }

    button:active {
        transform: scale(0.97); /* Slight press effect */
    }
`;

export default AquaButton;