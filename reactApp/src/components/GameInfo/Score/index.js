import React, { useState } from "react";
import { Divider } from "antd";

import "./index.css";

export const Score = ({ scores }) => {
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);

  return (
    <div className="game-info-score">
      <div className="media-score">
        {scores.map((score, index) => (
          <div
            key={index}
            className={
              index === activeCommentIndex
                ? "media-score-single active"
                : "media-score-single"
            }
            onClick={() => {
              setActiveCommentIndex(index);
            }}
          >
            <div className="media-name">{score.media_name}</div>
            <div className="score">
              <span>{score.score}</span>/10
            </div>
          </div>
        ))}
      </div>
      <Divider />
      <div className="media-comment">{scores[activeCommentIndex].comment}</div>
    </div>
  );
};
