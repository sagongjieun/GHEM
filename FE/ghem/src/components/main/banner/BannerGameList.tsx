import { css, keyframes } from "@emotion/react";
import React, { useRef, useState } from "react";
import BannerGameItem from "./BannerGameItem";

function BannerGameList() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true);
  const [startX, setStartX] = useState<number>(0);

  const scrollElement = scrollRef.current as HTMLDivElement;

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    setIsDrag(true);
    setStartX(e.pageX);
  };

  const onDragLeave = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragEnd = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDrag) {
      setCanClick(false); // 드래그에 있어야 일반 클릭과 드래그를 true false 나누어 처리 가능
      e.preventDefault();
      scrollElement.scrollLeft += startX - e.pageX;
      setStartX(e.pageX);
    }
  };

  return (
    <div>
      <div css={recommendForU}>
        <span>
          <b css={boxStyle}>WHAT FOR YOU</b>
        </span>
        <span>O</span>
      </div>
      <div
        css={recommendList}
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragLeave}
      >
        <BannerGameItem appId={367520} title={"hollow"} canClick={canClick} />
        <BannerGameItem
          appId={10}
          title={"counterscrike"}
          canClick={canClick}
        />
        <BannerGameItem
          appId={322330}
          title={"dontstarv"}
          canClick={canClick}
        />
      </div>
      <div css={bannerDetail}>체크용</div>
    </div>
  );
}

const bannerDetail = css`
  margin: 0rem 6rem 2rem;
  padding: 1rem 0rem 1rem 1rem;
  background-color: #352c42;
  border-radius: 0px 0px 30px 30px;
`;

const recommendForU = css`
  > span {
    font-size: 90px;
  }
  display: flex;
  justify-content: space-between;
  margin: 2rem 6rem 0rem;
  padding: 1rem 4rem 0rem 4rem;
  background-color: #352c42;
  border-radius: 30px 30px 0px 0px;
`;

const recommendList = css`
  display: flex;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const floating = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
    0 0 1px #fff,
    0 0 6px #fff,
    0 0 8px #fff,
    0 0 10px #f6b4ff,
    0 0 15px #f1c1ff,
    0 0 20px #ffd8f8,
    0 0 30px #dd00ff,
    0 0 40px #ffa9cb;
  }

  20%, 24%, 55% {        
    text-shadow: none;
  }    
`;

const boxStyle = css`
  color: #fff;
  animation: ${floating} 1.5s infinite alternate; ;
`;

export default BannerGameList;
