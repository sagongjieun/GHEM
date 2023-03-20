import React from "react";
import { css } from "@emotion/react";

function ComputerSpecRAM() {
  return (
    <div css={ComputerSpecWrapper}>
      <h5>RAM</h5>
      <div css={inputWrapper}>
        <input type="number" />
        <span>GB</span>
      </div>
    </div>
  );
}

const ComputerSpecWrapper = css`
  display: flex;
  flex-direction: column;

  > h5 {
    margin-bottom: 20px;
  }
`;

const inputWrapper = css`
  border: none;
  border-bottom: 1px solid white;
  display: flex;
  flex-direction: row;
  align-items: center;

  > input {
    width: 100px;
    height: 40px;
    outline: none;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    padding: 0 10px;
  }

  > span {
    font-size: 16px;
  }
`;

export default ComputerSpecRAM;