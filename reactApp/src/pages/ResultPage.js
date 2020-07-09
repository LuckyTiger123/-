import React, { Component } from 'react';
import SearchBlock from '../components/SearchBlock';
import ResultCard from '../components/ResultCard';
import { RocketOutlined, ChromeOutlined, BookOutlined, FrownOutlined } from '@ant-design/icons'
import { Card, Tag, Pagination, Spin, Result } from 'antd';
import axios from 'axios';

function Loading(props) {
    if (props.isLoading === true)
        return <Spin size="large" tip="加载中" style={{width: '93.3%', margin: '0 auto', marginTop: '1%', textAlign: 'center'}} />;
    else
        return null;
}

function EmptyResult(props) {
    if (props.isEmpty === true)
        return <Result icon={<FrownOutlined />} title="暂无相关结果" />;
    else
        return null;
}

class ResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.keyword : '',
            searchType: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchType : '',
            searchSize: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchSize : 100,
            searchDates: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchDates : new Array(),
            searchTags1: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchTags1 : new Array(),
            searchTags2: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchTags2 : new Array(),
            searchTags3: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchTags3 : new Array(),
            searchTypeTags: ['游戏', '资讯', '攻略', '视频'],
            gameNames: new Array(),
            gameTags: new Array(),
            gameDates: new Array(),
            publishers: new Array(),
            developers: new Array(),
            gameInfos: new Array(),
            gameImgUrls: new Array(),
            gameDetailUrls: new Array(),
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
        }
        this.postGameData = this.postGameData.bind(this);
        this.postResourceData = this.postResourceData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.getGameTags = this.getGameTags.bind(this);
        this.getTypeTags = this.getTypeTags.bind(this);
        this.reSearch = this.reSearch.bind(this);
    }

    async postGameData() {
        this.setState({isLoading: true});
        var filter = [];
        for (var i = 0; i < this.state.searchTags1.length; i++)
            filter.push({type: "type", value: this.state.searchTags1[i]});
        for (var i = 0; i < this.state.searchTags2.length; i++)
            filter.push({type: "theme", value: this.state.searchTags2[i]});
        for (var i = 0; i < this.state.searchTags3.length; i++)
            filter.push({type: "mode", value: this.state.searchTags3[i]});
        for (var i = 0; i < this.state.searchDates.length; i++)
            filter.push({type: "year", value: this.state.searchDates[i]});
        var tmpGameNames = [];
        var tmpGameTags = [];
        var tmpReleaseDates = [];
        var tmpPublishers = [];
        var tmpDevelopers = [];
        var tmpInfos = [];
        var tmpImgUrls = [];
        var tmpDetailUrls = [];
        await axios.post('/game', {filter: filter, keyword: this.state.keyword, size: 100}).then(res => {
            if (res.data.result) {
                var rawStrs = res.data.result;
                for (var i = 0; i < rawStrs.length; i++) {
                    const obj = JSON.parse(rawStrs[i].source);
                    var highlightName = rawStrs[i].highlight.game_name.field[0];
                    var reg1 = new RegExp('<em>', "g");
                    var reg2 = new RegExp('</em>', "g");
                    highlightName = highlightName.replace(reg1, "<span style='color: red'>");
                    highlightName = highlightName.replace(reg2, "</span>");
                    tmpGameNames.push(highlightName);
                    tmpGameTags.push(obj.tags);
                    tmpReleaseDates.push(obj.release_date);
                    tmpPublishers.push(obj.publisher);
                    tmpDevelopers.push(obj.developer);
                    tmpInfos.push(obj.info);
                    tmpDetailUrls.push('http://localhost:3000/info/' + rawStrs[i].id);
                    tmpImgUrls.push((obj.imgs)[0]);
                }
                this.setState({gameNames: tmpGameNames, gameTags: tmpGameTags, gameDates: tmpReleaseDates, publishers: tmpPublishers, developers: tmpDevelopers,
                            gameInfos: tmpInfos, gameImgUrls: tmpImgUrls, gameDetailUrls: tmpDetailUrls});
            }
        }).catch(error => {
            console.error(error);
        })
        var tmpCards = [];
        for (var i = 0; i < tmpGameNames.length; i++) {
            tmpCards.push(<ResultCard cardType='games' gameName={tmpGameNames[i]} gameTags={tmpGameTags[i]}
                    date={tmpReleaseDates[i]} publisher={tmpPublishers[i]} developer={tmpDevelopers[i]} 
                    info={tmpInfos[i]} imgUrl={tmpImgUrls[i]} detailUrl={tmpDetailUrls[i]} key={tmpGameNames[i]} />)
        }
        var tmpShowCards = [];
        var start = 0;
        var end = (10 > tmpCards.length) ? tmpCards.length : 10;
        for (var i = start; i < end; i++)
            tmpShowCards.push(tmpCards[i]);
        this.setState({cards: tmpCards, showCards: tmpShowCards});
        this.setState({isLoading: false});
    }

    async postResourceData(type) {
        this.setState({isLoading: true});

        var tmpGameNames = [];
        var tmpGameTags = [];
        var tmpReleaseDates = [];
        var tmpPublishers = [];
        var tmpDevelopers = [];
        var tmpGameInfos = [];
        var tmpGameImgUrls = [];
        var tmpGameDetailUrls = [];

        var tmpResourceTypes = [];
        var tmpTitles = [];
        var tmpResourceDates = [];
        var tmpResourceInfos = [];
        var tmpResourceImgUrls = [];
        var tmpResourceDetailUrls = [];
        var tmpSources = [];

        var api;
        if (type === 'all')
            api = '/global';
        else if (type === 'news')
            api = '/news';
        else if (type === 'methods')
            api = '/raiders';
        else
            api = '/video';

        var reg1 = new RegExp('<em>', "g");
        var reg2 = new RegExp('</em>', "g");

        await axios.post(api, {keyword: this.state.keyword, size: 100}).then(res => {
            if (res.data) {
                if (type === 'all') {
                    var rawGameStrs = res.data.gameResult;
                    for (var i = 0; i < rawGameStrs.length; i++) {
                        const obj = JSON.parse(rawGameStrs[i].source);
                        var highlightName = rawGameStrs[i].highlight.game_name.field[0];
                        highlightName = highlightName.replace(reg1, "<span style='color: red'>");
                        highlightName = highlightName.replace(reg2, "</span>");
                        tmpGameNames.push(highlightName);
                        tmpGameTags.push(obj.tags);
                        tmpReleaseDates.push(obj.release_date);
                        tmpPublishers.push(obj.publisher);
                        tmpDevelopers.push(obj.developer);
                        tmpGameInfos.push(obj.info);
                        tmpGameDetailUrls.push('http://localhost:3000/info/' + rawGameStrs[i].id);
                        tmpGameImgUrls.push((obj.imgs)[0]);
                    }
                    var rawResourceStrs = res.data.resourceResult;
                    for (var i = 0; i < rawResourceStrs.length; i++) {
                        const obj = JSON.parse(rawResourceStrs[i].source);
                        var highlightTitle, highlightInfo;
                        if (rawResourceStrs[i].highlight.title) {
                            highlightTitle = rawResourceStrs[i].highlight.title.field[0];
                            highlightTitle = highlightTitle.replace(reg1, "<span style='color: red'>");
                            highlightTitle = highlightTitle.replace(reg2, "</span>");
                        } else {
                            highlightTitle = obj.title;
                        }
                        if (rawResourceStrs[i].highlight.info) {
                            highlightInfo = rawResourceStrs[i].highlight.info.field[0];
                            highlightInfo = highlightInfo.replace(reg1, "<span style='color: red'>");
                            highlightInfo = highlightInfo.replace(reg2, "</span>");
                        } else {
                            highlightInfo = obj.info;
                        }
                        if (parseInt(obj.type) === 0)
                            tmpResourceTypes.push('news');
                        else if (parseInt(obj.type) === 1)
                            tmpResourceTypes.push('videos');
                        else
                            tmpResourceTypes.push('methods');
                        tmpTitles.push(highlightTitle);
                        tmpResourceDates.push(obj.time);
                        tmpResourceInfos.push(highlightInfo);
                        tmpResourceImgUrls.push(obj.img_url);
                        tmpResourceDetailUrls.push(obj.url);
                        tmpSources.push(obj.source);
                    }
                    this.setState({gameNames: tmpGameNames, gameTags: tmpGameTags, gameDates: tmpReleaseDates, publishers: tmpPublishers, developers: tmpDevelopers,
                            gameInfos: tmpGameInfos, gameImgUrls: tmpGameImgUrls, gameDetailUrls: tmpGameDetailUrls, resourceTypes: tmpResourceTypes, titles: tmpTitles, resourceDates: tmpResourceDates, 
                            resourceInfos: tmpResourceInfos, resourceImgUrls: tmpResourceImgUrls, resourceDetailUrls: tmpResourceDetailUrls});
                } else {
                    var rawStrs = res.data.result;
                    for (var i = 0; i < rawStrs.length; i++) {
                        const obj = JSON.parse(rawStrs[i].source);
                        var highlightTitle, highlightInfo;
                        if (rawStrs[i].highlight.title) {
                            highlightTitle = rawStrs[i].highlight.title.field[0];
                            highlightTitle = highlightTitle.replace(reg1, "<span style='color: red'>");
                            highlightTitle = highlightTitle.replace(reg2, "</span>");
                        } else {
                            highlightTitle = obj.title;
                        }
                        if (rawStrs[i].highlight.info) {
                            highlightInfo = rawStrs[i].highlight.info.field[0];
                            highlightInfo = highlightInfo.replace(reg1, "<span style='color: red'>");
                            highlightInfo = highlightInfo.replace(reg2, "</span>");
                        } else {
                            highlightInfo = obj.info;
                        }
                        if (parseInt(obj.type) === 0)
                            tmpResourceTypes.push('news');
                        else if (parseInt(obj.type) === 1)
                            tmpResourceTypes.push('video');
                        else
                            tmpResourceTypes.push('method');
                        tmpTitles.push(highlightTitle);
                        tmpResourceDates.push(obj.time);
                        tmpResourceInfos.push(highlightInfo);
                        tmpResourceImgUrls.push(obj.img_url);
                        tmpResourceDetailUrls.push(obj.url);
                        tmpSources.push(obj.source);
                    }
                    this.setState({resourceTypes: tmpResourceTypes, titles: tmpTitles, resourceDates: tmpResourceDates, resourceInfos: tmpResourceInfos, 
                        resourceImgUrls: tmpResourceImgUrls, resourceDetailUrls: tmpResourceDetailUrls});
                }
            }
        }).catch(error => {
            console.error(error);
        })
        var tmpCards = [];
        if (type === 'all') {
            for (var i = 0; i < tmpGameNames.length; i++) {
                tmpCards.push(<ResultCard cardType='games' gameName={tmpGameNames[i]} gameTags={tmpGameTags[i]}
                        date={tmpReleaseDates[i]} publisher={tmpPublishers[i]} developer={tmpDevelopers[i]} 
                        info={tmpGameInfos[i]} imgUrl={tmpGameImgUrls[i]} detailUrl={tmpGameDetailUrls[i]} key={tmpGameNames[i]} />)
            }
            for (var i = 0; i < tmpTitles.length; i++) {
                tmpCards.push(<ResultCard cardType={tmpResourceTypes[i]} title={tmpTitles[i]} date={tmpResourceDates[i]}
                        source={tmpSources[i]} info={tmpResourceInfos[i]} imgUrl={tmpResourceImgUrls[i]} detailUrl={tmpResourceDetailUrls[i]} key={tmpTitles[i]} />);
            }
        } else {
            for (var i = 0; i < tmpTitles.length; i++) {
                tmpCards.push(<ResultCard cardType={tmpResourceTypes[i]} title={tmpTitles[i]} date={tmpResourceDates[i]}
                        source={tmpSources[i]} info={tmpResourceInfos[i]} imgUrl={tmpResourceImgUrls[i]} detailUrl={tmpResourceDetailUrls[i]} key={tmpTitles[i]} />);
            }
        }
        var tmpShowCards = [];
        var start = 0;
        var end = (10 > tmpCards.length) ? tmpCards.length : 10;
        for (var i = start; i < end; i++)
            tmpShowCards.push(tmpCards[i]);
        this.setState({cards: tmpCards, showCards: tmpShowCards});
        this.setState({isLoading: false});
    }

    async componentDidMount() {
        if (this.props.location.query && this.props.location.query.lastPage === 'home') {
            if (this.state.searchType === 'games') {
                await this.postGameData();
            } else {
                await this.postResourceData(this.state.searchType);
            }
            sessionStorage.setItem("gameNames", JSON.stringify(this.state.gameNames));
            sessionStorage.setItem("gameTags", JSON.stringify(this.state.gameTags));
            sessionStorage.setItem("gameDates", JSON.stringify(this.state.gameDates));
            sessionStorage.setItem("publishers", JSON.stringify(this.state.publishers));
            sessionStorage.setItem("developers", JSON.stringify(this.state.developers));
            sessionStorage.setItem("gameInfos", JSON.stringify(this.state.gameInfos));
            sessionStorage.setItem("gameImgUrls", JSON.stringify(this.state.gameImgUrls));
            sessionStorage.setItem("gameDetailUrls", JSON.stringify(this.state.gameDetailUrls));
            sessionStorage.setItem("resourceTypes", JSON.stringify(this.state.resourceTypes));
            sessionStorage.setItem("titles", JSON.stringify(this.state.titles));
            sessionStorage.setItem("sources", JSON.stringify(this.state.sources));
            sessionStorage.setItem("resourceDates", JSON.stringify(this.state.resourceDates));
            sessionStorage.setItem("resourceInfos", JSON.stringify(this.state.resourceInfos));
            sessionStorage.setItem("resourceImgUrls", JSON.stringify(this.state.resourceImgUrls));
            sessionStorage.setItem("resourceDetailUrls", JSON.stringify(this.state.resourceDetailUrls));
        }
    }

    reSearch(data) {
        this.setState({
            searchType: data.type,
            searchSize: 100,
            searchTags1: data.gameTags1,
            searchTags2: data.gameTags2,
            searchTags3: data.gameTags3,
            searchDates: data.gameTags4,
            keyword: data.value,
        }, async () => {
            if (this.state.searchType === 'games') {
                await this.postGameData();
            } else {
                await this.postResourceData(this.state.searchType);
            }
            sessionStorage.setItem("gameNames", JSON.stringify(this.state.gameNames));
            sessionStorage.setItem("gameTags", JSON.stringify(this.state.gameTags));
            sessionStorage.setItem("gameDates", JSON.stringify(this.state.gameDates));
            sessionStorage.setItem("publishers", JSON.stringify(this.state.publishers));
            sessionStorage.setItem("developers", JSON.stringify(this.state.developers));
            sessionStorage.setItem("gameInfos", JSON.stringify(this.state.gameInfos));
            sessionStorage.setItem("gameImgUrls", JSON.stringify(this.state.gameImgUrls));
            sessionStorage.setItem("gameDetailUrls", JSON.stringify(this.state.gameDetailUrls));
            sessionStorage.setItem("resourceTypes", JSON.stringify(this.state.resourceTypes));
            sessionStorage.setItem("titles", JSON.stringify(this.state.titles));
            sessionStorage.setItem("sources", JSON.stringify(this.state.sources));
            sessionStorage.setItem("resourceDates", JSON.stringify(this.state.resourceDates));
            sessionStorage.setItem("resourceInfos", JSON.stringify(this.state.resourceInfos));
            sessionStorage.setItem("resourceImgUrls", JSON.stringify(this.state.resourceImgUrls));
            sessionStorage.setItem("resourceDetailUrls", JSON.stringify(this.state.resourceDetailUrls));
        })
    }

    handlePageChange(page, pageSize) {
        this.setState({page: page, pageSize: pageSize});
        //console.log(page + ' ' + pageSize);
        var tmpShowCards = [];
        var start = (page - 1) * pageSize;
        var end = (start + pageSize < this.state.cards.length) ? (start + pageSize) : this.state.cards.length;
        for (var i = start; i < end; i++)
            tmpShowCards.push(this.state.cards[i]);
        this.setState({showCards: tmpShowCards});
    }

    getTypeTags(res) {
        this.setState({
            searchTypeTags: res
        }, () => {
            //console.log(this.state.searchTypeTags);
            this.setState({isLoading: true});
            var tmpGameNames = JSON.parse(sessionStorage.getItem("gameNames"));
            var tmpReleaseDates = JSON.parse(sessionStorage.getItem("gameDates"));
            var tmpGameTags = JSON.parse(sessionStorage.getItem("gameTags"));
            var tmpPublishers = JSON.parse(sessionStorage.getItem("publishers"));
            var tmpDevelopers = JSON.parse(sessionStorage.getItem("developers"));
            var tmpGameInfos = JSON.parse(sessionStorage.getItem("gameInfos"));
            var tmpGameImgUrls = JSON.parse(sessionStorage.getItem("gameImgUrls"));
            var tmpGameDetailUrls = JSON.parse(sessionStorage.getItem("gameDetailUrls"));
            var tmpResourceTypes = JSON.parse(sessionStorage.getItem("resourceTypes"));
            var tmpTitles = JSON.parse(sessionStorage.getItem("titles"));
            var tmpResourceDates = JSON.parse(sessionStorage.getItem("resourceDates"));
            var tmpSources = JSON.parse(sessionStorage.getItem("sources"));
            var tmpResourceInfos = JSON.parse(sessionStorage.getItem("resourceInfos"));
            var tmpResourceImgUrls = JSON.parse(sessionStorage.getItem("resourceImgUrls"));
            var tmpResourceDetailUrls = JSON.parse(sessionStorage.getItem("resourceDetailUrls"));
            
            var tmp = res.slice();
            for (var i = 0; i < tmp.length; i++) {
                if (tmp[i] === '游戏')
                    tmp[i] = 'games';
                else if (tmp[i] === '资讯')
                    tmp[i] = 'news';
                else if (tmp[i] === '攻略')
                    tmp[i] = 'methods';
                else
                    tmp[i] = 'videos';
            }
            var tmpCards = [];
            if (tmp.indexOf('games') !== -1)
                for (var i = 0; i < tmpGameNames.length; i++) {
                    tmpCards.push(<ResultCard cardType='games' gameName={tmpGameNames[i]} gameTags={tmpGameTags[i]}
                            date={tmpReleaseDates[i]} publisher={tmpPublishers[i]} developer={tmpDevelopers[i]} 
                            info={tmpGameInfos[i]} imgUrl={tmpGameImgUrls[i]} detailUrl={tmpGameDetailUrls[i]} key={tmpGameNames[i]} />)
                }
            for (var i = 0; i < tmpTitles.length; i++) {
                if (tmp.indexOf(tmpResourceTypes[i]) !== -1)
                    tmpCards.push(<ResultCard cardType={tmpResourceTypes[i]} title={tmpTitles[i]} date={tmpResourceDates[i]}
                            source={tmpSources[i]} info={tmpResourceInfos[i]} imgUrl={tmpResourceImgUrls[i]} detailUrl={tmpResourceDetailUrls[i]} key={tmpTitles[i]} />);
            }
            var tmpShowCards = [];
            var start = 0;
            var end = (10 > tmpCards.length) ? tmpCards.length : 10;
            for (var i = start; i < end; i++)
                tmpShowCards.push(tmpCards[i]);
            this.setState({cards: tmpCards, showCards: tmpShowCards});
            this.setState({isLoading: false});
        })
    }

    getGameTags(res1, res2, res3, res4) {
        this.setState({
            searchTags1: res1,
            searchTags2: res2,
            searchTags3: res3,
            searchDates: res4
        }, () => {
            console.log(this.state);
            this.postGameData();
        })
    }

    render() {
        //console.log(this.state.searchTypeTags);
        //console.log("render now");
        var isEmptyShow = (this.state.showCards.length === 0 && !this.state.isLoading)? true : false;
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%', width: '100%', backgroundImage: 'url(' + require('../assets/bgd4.jpg') + ')',
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
                    {/* <header style={{fontSize: '18px', color: 'white', marginTop: '20px', marginLeft: '30px', fontFamily: 'KaiTi'}}><KeyOutlined />&nbsp;探寻游戏之美</header> */}
                    {/* 搜索区域，含标签 */}
                    <div style={{width: '100%', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
                        <SearchBlock  recvTypeFunc={this.getTypeTags} recvGameFunc={this.getGameTags}  reSearchFunc={this.reSearch} keyword={this.state.keyword} searchType={this.state.searchType} searchTypeTags={this.state.searchTypeTags}
                                    searchTags1={this.state.searchTags1} searchTags2={this.state.searchTags2} searchTags3={this.state.searchTags3} searchDates={this.state.searchDates} />
                    </div>
                    {/* 结果展示区域，以卡片形式分页，每页5个 */}
                    <div style={{width: '75%', minHeight: document.body.clientHeight, margin: '0 auto', backgroundColor: 'rgb(245,245,245,0.4)'}}>
                        <Loading isLoading={this.state.isLoading} />
                        <EmptyResult isEmpty={isEmptyShow} />
                        {this.state.showCards}
                        <Pagination showSizeChanger={false} showQuickJumper={true}  current={this.state.page} hideOnSinglePage={true} total={this.state.cards.length} onChange={this.handlePageChange}
                            style={{width: '93.3%', margin: '0 auto', marginTop: '1%', textAlign: 'center'}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultPage;