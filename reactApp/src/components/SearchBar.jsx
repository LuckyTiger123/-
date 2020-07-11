import React, { Component } from "react";
import { Input, Select, Tag, Menu, Dropdown, Button, message } from "antd";
import { withRouter } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import {
  filterTypes,
  filters,
  filtersZh,
  mapFilterToColor,
} from "../common/config";
import { autobind } from "core-decorators";

import "../index.css";

const { Search } = Input;
const { Option } = Select;

class SearchTags extends Component {
  @autobind
  handleClick(e, index) {
    const val = e.key;
    const { filters: currentFilters } = this.props;
    const tagAlreadyExist = currentFilters.filter(
      (filter) => filter.value === val
    ).length;

    if (tagAlreadyExist) return;
    return this.props.handleAddFilter({ type: filters[index], value: val });
  }

  @autobind
  handleClose(value) {
    return this.props.handleRemoveFilter({ value });
  }

  @autobind
  renderMenu(index) {
    return (
      <Menu onClick={(e) => this.handleClick(e, index)}>
        {filterTypes[filters[index]].map((type) => (
          <Menu.Item key={type}>{type}</Menu.Item>
        ))}
      </Menu>
    );
  }

  @autobind
  renderTags() {
    return (
      <div style={{ marginTop: "10px" }}>
        <div style={{ marginTop: "10px" }}>
          {this.props.filters.map((filter) => (
            <Tag
              color={mapFilterToColor(filter.type)}
              closable
              key={filter.value}
              style={{ borderRadius: "10px" }}
              onClose={() => this.handleClose(filter.value)}
            >
              {filter.value}
            </Tag>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <div style={{ marginTop: "10px" }}>
          {filtersZh.map((filter, index) => (
            <Dropdown key={index} overlay={this.renderMenu(index)}>
              <Button
                className="game-type-filter"
                type="primary"
                shape="round"
                style={{ marginLeft: "15px" }}
              >
                {filter}
              </Button>
            </Dropdown>
          ))}
        </div>
        <div style={{ marginTop: "10px" }}>{this.renderTags()}</div>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  @autobind
  handleSelectChange(value) {
    this.props.handleToggleSearchType({ value });
  }

  @autobind
  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  @autobind
  handleSubmit() {
    const { value } = this.state;
    if (value.trim() === "") {
      message.error("搜索框不能为空");
      return;
    }
    this.props.handleChangeKeyword({ value });
    this.props.history.push({
      pathname: "/result",
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center", width: "90%" }}>
        <div>
          <img src={require("../assets/logo.png")} width="20%"></img>
        </div>
        <Search
          addonBefore={
            <Select
              defaultValue={this.props.type}
              className="select-before"
              onChange={this.handleSelectChange}
            >
              <Option value="all">搜全站</Option>
              <Option value="games">搜游戏</Option>
              <Option value="news">搜资讯</Option>
              <Option value="methods">搜攻略</Option>
              <Option value="videos">搜视频</Option>
            </Select>
          }
          placeholder="请输入关键词..."
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          }
          size="large"
          style={{ width: "50%" }}
          onChange={this.handleInputChange}
          onSearch={this.handleSubmit}
        />
        {this.props.type === "games" && (
          <SearchTags
            filters={this.props.filters}
            handleAddFilter={this.props.handleAddFilter}
            handleRemoveFilter={this.props.handleRemoveFilter}
            recvFunc={this.getTags}
          />
        )}
      </div>
    );
  }
}

export default withRouter(SearchBar);
