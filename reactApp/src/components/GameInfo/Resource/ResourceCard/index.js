import React from "react";
import { Tag } from "antd";
import { fetchOneColor } from "../../colorList";
import { resourceTypeMap } from "../constant";

import "./index.css";

export const ResourceCard = ({ resource }) => {
  const info = <span className="info">{resource.info}</span>

  return (
    <div className="resource-card">
      <div className="resource-card-content">
        <div className="resource-img-wrapper">
          <img className="resource-name" />
        </div>
        <div className="resource-info-wrapper">
          <div className="resource-name">
            <Tag
              className="resource-tag-single"
              color={fetchOneColor(resource.type)}
            >
              {resourceTypeMap(resource.type).text}
            </Tag>
            {info}
          </div>
          <div className="resource-time">
            <div className="release-time"> 发布时间：{resource.time}</div>
            <div> 来源：{resource.source}</div>
          </div>
          <div className="resource-content">{resource.content}</div>
        </div>
      </div>
    </div>
  );
};
