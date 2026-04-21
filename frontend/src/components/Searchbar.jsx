import React from 'react';
import styled from 'styled-components';

const Input = ({ onChange }) => {
    return (
        <StyledWrapper>
            <div className="input-wrapper">
                <input className="input-box" type="text" placeholder="Enter Job Title" onChange={onChange} />
                <span className="underline" />
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .input-wrapper {
        position: relative;
        width: 200px;
        left:5%;
    }

    .input-box {
        font-size: 16px;
        padding: 10px 0;
        border: none;
        border-bottom: 2px solid #FFFFFF;
        color: #583927;
        width: 100%;
        background-color: transparent;
        transition: border-color 0.3s ease-in-out;
    }

    .input-box:focus {
        border-color: #91D8D4;
        outline: none;
    }

    .input-box:focus + .underline {
        transform: scaleX(1);
    }`;

export default Input;
