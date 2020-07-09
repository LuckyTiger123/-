import React from "react";
import { Detail } from "./Detail";
import { Resource } from "./Resource";
import { Score } from "./Score";

import { testData, resources } from "./test";

import "./index.css";

export const GameInfo = () => {
  return (
    <div className="game-info-page">
      <div className="game-info-container">
        <div className="game-info">
          <Detail info={testData} />
        </div>
        <div className="game-score">
          <Score scores={testData.scores} />
        </div>
        <div className="game-resources">
          <Resource resources={resources} />
        </div>
      </div>
    </div>
  );
};
