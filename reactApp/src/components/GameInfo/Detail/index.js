import React from "react";
import { Tag, Divider } from "antd";
import { fetchOneColor } from "../colorList";

import "./index.css";
const noInfoText = "暂无信息";

export const Detail = ({ info }) => {
  const gameName = info.game_name || noInfoText;
  const releaseDate = info.release_date || noInfoText;
  const developer = info.developer || noInfoText;
  const publisher = info.publisher || noInfoText;
  const tags = info.tags || [];
  const desc = info.info || noInfoText;
  const imgUrl = info.imgs || "#";
  const originUrl = info.detail_url || "#";

  return (
    <div className="game-info-detail">
      <div className="game-detail">
        <div className="detail-wrapper">
          <div className="img-wrapper">
            <a href={originUrl}>
              <img className="game-img" src={imgUrl} alt="图片加载失败" />
            </a>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <div className="name">
              <span className="desc-title">游戏名称：</span>
              <a className="game-name" href={originUrl}>
                {gameName}
              </a>
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
              <div className="desc-title">游戏标签：</div>
              <div className="game-tag-container">
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
            </div>
          </div>
        </div>

        <Divider />
        <div className="game-desc">{desc}</div>
      </div>
    </div>
  );
};
