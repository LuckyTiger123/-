import React from "react";
import { Tag, Divider } from "antd";
import { fetchOneColor } from "../colorList";

import "./index.css";

export const Detail = ({ info }) => {
  const gameName = info.game_name;
  const releaseDate = info.release_date;
  const developer = info.developer;
  const publisher = info.publisher;
  const tags = info.tags;
  const desc = info.info;
  const imgUrl = info.img;

  return (
    <div className="game-info-detail">
      <div className="detail-container">
        <div className="img-wrapper">
          <img className="game-img" src={imgUrl} alt="图片加载失败" />
        </div>
        <div className="game-detail">
          <div className="name">
            <span className="desc-title">游戏名称：</span>
            <span className="game-name">{gameName}</span>
          </div>
          <div className="release-date">
            <span className="desc-title">发行日期：</span>
            {releaseDate}
          </div>
          <div className="developer">
            <span className="desc-title">开发商：</span>
            {developer}
          </div>
          <div className="publisher">
            <span className="desc-title">发行商：</span>
            {publisher}
          </div>
          <div className="game-tag">
            <span className="desc-title">游戏标签：</span>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                className="game-tag-single"
                color={fetchOneColor(index)}
              >
                {tag}
              </Tag>
            ))}
          </div>
          <Divider />
          <div className="game-desc">{desc}</div>
        </div>
      </div>
    </div>
  );
};
