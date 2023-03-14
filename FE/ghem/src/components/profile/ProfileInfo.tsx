import React from "react";
import { css } from "@emotion/react";
import baseProfile from "../../assets/image/baseProfile.png";
import steamLogo from "../../assets/image/steamLogo.png";

function ProfileInfo() {
  return (
    <div css={profileInfoWrapper}>
      <img src={baseProfile} />
      <p css={nickname}>닉네임</p>
      <p css={email}>email@email.com</p>
      <div css={steamIdWrapper}>
        <img src={steamLogo} />
        <span>미등록</span>
      </div>
      <div css={followWrapper}>
        <span>팔로워 1</span>
        <div></div>
        <span>팔로잉 2</span>
      </div>
      <textarea css={introduce} readOnly value={"자기소개"}></textarea>
    </div>
  );
}

const profileInfoWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 130px;
    height: 130px;
    margin-bottom: 20px;
  }
`;

const nickname = css`
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 5px;
`;

const email = css`
  color: #ffffff;
  margin-bottom: 20px;
`;

const steamIdWrapper = css`
  width: 180px;
  height: 39px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;

  > img {
    position: absolute;
    left: 25px;
    width: 30px;
    height: 30px;
  }

  > span {
    position: absolute;
    left: 80px;
    color: #7d7d7d;
    font-size: 16px;
  }
`;

const followWrapper = css`
  width: 250px;
  border-top: 1px solid #716969;
  border-bottom: 1px solid #716969;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  > span {
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }

  > div {
    height: 30px;
    border: 1px solid #716969;
    margin: 0 40px;
  }
`;

const introduce = css`
  width: 250px;
  height: 80px;
  resize: none;
  border: none;
  outline: none;
  background-color: #352c42;
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 30px;
`;

export default ProfileInfo;
