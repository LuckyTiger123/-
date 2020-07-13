import React from "react";
import { FrownOutlined } from "@ant-design/icons";

import "./index.css";

export const Score = ({ scores }) => {
  const _scores = scores || [];
  const gameScores = _scores.map((score) => ({
    score: score.score.split("/")[0],
    total: score.score.split("/")[1],
    media_name: score.media_name,
  }));
  if (gameScores.length > 9) {
    gameScores.splice(9);
  }

  return (
    <div className="game-info-score">
      <div className="media-score">
        {gameScores.length > 0 ? (
          gameScores.map((score, index) => (
            <div key={index} className="media-score-single">
              <div className="media-name">{score.media_name}</div>
              <div className="score">
                <span>{score.score}</span>/{score.total}
              </div>
            </div>
          ))
        ) : (
            <div className="no-score-desc">
              <FrownOutlined />
            暂无评分
            </div>
          )}
      </div>
    </div>
  );
};
