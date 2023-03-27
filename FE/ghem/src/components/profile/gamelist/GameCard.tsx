import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import testGameImage from "../../../assets/image/testGameImage.jpg";
import meatballIcon from "../../../assets/image/meatballIcon.png";
import { FaHeart } from "react-icons/fa";
import MenuDropdown from "../common/MenuDropdown";
import { useNavigate } from "react-router-dom";
import { mobile } from "@/util/Mixin";
import { gameType } from "gameList";

type GameCardProps = {
  path?: string;
  game: gameType;
  rating: number;
  review?: string;
  isDragMove: boolean;
};

function GameCard({ path, game, rating, review, isDragMove }: GameCardProps) {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [gameImage, setGameImage] = useState<string>("");

  const handleOpenMenu = (): void => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleRemoveLike = (): void => {
    // 관심 목록에서 해제
  };

  const moveToGameDetail = (id: number): void => {
    if (!isDragMove) {
      navigate(`/detail/${game.appId}`);
    }
  };

  useEffect(() => {
    if (game) {
      const image = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/header.jpg`;
      setGameImage(image);
    }
  }, [game]);

  return (
    <div css={gameCardWrapper}>
      <div css={gameImageWrapper}>
        <img src={gameImage} alt="게임 이미지" />
        {path === "interest" ? (
          <div css={likeButtonWrapper}>
            <FaHeart size="25" onClick={handleRemoveLike} />
          </div>
        ) : (
          <div css={gameMeatballWrapper} onClick={handleOpenMenu}>
            <img src={meatballIcon} alt="미트볼 메뉴 아이콘" />
            {isOpenMenu && <MenuDropdown />}
          </div>
        )}
      </div>
      <div css={gameContentWrapper} onClick={() => moveToGameDetail(1)}>
        <div css={gameContentHeader}>
          <b>{game.title}</b>
          {path !== "interest" && <span>{rating}</span>}
        </div>
        {review && <span>{review}</span>}
      </div>
    </div>
  );
}

const gameCardWrapper = css`
  min-width: 310px;
  max-width: 310px;
  min-height: 230px;
  max-height: 230px;
  background: #292233;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;

  ${mobile} {
    min-width: 250px;
    max-width: 250px;
    min-height: 200px;
    max-height: 200px;
  }
`;

const gameImageWrapper = css`
  position: relative;
  height: 65%;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
  }
`;

const gameMeatballWrapper = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 23px;
  background: rgba(202, 202, 202, 0.8);
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :hover {
    transition: all 0.2s;
    background: #a8a8a8;
  }
`;

const likeButtonWrapper = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 35px;
  height: 23px;
  cursor: pointer;
  display: flex;
  justify-content: center;

  > svg {
    color: #ec3131;

    :hover {
      transition: all 0.2s;
      color: #ff8282;
    }
  }
`;

const gameContentWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 15px 15px;
  cursor: pointer;

  > span {
    font-size: 15px;
  }
`;

const gameContentHeader = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;

  > span {
    font-size: 13px;
  }
`;

export default GameCard;
