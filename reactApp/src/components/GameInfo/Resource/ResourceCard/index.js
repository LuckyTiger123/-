import React from "react";
import { Tag } from "antd";
import { fetchOneColor } from "../../colorList";
import { resourceTypeMap } from "../constant";

import "./index.css";

export const ResourceCard = ({ resource }) => {
  const title = (
    <div
      className="resource-title"
      dangerouslySetInnerHTML={{ __html: resource.title }}
    />
  );

  const info = (
    <div
      className="resource-info"
      dangerouslySetInnerHTML={{ __html: resource.info }}
    />
  );

  return (
    <div className="resource-card">
      <div className="resource-card-content">
        <div className="resource-img-wrapper">
          <img
            className="resource-img"
            src={resource.img_url}
            alt="图片加载失败"
          />
        </div>
        <div className="resource-info-wrapper">
          <div className="resource-name">
            <Tag
              className="resource-tag-single"
              color={fetchOneColor(resource.type)}
            >
              {resourceTypeMap(resource.type).text}
            </Tag>
            <a href={resource.url} target="_blank">{title}</a>
          </div>
          <div className="resource-time">
            <div className="release-time"> 发布时间：{resource.time}</div>
            <div> 来源：{resource.source}</div>
          </div>
          <div className="resource-content">{info}</div>
        </div>
      </div>
    </div>
  );
};
