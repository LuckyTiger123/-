import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import { Row, Col, Carousel } from "antd";
import { Link } from "react-router-dom";
import { KeyOutlined } from "@ant-design/icons";
import {
  addFilter,
  removeFilter,
  toggleSearchType,
  changeKeyword,
} from "../store/actions";
import axios from "axios";
import { connect } from "react-redux";
import "../index.css";

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddFilter: (val) => {
      dispatch(addFilter(val));
    },
    handleRemoveFilter: (val) => {
      dispatch(removeFilter(val));
    },
    handleToggleSearchType: (val) => {
      dispatch(toggleSearchType(val));
    },
    handleChangeKeyword: (val) => {
      dispatch(changeKeyword(val));
    },
  };
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameImgUrls: [],
      gameIDs: [],
    };
  }

  componentDidMount() {
    var page = Math.floor(Math.random() * 20 + 1);
    axios
      .post("/game/index", { pageSize: 16, page: page })
      .then((res) => {
        var rawStrs = res.data.result;
        var tmpImgUrls = [];
        var tmpIDs = [];
        for (var i = 0; i < rawStrs.length; i++) {
          const obj = JSON.parse(rawStrs[i].source);
          tmpIDs.push(rawStrs[i].id);
          if (typeof(obj.imgs) === 'string') tmpImgUrls.push(obj.imgs);
          else tmpImgUrls.push(obj.imgs[0]);
        }
        this.setState({ gameImgUrls: tmpImgUrls, gameIDs: tmpIDs });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    var items = new Array();
    for (var i = 0; i < 4; i++) {
      items.push(new Array());
      for (var j = 0; j < 4; j++) {
        items[i].push(
          <Col span={12} style={{ height: "200px" }}>
            <Link to={"/info/" + this.state.gameIDs[i * 4 + j]} target="_blank">
              <img src={this.state.gameImgUrls[i * 4 + j]} width="90%"></img>
            </Link>
          </Col>
        );
      }
    }
    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "fixed",
            backgroundImage: "url(" + require("../assets/bgd4.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <header
            style={{
              fontSize: "18px",
              color: "white",
              marginTop: "20px",
              marginLeft: "30px",
              fontFamily: "KaiTi",
            }}
          >
            <KeyOutlined />
            &nbsp;探寻游戏之美
          </header>
          <div
            style={{
              height: "80%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <SearchBar {...this.props} />
            <div
              style={{
                width: "33%",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "KaiTi",
                }}
              >
                游戏推荐：
              </p>
              <Carousel autoplay>
                <div>
                  <Row>{items[0]}</Row>
                </div>
                <div>
                  <Row>{items[1]}</Row>
                </div>
                <div>
                  <Row>{items[2]}</Row>
                </div>
                <div>
                  <Row>{items[3]}</Row>
                </div>
              </Carousel>
            </div>
          </div>
          <footer
            style={{
              marginTop: "50px",
              textAlign: "center",
              color: "white",
              fontSize: "15px",
              fontFamily: "KaiTi",
            }}
          >
            Copyright © 浙江大学计算机科学与技术学院
            <br />
            杨佳妮 方陶然 翁罗轩 胡欣雨 赵晨阳
          </footer>
        </div>
      </div>
    );
  }
}

const SearchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);

export default SearchPageContainer;
