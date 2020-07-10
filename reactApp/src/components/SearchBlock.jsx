import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input, Select, Tag, Divider, Collapse, Button, message } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import {
  filterTypes,
  filters,
  filtersZh,
  searchTypes,
  mapFilterToColor,
} from "../common/config";
import { autobind } from "core-decorators";

const { Search } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;
const { Panel } = Collapse;

class GameTags extends Component {
  @autobind
  renderTags() {
    return this.props.filters.map((filter) => (
      <Tag
        color={mapFilterToColor(filter.type)}
        closable
        key={filter.value}
        style={{ borderRadius: "10px" }}
        onClose={() => this.props.handleRemoveFilter({ value: filter.value })}
      >
        {filter.value}
      </Tag>
    ));
  }

  @autobind
  tagAlreadyExist(val) {
    const tagExist = this.props.filters.filter((filter) => filter.value === val)
      .length;
    return Boolean(tagExist);
  }

  async handleGameTagChange(checked, type, value) {
    if (checked) {
      await this.props.handleAddFilter({ type, value });
    } else {
      await this.props.handleRemoveFilter({ value });
    }

    return this.props.handleTagChange();
  }

  render() {
    return (
      <div style={{ width: "75%", margin: "0 auto" }}>
        <div style={{ marginBottom: "1%", marginTop: "1%" }}>
          {this.renderTags()}
        </div>
        <Collapse
          bordered="true"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 90 : 0}
              style={{ color: "white" }}
            />
          )}
          className="site-collapse-custom-collapse"
          expandIconPosition="right"
          ghost="true"
          style={{ backgroundColor: "rgba(245, 245, 245, 0.4)" }}
        >
          <Divider dashed="true" />
          <Panel
            header={
              <span style={{ color: "white" }}>
                <b>游戏类型</b>
              </span>
            }
            key="1"
            className="site-collapse-custom-panel"
            extra={<span style={{ color: "white" }}>展开</span>}
          >
            {filterTypes.type.map((tag) => (
              <CheckableTag
                key={tag}
                checked={this.tagAlreadyExist(tag)}
                onChange={(checked) =>
                  this.handleGameTagChange(checked, "type", tag)
                }
                style={{
                  float: "left",
                  width: "16%",
                  color: "white",
                  fontSize: "15px",
                  fontFamily: "KaiTi",
                }}
              >
                {tag}
              </CheckableTag>
            ))}
          </Panel>
          <Divider dashed="true" />
          <Panel
            header={
              <span style={{ color: "white" }}>
                <b>游戏主题</b>
              </span>
            }
            key="2"
            className="site-collapse-custom-panel"
            extra={<span style={{ color: "white" }}>展开</span>}
          >
            {filterTypes.theme.map((tag) => (
              <CheckableTag
                key={tag}
                checked={this.tagAlreadyExist(tag)}
                onChange={(checked) =>
                  this.handleGameTagChange(checked, "theme", tag)
                }
                style={{
                  float: "left",
                  width: "16%",
                  color: "white",
                  fontSize: "15px",
                  fontFamily: "KaiTi",
                }}
              >
                {tag}
              </CheckableTag>
            ))}
          </Panel>
          <Divider dashed="true" />
          <Panel
            header={
              <span style={{ color: "white" }}>
                <b>游戏模式</b>
              </span>
            }
            key="3"
            className="site-collapse-custom-panel"
            extra={<span style={{ color: "white" }}>展开</span>}
          >
            {filterTypes.mode.map((tag) => (
              <CheckableTag
                key={tag}
                checked={this.tagAlreadyExist(tag)}
                onChange={(checked) =>
                  this.handleGameTagChange(checked, "mode", tag)
                }
                style={{
                  float: "left",
                  width: "16%",
                  color: "white",
                  fontSize: "15px",
                  fontFamily: "KaiTi",
                }}
              >
                {tag}
              </CheckableTag>
            ))}
          </Panel>
          <Divider dashed="true" />
          <Panel
            header={
              <span style={{ color: "white" }}>
                <b>游戏风格</b>
              </span>
            }
            key="4"
            className="site-collapse-custom-panel"
            extra={<span style={{ color: "white" }}>展开</span>}
          >
            {filterTypes.style.map((tag) => (
              <CheckableTag
                key={tag}
                checked={this.tagAlreadyExist(tag)}
                onChange={(checked) =>
                  this.handleGameTagChange(checked, "style", tag)
                }
                style={{
                  float: "left",
                  width: "16%",
                  color: "white",
                  fontSize: "15px",
                  fontFamily: "KaiTi",
                }}
              >
                {tag}
              </CheckableTag>
            ))}
          </Panel>
          <Divider dashed="true" />
          <Panel
            header={
              <span style={{ color: "white" }}>
                <b>发行时间</b>
              </span>
            }
            key="5"
            className="site-collapse-custom-panel"
            extra={<span style={{ color: "white" }}>展开</span>}
          >
            {filterTypes.year.map((tag) => (
              <CheckableTag
                key={tag}
                checked={this.tagAlreadyExist(tag)}
                onChange={(checked) =>
                  this.handleGameTagChange(checked, "year", tag)
                }
                style={{
                  float: "left",
                  width: "16%",
                  color: "white",
                  fontSize: "15px",
                  fontFamily: "KaiTi",
                }}
              >
                {tag}
              </CheckableTag>
            ))}
          </Panel>
          <Divider dashed="true" />
        </Collapse>
        ,
      </div>
    );
  }
}

class TypeTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTags: props.typeTags,
    };
  }

  handleChange(tag, checked) {
    const selectedTags = this.state.selectedTags;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.recvFunc(nextSelectedTags);
  }

  render() {
    //console.log(this.state.selectedTags);
    if (this.props.type === "all") {
      const selectedTags = this.state.selectedTags;
      return (
        <>
          <span style={{ fontSize: "15px", color: "white" }}>
            <b>筛选结果：</b>
          </span>
          {searchTypes.map((tag) => (
            <CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => this.handleChange(tag, checked)}
              style={{ color: "white" }}
            >
              {tag}
            </CheckableTag>
          ))}
        </>
      );
    } else {
      return null;
    }
  }
}

class SearchBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeTags: props.searchTypeTags,
      value: props.keyWord,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTypeTags = this.getTypeTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectChange(value) {
    this.setState({ type: value });
  }

  handleInputChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(value) {
    if (this.state.value.trim() === "") {
      message.error("搜索框不能为空");
      return;
    }
    await this.props.handleChangeKeyword({ value });
    this.props.handleSearch();
  }

  getTypeTags(res) {
    this.setState({ typeTags: res });
    this.props.recvTypeFunc(res);
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={require("../assets/logo.png")} width="15%"></img>
          <Search
            addonBefore={
              <Select
                defaultValue={this.props.type}
                className="select-before"
                onChange={(value) =>
                  this.props.handleToggleSearchType({ value })
                }
              >
                <Option value="all">搜全站</Option>
                <Option value="games">搜游戏</Option>
                <Option value="news">搜资讯</Option>
                <Option value="methods">搜攻略</Option>
                <Option value="videos">搜视频</Option>
              </Select>
            }
            value={this.state.value}
            enterButton={
              <Button type="primary" icon={<SearchOutlined />}>
                Search
              </Button>
            }
            size="large"
            style={{ width: "40%", marginLeft: "1%" }}
            onChange={this.handleInputChange}
            onSearch={this.handleSubmit}
          />
        </div>
        <div style={{ marginTop: "1%" }}>
          <TypeTags
            typeTags={this.state.typeTags}
            type={this.props.type}
            recvFunc={this.getTypeTags}
          />
          {this.props.type === "games" && <GameTags {...this.props} />}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBlock);
