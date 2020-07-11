import React, { Component } from "react";
import SearchBlock from "../components/SearchBlock";
import ResultCard from "../components/ResultCard";
import { FrownOutlined, ToTopOutlined } from "@ant-design/icons";
import { Pagination, Spin, Result, BackTop } from "antd";
import { connect } from "react-redux";
import {
  addFilter,
  removeFilter,
  toggleSearchType,
  changeKeyword,
} from "../store/actions";
import axios from "axios";
import { autobind } from "core-decorators";
import "../index.css";

const style = {
  height: 40,
  width: 60,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: 'transparent',
  color: 'white',
  textAlign: 'center',
  fontSize: 20,
};

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

function Loading(props) {
  if (props.isLoading === true)
    return (
      <Spin
        size="large"
        tip="加载中"
        style={{
          width: "93.3%",
          margin: "0 auto",
          marginTop: "1%",
          textAlign: "center",
        }}
      />
    );
  else return null;
}

function EmptyResult(props) {
  if (props.isEmpty === true)
    return <Result icon={<FrownOutlined />} title="暂无相关结果" />;
  else return null;
}

class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTypeTags: ["游戏", "资讯", "攻略", "视频"],
      gameIDs: new Array(),
      gameNames: new Array(),
      gameTags: new Array(),
      gameDates: new Array(),
      publishers: new Array(),
      developers: new Array(),
      gameInfos: new Array(),
      gameImgUrls: new Array(),
      resourceTypes: new Array(),
      titles: new Array(),
      sources: new Array(),
      resourceDates: new Array(),
      resourceInfos: new Array(),
      resourceImgUrls: new Array(),
      resourceDetailUrls: new Array(),
      isLoading: true,
      cards: new Array(),
      showCards: new Array(),
      page: 1,
      pageSize: 10,
      isSort: false,
    };
  }

  @autobind
  async postGameData() {
    this.setState({ isLoading: true });
    var tmpGameNames = [];
    var tmpGameTags = [];
    var tmpReleaseDates = [];
    var tmpPublishers = [];
    var tmpDevelopers = [];
    var tmpInfos = [];
    var tmpImgUrls = [];
    var tmpIDs = [];
    await axios
      .post("/game", {
        filter: this.props.filters,
        keyword: this.props.keyWord,
        size: 100,
      })
      .then((res) => {
        if (res.data.result) {
          const rawStrs = res.data.result;
          rawStrs.forEach((data) => {
            const obj = JSON.parse(data.source);
            var highlightName, highlightDeveloper, highlightPublisher;
            var reg1 = new RegExp("<em>", "g");
            var reg2 = new RegExp("</em>", "g");
            if (typeof data.highlight.game_name !== "undefined") {
              highlightName = data.highlight.game_name.field[0];
              highlightName = highlightName.replace(reg1, "<span style='color: red'>");
              highlightName = highlightName.replace(reg2, "</span>");
            } else {
              highlightName = obj.game_name;
            }
            if (typeof data.highlight.developer !== "undefined") {
              highlightDeveloper = data.highlight.developer.field[0];
              highlightDeveloper = highlightDeveloper.replace(reg1, "<span style='color: red'>");
              highlightDeveloper = highlightDeveloper.replace(reg2, "</span>");
            } else {
              highlightDeveloper = obj.developer;
            }
            if (typeof data.highlight.publisher !== "undefined") {
              highlightPublisher = data.highlight.publisher.field[0];
              highlightPublisher = highlightPublisher.replace(reg1, "<span style='color: red'>");
              highlightPublisher = highlightPublisher.replace(reg2, "</span>");
            } else {
              highlightPublisher = obj.publisher;
            }
            tmpGameNames.push(highlightName);
            tmpGameTags.push(obj.tags);
            tmpReleaseDates.push(obj.release_date);
            tmpPublishers.push(highlightDeveloper);
            tmpDevelopers.push(highlightPublisher);
            tmpInfos.push(obj.info);
            tmpIDs.push(data.id);
            if(typeof(obj.imgs) === 'string') tmpImgUrls.push(obj.imgs);
            else tmpImgUrls.push(obj.imgs[0]);
          });
          this.setState({
            gameNames: tmpGameNames,
            gameTags: tmpGameTags,
            gameDates: tmpReleaseDates,
            publishers: tmpPublishers,
            developers: tmpDevelopers,
            gameInfos: tmpInfos,
            gameImgUrls: tmpImgUrls,
            gameIDs: tmpIDs,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    var tmpCards = [];
    for (var i = 0; i < tmpGameNames.length; i++) {
      tmpCards.push(
        <ResultCard
          cardType="games"
          gameName={tmpGameNames[i]}
          gameTags={tmpGameTags[i]}
          date={tmpReleaseDates[i]}
          publisher={tmpPublishers[i]}
          developer={tmpDevelopers[i]}
          info={tmpInfos[i]}
          imgUrl={tmpImgUrls[i]}
          gameID={tmpIDs[i]}
          key={tmpGameNames[i]}
        />
      );
    }
    var tmpShowCards = [];
    var start = 0;
    var end = 10 > tmpCards.length ? tmpCards.length : 10;
    for (var i = start; i < end; i++) tmpShowCards.push(tmpCards[i]);
    this.setState({ cards: tmpCards, showCards: tmpShowCards });
    this.setState({ isLoading: false });
  }

  @autobind
  async postResourceData(type, isSort) {
    this.setState({ isLoading: true });

    var tmpGameNames = [];
    var tmpGameTags = [];
    var tmpReleaseDates = [];
    var tmpPublishers = [];
    var tmpDevelopers = [];
    var tmpGameInfos = [];
    var tmpGameImgUrls = [];
    var tmpGameIDs = [];

    var tmpResourceTypes = [];
    var tmpTitles = [];
    var tmpResourceDates = [];
    var tmpResourceInfos = [];
    var tmpResourceImgUrls = [];
    var tmpResourceDetailUrls = [];
    var tmpSources = [];

    var api;
    if (type === "all") api = "/global";
    else if (type === "news") api = "/news";
    else if (type === "methods") api = "/raiders";
    else api = "/video";

    var reg1 = new RegExp("<em>", "g");
    var reg2 = new RegExp("</em>", "g");

    await axios
      .post(api, { keyword: this.props.keyWord, size: 100, sort: isSort })
      .then((res) => {
        if (res.data) {
          if (type === "all") {
            var rawGameStrs = res.data.gameResult;
            for (var i = 0; i < rawGameStrs.length; i++) {
              const obj = JSON.parse(rawGameStrs[i].source);
              var highlightName, highlightDeveloper, highlightPublisher;
              if (typeof rawGameStrs[i].highlight.game_name !== "undefined") {
                highlightName = rawGameStrs[i].highlight.game_name.field[0];
                highlightName = highlightName.replace(reg1, "<span style='color: red'>");
                highlightName = highlightName.replace(reg2, "</span>");
              } else {
                highlightName = obj.game_name;
              }
              if (typeof rawGameStrs[i].highlight.developer !== "undefined") {
                highlightDeveloper = rawGameStrs[i].highlight.developer.field[0];
                highlightDeveloper = highlightDeveloper.replace(reg1, "<span style='color: red'>");
                highlightDeveloper = highlightDeveloper.replace(reg2, "</span>");
              } else {
                highlightDeveloper = obj.developer;
              }
              if (typeof rawGameStrs[i].highlight.publisher !== "undefined") {
                highlightPublisher = rawGameStrs[i].highlight.publisher.field[0];
                highlightPublisher = highlightPublisher.replace(reg1, "<span style='color: red'>");
                highlightPublisher = highlightPublisher.replace(reg2, "</span>");
              } else {
                highlightPublisher = obj.publisher;
              }
              tmpGameNames.push(highlightName);
              tmpGameTags.push(obj.tags);
              tmpReleaseDates.push(obj.release_date);
              tmpPublishers.push(highlightPublisher);
              tmpDevelopers.push(highlightDeveloper);
              tmpGameInfos.push(obj.info);
              tmpGameIDs.push(rawGameStrs[i].id);
              if(typeof(obj.imgs) === 'string') tmpGameImgUrls.push(obj.imgs);
              else tmpGameImgUrls.push(obj.imgs[0]);
            }
            var rawResourceStrs = res.data.resourceResult;
            for (var i = 0; i < rawResourceStrs.length; i++) {
              const obj = JSON.parse(rawResourceStrs[i].source);
              var highlightTitle, highlightInfo;
              if (typeof rawResourceStrs[i].highlight.title !== "undefined") {
                highlightTitle = rawResourceStrs[i].highlight.title.field[0];
                highlightTitle = highlightTitle.replace(reg1, "<span style='color: red'>");
                highlightTitle = highlightTitle.replace(reg2, "</span>");
              } else {
                highlightTitle = obj.title;
              }
              if (typeof rawResourceStrs[i].highlight.info !== "undefined") {
                highlightInfo = rawResourceStrs[i].highlight.info.field[0];
                highlightInfo = highlightInfo.replace(reg1, "<span style='color: red'>");
                highlightInfo = highlightInfo.replace(reg2, "</span>");
              } else {
                highlightInfo = obj.info;
              }
              if (parseInt(obj.type) === 0) tmpResourceTypes.push("news");
              else if (parseInt(obj.type) === 1) tmpResourceTypes.push("videos");
              else tmpResourceTypes.push("methods");
              tmpTitles.push(highlightTitle);
              tmpResourceDates.push(obj.time);
              tmpResourceInfos.push(highlightInfo);
              tmpResourceImgUrls.push(obj.img_url);
              tmpResourceDetailUrls.push(obj.url);
              tmpSources.push(obj.source);
            }
            this.setState({
              gameNames: tmpGameNames,
              gameTags: tmpGameTags,
              gameDates: tmpReleaseDates,
              publishers: tmpPublishers,
              developers: tmpDevelopers,
              gameInfos: tmpGameInfos,
              gameImgUrls: tmpGameImgUrls,
              gameIDs: tmpGameIDs,
              resourceTypes: tmpResourceTypes,
              titles: tmpTitles,
              resourceDates: tmpResourceDates,
              resourceInfos: tmpResourceInfos,
              resourceImgUrls: tmpResourceImgUrls,
              resourceDetailUrls: tmpResourceDetailUrls,
            });
          } else {
            var rawStrs = res.data.result;
            for (var i = 0; i < rawStrs.length; i++) {
              const obj = JSON.parse(rawStrs[i].source);
              var highlightTitle, highlightInfo;
              if (typeof rawStrs[i].highlight.title !== "undefined") {
                highlightTitle = rawStrs[i].highlight.title.field[0];
                highlightTitle = highlightTitle.replace(reg1, "<span style='color: red'>");
                highlightTitle = highlightTitle.replace(reg2, "</span>");
              } else {
                highlightTitle = obj.title;
              }
              if (typeof rawStrs[i].highlight.info !== "undefined") {
                highlightInfo = rawStrs[i].highlight.info.field[0];
                highlightInfo = highlightInfo.replace(reg1, "<span style='color: red'>");
                highlightInfo = highlightInfo.replace(reg2, "</span>");
              } else {
                highlightInfo = obj.info;
              }
              if (parseInt(obj.type) === 0) tmpResourceTypes.push("news");
              else if (parseInt(obj.type) === 1) tmpResourceTypes.push("videos");
              else tmpResourceTypes.push("methods");
              tmpTitles.push(highlightTitle);
              tmpResourceDates.push(obj.time);
              tmpResourceInfos.push(highlightInfo);
              tmpResourceImgUrls.push(obj.img_url);
              tmpResourceDetailUrls.push(obj.url);
              tmpSources.push(obj.source);
            }
            this.setState({
              resourceTypes: tmpResourceTypes,
              titles: tmpTitles,
              resourceDates: tmpResourceDates,
              resourceInfos: tmpResourceInfos,
              resourceImgUrls: tmpResourceImgUrls,
              resourceDetailUrls: tmpResourceDetailUrls,
            });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    var tmpCards = [];
    if (type === "all") {
      for (var i = 0; i < tmpGameNames.length; i++) {
        tmpCards.push(
          <ResultCard
            cardType="games"
            gameName={tmpGameNames[i]}
            gameTags={tmpGameTags[i]}
            date={tmpReleaseDates[i]}
            publisher={tmpPublishers[i]}
            developer={tmpDevelopers[i]}
            info={tmpGameInfos[i]}
            imgUrl={tmpGameImgUrls[i]}
            gameID={tmpGameIDs[i]}
            key={tmpGameNames[i]}
          />
        );
      }
      for (var i = 0; i < tmpTitles.length; i++) {
        tmpCards.push(
          <ResultCard
            cardType={tmpResourceTypes[i]}
            title={tmpTitles[i]}
            date={tmpResourceDates[i]}
            source={tmpSources[i]}
            info={tmpResourceInfos[i]}
            imgUrl={tmpResourceImgUrls[i]}
            detailUrl={tmpResourceDetailUrls[i]}
            key={tmpTitles[i]}
          />
        );
      }
    } else {
      for (var i = 0; i < tmpTitles.length; i++) {
        tmpCards.push(
          <ResultCard
            cardType={tmpResourceTypes[i]}
            title={tmpTitles[i]}
            date={tmpResourceDates[i]}
            source={tmpSources[i]}
            info={tmpResourceInfos[i]}
            imgUrl={tmpResourceImgUrls[i]}
            detailUrl={tmpResourceDetailUrls[i]}
            key={tmpTitles[i]}
          />
        );
      }
    }
    var tmpShowCards = [];
    var start = 0;
    var end = 10 > tmpCards.length ? tmpCards.length : 10;
    for (var i = start; i < end; i++) tmpShowCards.push(tmpCards[i]);
    this.setState({ cards: tmpCards, showCards: tmpShowCards });
    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    if (this.props.type === "games") {
      await this.postGameData();
    } else {
      await this.postResourceData(this.props.type, false);
    }
  }

  @autobind
  handlePageChange(page, pageSize) {
    this.setState({ page: page, pageSize: pageSize });
    var tmpShowCards = [];
    var start = (page - 1) * pageSize;
    var end = (start + pageSize < this.state.cards.length) ? (start + pageSize) : this.state.cards.length;
    for (var i = start; i < end; i++) tmpShowCards.push(this.state.cards[i]);
    this.setState({ showCards: tmpShowCards });
  }

  @autobind
  getTypeTags(res) {
    this.setState(
      {
        searchTypeTags: res,
      },
      () => {
        this.setState({ isLoading: true });
        var tmp = res.slice();
        for (var i = 0; i < tmp.length; i++) {
          if (tmp[i] === "游戏") tmp[i] = "games";
          else if (tmp[i] === "资讯") tmp[i] = "news";
          else if (tmp[i] === "攻略") tmp[i] = "methods";
          else tmp[i] = "videos";
        }
        var tmpCards = [];
        if (tmp.indexOf("games") !== -1)
          for (var i = 0; i < this.state.gameNames.length; i++) {
            tmpCards.push(
              <ResultCard
                cardType="games"
                gameName={this.state.gameNames[i]}
                gameTags={this.state.gameTags[i]}
                date={this.state.gameDates[i]}
                publisher={this.state.publishers[i]}
                developer={this.state.developers[i]}
                info={this.state.gameInfos[i]}
                imgUrl={this.state.gameImgUrls[i]}
                gameID={this.state.gameIDs[i]}
                key={this.state.gameNames[i]}
              />
            );
          }
        for (var i = 0; i < this.state.titles.length; i++) {
          if (tmp.indexOf(this.state.resourceTypes[i]) !== -1)
            tmpCards.push(
              <ResultCard
                cardType={this.state.resourceTypes[i]}
                title={this.state.titles[i]}
                date={this.state.resourceDates[i]}
                source={this.state.sources[i]}
                info={this.state.resourceInfos[i]}
                imgUrl={this.state.resourceImgUrls[i]}
                detailUrl={this.state.resourceDetailUrls[i]}
                key={this.state.titles[i]}
              />
            );
        }
        var tmpShowCards = [];
        var start = 0;
        var end = 10 > tmpCards.length ? tmpCards.length : 10;
        for (var i = start; i < end; i++) tmpShowCards.push(tmpCards[i]);
        this.setState({ cards: tmpCards, showCards: tmpShowCards });
        this.setState({ isLoading: false });
      }
    );
  }

  @autobind
  getSortType(isSort) {
    this.setState({isSort: Boolean(isSort)});
    if (isSort) this.postResourceData(this.props.type, true);
    else this.postResourceData(this.props.type, false);
  }
  
  @autobind
  handleSearch() {
    this.setState({searchTypeTags: ["游戏", "资讯", "攻略", "视频"], isSort: false});
    if (this.props.type === "games") {
      this.postGameData();
    } else {
      this.postResourceData(this.props.type, false);
    }
  }

  render() {
    var isEmptyShow = (this.state.showCards.length === 0 && !this.state.isLoading) ? true : false;
    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: "url(" + require("../assets/bgd4.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          {/* <header style={{fontSize: '18px', color: 'white', marginTop: '20px', marginLeft: '30px', fontFamily: 'KaiTi'}}><KeyOutlined />&nbsp;探寻游戏之美</header> */}
          {/* 搜索区域，含标签 */}
          <div
            style={{
              width: "100%",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <SearchBlock
              {...this.props}
              isSort={this.state.isSort}
              searchTypeTags={this.state.searchTypeTags}
              handleSearch={this.handleSearch}
              recvTypeFunc={this.getTypeTags}
              recvSortFunc={this.getSortType}
              handleTagChange={this.postGameData}
            />
          </div>
          {/* 结果展示区域，以卡片形式分页，每页10个 */}
          <div
            style={{
              width: "70%",
              minHeight: document.body.clientHeight,
              margin: "0 auto",
              backgroundColor: "rgb(245,245,245,0.4)",
            }}
          >
            {this.state.cards.length < 10 && <br />}
            <Pagination
              hideOnSinglePage={false}
              showSizeChanger={false}
              showQuickJumper={true}
              current={this.state.page}
              defaultCurrent={this.state.page}
              hideOnSinglePage={true}
              total={this.state.cards.length}
              onChange={this.handlePageChange}
              style={{
                width: "93.3%",
                margin: "0 auto",
                marginTop: "1%",
                paddingTop: "1%",
                textAlign: "center",
              }}
            />
            <Loading isLoading={this.state.isLoading} />
            <EmptyResult isEmpty={isEmptyShow} />
            {this.state.showCards}
            <Pagination
              hideOnSinglePage={false}
              showSizeChanger={false}
              showQuickJumper={true}
              current={this.state.page}
              defaultCurrent={this.state.page}
              hideOnSinglePage={true}
              total={this.state.cards.length}
              onChange={this.handlePageChange}
              style={{
                width: "93.3%",
                margin: "0 auto",
                marginTop: "1%",
                paddingBottom: "1%",
                textAlign: "center",
              }}
            />
            {this.state.cards.length < 10 && <br />}
          </div>
        </div>
        <BackTop>
          <div style={style}><ToTopOutlined />&nbsp;Top</div>
        </BackTop>
      </div>
    );
  }
}

const ResultPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultPage);

export default ResultPageContainer;
