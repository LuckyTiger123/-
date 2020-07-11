import React, { useEffect, useState } from "react";
import { Detail } from "./Detail";
import { Resource } from "./Resource";
import { Score } from "./Score";
import axios from "axios";
import { resourceTypes, resourceTypeMap } from "./Resource/constant";
import { Footer } from "../layout/Footer";
import { processRawData } from "../../utils";

import "./index.css";

export const GameInfo = (props) => {
  const [gameInfo, setGameInfo] = useState({});
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGameInfo = async () => {
    const gameId = props.match.params.id;
    const res = await axios.get(`/game/info/${gameId}`);
    const data = JSON.parse(res.data.result);
    const tags = data.tags.trim().split(" ");
    const _data = { ...data, tags };
    setGameInfo(_data);
    fetchResourcesByType(resourceTypes[0].value, _data.game_name);
  };

  const fetchResourcesByType = async (type, name = gameInfo.game_name) => {
    const { api } = resourceTypeMap(type);
    setIsLoading(true);
    const res = await axios.post(api, {
      keyword: name,
      size: 100,
    });
    const data = res.data.result || [];
    const processedData = processRawData(data);
    setResources(processedData);
    setIsLoading(false);
  };

  const handleTypeSwitch = (type) => {
    fetchResourcesByType(type);
  };

  useEffect(() => {
    fetchGameInfo();
  }, []);

  return (
    <div className="game-info-page">
      <div className="game-info-container__out">
        <div className="game-info-container">
          <div className="game-info">
            <Detail info={gameInfo} />
          </div>
          <div className="game-score">
            <Score scores={gameInfo.scores} />
          </div>
          <div className="game-resources">
            <Resource
              resources={resources}
              handleTypeSwitch={handleTypeSwitch}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
