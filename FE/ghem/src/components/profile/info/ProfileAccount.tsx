import { useState } from "react";
import { css } from "@emotion/react";
import steamLogo from "../../../assets/image/steamLogo.png";
import { mobile } from "@/util/Mixin";
import ProfileSteamIdModal from "./ProfileSteamIdModal";

type ProfileAccountProps = {
  nickname: string;
  steamId: string;
};

function ProfileAccount({ nickname, steamId }: ProfileAccountProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleOpenSteamIdModal = (): void => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div css={wrapper}>
      <p css={nicknameP}>{nickname}</p>
      <div css={steamIdWrapper} onClick={handleOpenSteamIdModal}>
        <img src={steamLogo} alt="스팀 로고" />
        <span>{steamId}</span>
      </div>
      {isOpenModal && <ProfileSteamIdModal handleOpenSteamIdModal={handleOpenSteamIdModal} />}
    </div>
  );
}

const wrapper = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobile} {
    align-items: flex-start;
  }
`;

const nicknameP = css`
  font-weight: bold;
  margin: 20px 0 20px 0;

  ${mobile} {
    margin: 0 0 10px 0;
    font-size: 18px;
  }
`;

const steamIdWrapper = css`
  width: 70%;
  height: 39px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;

  :hover {
    transition: all 0.3s;
    background: #cfcfcf;
  }

  > img {
    position: absolute;
    left: 20px;
    width: 30px;
    height: 30px;
  }

  > span {
    color: #7d7d7d;
    font-size: 16px;
  }

  ${mobile} {
    margin-bottom: 0;
    height: 35px;

    > img {
      left: 10px;
      width: 23px;
      height: 23px;
    }

    > span {
      color: #7d7d7d;
      font-size: 13px;
    }
  }
`;

export default ProfileAccount;
