import React, { useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { resourceTypes } from "./constant";

import "./index.css";

export const Resource = ({ resources }) => {
  const [activeResourceType, setActiveResourceType] = useState(
    resourceTypes[0].value
  );

  const renderHeader = () => {
    return (
      <div className="resource-header">
        {resourceTypes.map((type, index) => (
          <>
            {index !== 0 && <div className="divider">&nbsp;</div>}
            <div className="resource-header-single">
              <div
                className={
                  type.value === activeResourceType
                    ? "resource-header-text active"
                    : "resource-header-text"
                }
                onClick={() => setActiveResourceType(type.value)}
              >
                {type.text}
              </div>
            </div>
          </>
        ))}
      </div>
    );
  };

  const renderResources = () => {
    const resourcesList = resources.filter(
      (resource) => resource.type === activeResourceType
    );

    return (
      <div className="resource-list">
        {resourcesList.length !== 0 ? (
          resourcesList.map((resource) => <ResourceCard resource={resource} />)
        ) : (
          <div className="empty-content">暂无相关的内容</div>
        )}
      </div>
    );
  };

  return (
    <div className="game-info-resource">
      {renderHeader()}
      {renderResources()}
    </div>
  );
};
