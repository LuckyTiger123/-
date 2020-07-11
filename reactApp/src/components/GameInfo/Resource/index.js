import React, { useState } from "react";
import { ResourceCard } from "./ResourceCard";
import { resourceTypes } from "./constant";
import { Spin } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

import "./index.css";

export const Resource = ({ resources, handleTypeSwitch, isLoading }) => {
  const [activeResourceType, setActiveResourceType] = useState(
    resourceTypes[0].value
  );
  const [currentPage, setCurrentPage] = useState(1);

  const changeType = (type) => {
    if (type === activeResourceType) return;
    setActiveResourceType(type);
    handleTypeSwitch(type);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                onClick={() => changeType(type.value)}
              >
                {type.text}
              </div>
            </div>
          </>
        ))}
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className="loading-content">
        <Spin size="large" />
        <div className="loading-desc">加载中</div>
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <div className="resource-pagination-container">
        <div className="resource-pagination">
          <Pagination
            size="small"
            showSizeChanger={false}
            pageSize={5}
            current={currentPage}
            onChange={(number) => handlePageChange(number)}
            total={resources.length}
          />
        </div>
      </div>
    );
  };

  const renderResources = () => {
    return (
      <>
        {isLoading ? (
          renderLoading()
        ) : (
          <>
            {renderHeader()}
            <div className="resource-list">
              {resources.length !== 0 ? (
                <>
                  {resources
                    .slice((currentPage - 1) * 5, currentPage * 5)
                    .map((resource, index) => (
                      <ResourceCard key={index} resource={resource} />
                    ))}
                </>
              ) : (
                <div className="empty-content">
                  <FrownOutlined />
                  暂无相关的内容
                </div>
              )}
            </div>
            {renderPagination()}
          </>
        )}
      </>
    );
  };

  return <div className="game-info-resource">{renderResources()}</div>;
};
