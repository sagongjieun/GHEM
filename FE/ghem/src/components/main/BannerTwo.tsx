import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { mobile } from "@/util/Mixin";
import {
  gameRecommendState,
  gameRecommendStateType,
  loginRandomGameList,
} from "@/store/mainState";
import { useRecoilState, useRecoilValue } from "recoil";
import { FaInfoCircle } from "react-icons/fa";
import CommonGameList from "./game/CommonGameList";
import { PageXY } from "@/pages/MainPage";
import { useNavigate } from "react-router";

type BannerTwoProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  currentColId: string;
  canClickWithHover: boolean;
};

function BannerTwo(props: BannerTwoProps) {
  const userId: number | null = Number(localStorage.getItem("id"));
  const [gameRecommend, setGameRecommend] =
    useRecoilState<gameRecommendStateType[]>(gameRecommendState);
  const [loginRandomGame, setLoginRandomGame] =
    useRecoilState<{ appid: number }[]>(loginRandomGameList);

  const navigator = useNavigate();

  const [secondBannerList, setSecondBannerList] = useState<{ appid: number }[]>(
    []
  );
  useEffect(() => {
    if (gameRecommend.length > 0) {
      const newList = gameRecommend.map((game) => {
        return { appid: game.app_id };
      });
      setSecondBannerList(newList);
    } else {
      // 내가 평가한 게임 중 하나 랜덤의 유사게임
      if (userId && loginRandomGame.length > 0) {
        setSecondBannerList(loginRandomGame);
        // console.log("이부분 이후에 콘솔창 확인하고 좀 수정하세요");
      } else if (!userId) {
        navigator("/category");
      }
    }
  }, [gameRecommend, loginRandomGame]);

  return (
    <div css={bannerTwoDiv}>
      <div css={flexDiv}>
        <span css={bannerTwoText}>LIKE YOU LIKE</span>
        <span>
          <FaInfoCircle size={25} />
        </span>
      </div>
      <CommonGameList
        gameList={secondBannerList}
        imgType="capsule"
        scrollType={-1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="bannerTwo"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
    </div>
  );
}

const flexDiv = css`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 70px;
    padding: 1rem 4rem 0rem 4rem;
  }
  ${mobile} {
    > span {
      font-size: 30px;
      padding: 0rem 1.5rem;
    }
  }
`;

const bannerTwoDiv = css`
  margin: 8rem 6rem;
  padding: 1rem 0rem;
  background-color: #352c42;
  border-radius: 30px;
  ${mobile} {
    margin: 3rem 1rem;
    padding: 1rem 0rem;
    border-radius: 20px;
  }
`;

const bannerTwoText = css`
  color: #fff;
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
    0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb;
`;

export default BannerTwo;
