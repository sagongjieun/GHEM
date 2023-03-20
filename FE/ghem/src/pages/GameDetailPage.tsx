/* 보완할 점들
  1. 존재하지 않는 APP_ID 입력시에 게임 정보가 없음을 표현하는 페이지로 렌더링 해야함
  2. 스켈레톤 UI 적용 필요
  3. loadData()로 인해 렌더링이 두 번 연달아 일어나는 현상 고치기
*/

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ImageHead from '../components/gamedetail/ImageHead'
import Section from '@/components/common/Section'
import axios from 'axios'
import RecommendChoice from '@components/gamedetail/RecommendChoice'
import ChatBox from '@components/gamedetail/chatbox/ChatBox'
import { css } from '@emotion/react'
import ReviewInput from '@components/gamedetail/review/ReviewInput'

type GameDataType = {
  appID: string,
  name: string,
  shortDescription: string
}

function GameDetailPage() {
  const [gameData, setGameData] = useState<GameDataType | null>(null);  // 보여질 게임에 대한 상세 정보
  const [choice, setChoice] = useState<"recommended" | "notrecommended" | "notchosen">("notchosen");
  const appID = useParams().appid;  // URL의 path variable로 부터 APP_ID 추출
  const env = import.meta.env;

  // 게임 상세 정보 가져오기
  const loadGameData = async () => {
    const response = await axios.get(env.VITE_GAME_DETAIL + appID);
    const data = response.data[String(appID)].data;
    setGameData(() => {
      return {
        appID: data.steam_appid,
        name: data.name,
        shortDescription: data.short_description
      }
    })
  }
  
  useEffect(() => {
    loadGameData();  // 렌더링을 두 번 연달아 일어나게 한다
  }, [])
  
  return (
    <div>
      {/* 라이브러리 이미지를 가진 헤드 컴포넌트*/}
      {gameData && <ImageHead gameData={gameData} choice={choice}/>}

      <div css={container}>
        <div css={leftContainer}>
          <RecommendChoice choice={choice} setChoice={setChoice}/>
          <br />
          {/* 리뷰 컴포넌트 */}
          <Section>
            <div style={{width: "100%", height: "50rem"}}>
              <h2>리뷰</h2>
              <ReviewInput />
            </div>
          </Section>
          <br />

          {/* 즐겨찾기한 유저들 컴포넌트 */}
          <Section>
            <div style={{width: "100%", height: "50rem"}}>즐겨찾기한 유저들 컴포넌트</div>
          </Section>
        </div>
        <div css={rightContainer}>
          {/* 채팅창 컴포넌트 */}
          <ChatBox />
        </div>
      </div>
    </div>
  )
}

const container = css`
  width: 100%;
  display: flex;
`

const leftContainer = css`
  /* background-color: green; */
  width: 67%;
  padding: 1rem;
`

const rightContainer = css`
  /* background-color: blue; */
  width: 33%;
  padding: 1rem;
`

export default GameDetailPage