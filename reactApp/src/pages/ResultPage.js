import React, { Component } from 'react';
import SearchBlock from '../components/SearchBlock';
import ResultCard from '../components/ResultCard';
import { RocketOutlined, ChromeOutlined, BookOutlined } from '@ant-design/icons'
import { Card, Tag, Pagination, Spin } from 'antd';
import axios from 'axios';

function Loading(props) {
    if (props.isLoading === true)
        return <Spin size="large" tip="加载中" style={{width: '93.3%', margin: '0 auto', marginTop: '1%', textAlign: 'center'}} />;
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
            searchTypeTags: ['games', 'news', 'methods', 'videos'],
            gameNames: new Array(),
            gameTags: new Array(),
            dates: new Array(),
            publishers: new Array(),
            developers: new Array(),
            infos: new Array(),
            imgUrls: new Array(),
            detailUrls: new Array(),
            titles: new Array(),
            sources: new Array(),
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
    }

    async postGameData(type) {
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
        var tmpGameNames = this.state.gameNames;
        var tmpGameTags = this.state.gameTags;
        var tmpReleaseDates = this.state.dates;
        var tmpPublishers = this.state.publishers;
        var tmpDevelopers = this.state.developers;
        var tmpInfos = this.state.infos;
        var tmpImgUrls = this.state.imgUrls;
        var tmpDetailUrls = this.state.detailUrls;
        await axios.post('/game', {filter: filter, keyword: this.state.keyword, size: 100}).then(res => {
            if (res.data.result) {
                var rawStrs = res.data.result;
                for (var i = 0; i < rawStrs.length; i++) {
                    const obj = JSON.parse(rawStrs[i].source);
                    tmpGameNames.push(obj.game_name);
                    tmpGameTags.push(obj.tags);
                    tmpReleaseDates.push(obj.release_date);
                    tmpPublishers.push(obj.publisher);
                    tmpDevelopers.push(obj.developer);
                    tmpInfos.push(obj.info);
                    tmpDetailUrls.push(obj.detail_url);
                    tmpImgUrls.push((obj.imgs)[0]);
                }
                this.setState({gameNames: tmpGameNames, gameTags: tmpGameTags, dates: tmpReleaseDates, publishers: tmpPublishers, developers: tmpDevelopers,
                            infos: tmpInfos, imgUrls: tmpImgUrls, detailUrls: tmpDetailUrls});
            }
        }).catch(error => {
            console.error(error);
        })
        var tmpCards = this.state.cards;
        for (var i = 0; i < this.state.gameNames.length; i++) {
            tmpCards.push(<ResultCard cardType='game' gameName={tmpGameNames[i]} gameTags={tmpGameTags[i]}
                    date={tmpReleaseDates[i]} publisher={tmpPublishers[i]} developer={tmpDevelopers[i]} 
                    info={tmpInfos[i]} imgUrl={tmpImgUrls[i]} detailUrl={tmpDetailUrls[i]} key={tmpGameNames[i]} />)
        }
        var tmpShowCards = [];
        var start = 0;
        var end = (10 > tmpCards.length) ? tmpCards.length : 10;
        for (var i = start; i < end; i++)
            tmpShowCards.push(tmpCards[i]);
        if (type === 'all') {
            this.state.cards = tmpCards;
            this.state.showCards = tmpShowCards;
        } else {
            this.setState({cards: tmpCards, showCards: tmpShowCards});
        }
        if (type === 'games')
            this.setState({isLoading: false});
    }

    async postResourceData(types) {
        this.setState({isLoading: true});
        var tmpTitles = this.state.titles;
        var tmpDates = this.state.dates;
        var tmpInfos = this.state.infos;
        var tmpImgUrls = this.state.imgUrls;
        var tmpDetailUrls = this.state.detailUrls;
        var tmpSources = this.state.sources;
        for (var i = 0; i < types.length; i++) {
            var api;
            if (types[i] === 'news')
                api = '/news';
            else if (types[i] === 'methods')
                api = '/raiders';
            else
                api = '/video';
            await axios.post(api, {keyword: this.state.keyword, size: 100}).then(res => {
                if (res.data.result) {
                    var rawStrs = res.data.result;
                    for (var j = 0; j < rawStrs.length; j++) {
                        const obj = JSON.parse(rawStrs[j].source);
                        tmpTitles.push(obj.title);
                        tmpDates.push(obj.time);
                        tmpInfos.push(obj.info);
                        tmpImgUrls.push(obj.img_url);
                        tmpDetailUrls.push(obj.url);
                        tmpSources.push(obj.source);
                    }
                }
            }).catch(error => {
                console.error(error);
            })
        }
        this.setState({titles: tmpTitles, infos: tmpInfos, dates: tmpDates, imgUrls: tmpImgUrls, detailUrls: tmpDetailUrls});
        var tmpCards = this.state.cards;
        for (var i = 0; i < tmpTitles.length; i++) {
            tmpCards.push(<ResultCard cardType={this.state.searchType} title={tmpTitles[i]} date={tmpDates[i]}
                    source={tmpSources[i]} info={tmpInfos[i]} imgUrl={tmpImgUrls[i]} detailUrl={tmpDetailUrls[i]} key={tmpTitles[i]} />)
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
                await this.postGameData(this.state.searchType);
            } else if (this.state.searchType === 'all') {
                await this.postGameData(this.state.searchType);
                await this.postResourceData(['news', 'methods', 'videos']);
            } else {
                await this.postResourceData([this.state.searchType]);
            }
            sessionStorage.setItem("keyword", this.state.keyword);
            sessionStorage.setItem("searchType", this.state.searchType);
            sessionStorage.setItem("searchSize", this.state.searchSize);
            sessionStorage.setItem("searchDates", JSON.stringify(this.state.searchDates));
            sessionStorage.setItem("searchTags1", JSON.stringify(this.state.searchTags1));
            sessionStorage.setItem("searchTags2", JSON.stringify(this.state.searchTags2));
            sessionStorage.setItem("searchTags3", JSON.stringify(this.state.searchTags3));
            sessionStorage.setItem("gameNames", JSON.stringify(this.state.gameNames));
            sessionStorage.setItem("gameTags", JSON.stringify(this.state.gameTags));
            sessionStorage.setItem("dates", JSON.stringify(this.state.dates));
            sessionStorage.setItem("publishers", JSON.stringify(this.state.publishers));
            sessionStorage.setItem("developers", JSON.stringify(this.state.developers));
            sessionStorage.setItem("infos", JSON.stringify(this.state.infos));
            sessionStorage.setItem("imgUrls", JSON.stringify(this.state.imgUrls));
            sessionStorage.setItem("detailUrls", JSON.stringify(this.state.detailUrls));
            sessionStorage.setItem("titles", JSON.stringify(this.state.titles));
            sessionStorage.setItem("sources", JSON.stringify(this.state.sources));
            sessionStorage.setItem("isLoading", JSON.stringify(this.state.isLoading));
            // sessionStorage.setItem("cards", JSON.stringify(this.state.cards));
            // sessionStorage.setItem("showCards", JSON.stringify(this.state.showCards));
            sessionStorage.setItem("page", this.state.page);
            sessionStorage.setItem("pageSize", this.state.pageSize);
        } else {
            this.setState({isLoading: true});
            this.state.keyword = sessionStorage.getItem("keyword");
            this.state.searchType = sessionStorage.getItem("searchType");
            this.state.searchSize = sessionStorage.getItem("searchSize");
            this.state.searchDates = JSON.parse(sessionStorage.getItem("searchDates"));
            this.state.searchTags1 = JSON.parse(sessionStorage.getItem("searchTags1"));
            this.state.searchTags2 = JSON.parse(sessionStorage.getItem("searchTags2"));
            this.state.searchTags3 = JSON.parse(sessionStorage.getItem("searchTags3"));
            this.state.gameNames = JSON.parse(sessionStorage.getItem("gameNames"));
            this.state.gameTags = JSON.parse(sessionStorage.getItem("gameTags"));
            this.state.dates = JSON.parse(sessionStorage.getItem("dates"));
            this.state.publishers = JSON.parse(sessionStorage.getItem("publishers"));
            this.state.developers = JSON.parse(sessionStorage.getItem("developers"));
            this.state.infos = JSON.parse(sessionStorage.getItem("infos"));
            this.state.imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
            this.state.detailUrls = JSON.parse(sessionStorage.getItem("detailUrls"));
            this.state.titles = JSON.parse(sessionStorage.getItem("titles"));
            this.state.sources = JSON.parse(sessionStorage.getItem("sources"));
            this.state.isLoading = JSON.parse(sessionStorage.getItem("isLoading"));
            // this.state.cards = JSON.parse(sessionStorage.getItem("cards"));
            // this.state.showCards = JSON.parse(sessionStorage.getItem("showCards"));
            this.state.page = sessionStorage.getItem("page");
            this.state.pageSize = sessionStorage.getItem("pageSize");
            var tmpCards = [];
            for (var i = 0; i < this.state.gameNames.length; i++) {
                tmpCards.push(<ResultCard cardType='game' gameName={this.state.gameNames[i]} gameTags={this.state.gameTags[i]}
                        date={this.state.dates[i]} publisher={this.state.publishers[i]} developer={this.state.developers[i]} 
                        info={this.state.infos[i]} imgUrl={this.state.imgUrls[i]} detailUrl={this.state.detailUrls[i]} key={this.state.gameNames[i]} />)
            }
            for (var i = 0; i < this.state.titles.length; i++) {
                tmpCards.push(<ResultCard cardType={this.state.searchType} title={this.state.titles[i]} date={this.state.dates[i]}
                        source={this.state.sources[i]} info={this.state.infos[i]} imgUrl={this.state.imgUrls[i]} detailUrl={this.state.detailUrls[i]} key={this.state.titles[i]} />)
            }
            var tmpShowCards = [];
            var start = 0;
            var end = (10 > tmpCards.length) ? tmpCards.length : 10;
            for (var i = start; i < end; i++)
                tmpShowCards.push(tmpCards[i]);
            this.setState({cards: tmpCards, showCards: tmpShowCards});
            this.setState({isLoading: false});
            console.log(this.state);
        }
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
            if (res.indexOf('games') !== -1)
                this.postGameData(this.state.searchType);
            res = res.splice(res.indexOf('games'), 1);
            this.postResourceData(res);
        })
    }

    getGameTags(res1, res2, res3, res4) {
        this.setState({
            searchTags1: res1,
            searchTags2: res2,
            searchTags3: res3,
            searchDates: res4
        }, () => {
            this.postGameData(this.state.searchType);
        })
    }

    render() {
        console.log(this.state);
        //console.log("render now");
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%', width: '100%', backgroundImage: 'url(' + require('../assets/bgd4.jpg') + ')',
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
                    {/* <header style={{fontSize: '18px', color: 'white', marginTop: '20px', marginLeft: '30px', fontFamily: 'KaiTi'}}><KeyOutlined />&nbsp;探寻游戏之美</header> */}
                    {/* 搜索区域，含标签 */}
                    <div style={{width: '100%', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
                        <SearchBlock  recvTypeFunc={this.getTypeTags} recvGameFunc={this.getGameTags} keyword={this.state.keyword} searchType={this.state.searchType}
                                    searchTags1={this.state.searchTags1} searchTags2={this.state.searchTags2} searchTags3={this.state.searchTags3} searchDates={this.state.searchDates} />
                    </div>
                    {/* 结果展示区域，以卡片形式分页，每页5个 */}
                    <div style={{width: '75%', margin: '0 auto', backgroundColor: 'rgb(0,0,0,0.15)'}}>
                        <Loading isLoading={this.state.isLoading} />
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