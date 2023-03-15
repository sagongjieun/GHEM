import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonGameList from "./game/CommonGameList";

type RankItemList = {
  appid: number;
};

type RankList = {
  name: string;
  start_of_month: number;
  url_path: string;
  item_ids: RankItemList[];
};

function TopRankNewRelease() {
  const [topRankLists, setTopRankLists] = useState<RankList[]>([]);
  useEffect(() => {
    TopRankListApi();
    return () => {};
  }, []);

  const TopRankListApi = async () => {
    try {
      const response = await axios.get(
        "https://api.steampowered.com/ISteamChartsService/GetTopReleasesPages/v1/"
      );
      setTopRankLists(response.data.response.pages);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div>
      {topRankLists?.map((rankList) => {
        return (
          <CommonGameList
            gameList={rankList.item_ids}
            key={rankList.start_of_month}
            imgType="header"
          />
        );
      })}
    </div>
  );
}

export default TopRankNewRelease;
