import React, { Component } from 'react';
import SearchBlock from '../components/SearchBlock';
import ResultCard from '../components/ResultCard';
import { RocketOutlined, ChromeOutlined, BookOutlined } from '@ant-design/icons'
import { Card, Tag, Pagination } from 'antd';
import axios from 'axios';

class ResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.keyword : '',
            searchType: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchType : '',
            searchSize: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchSize : 100,
            searchDates: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchDates : [],
            searchTags1: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchTags1 : [],
            searchTags2: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchTags2 : [],
            searchTags3: (props.location.query && props.location.query.lastPage === 'home') ? props.location.query.searchTags3 : [],
            gameNames: [],
            gameTags: [],
            dates: [],
            publishers: [],
            developers: [],
            infos: [],
            imgUrls: [],
            detailUrls: [],
            titles: [],
            sources: [],
        }
    }

    async componentDidMount() {
        if (this.props.location.query && this.props.location.query.lastPage === 'home') {
            if (this.state.searchType === 'games') {
                var filter = [];
                for (var i = 0; i < this.state.searchTags1.length; i++)
                    filter.push({type: "type", value: this.state.searchTags1[i]});
                for (var i = 0; i < this.state.searchTags2.length; i++)
                    filter.push({type: "theme", value: this.state.searchTags2[i]});
                for (var i = 0; i < this.state.searchTags3.length; i++)
                    filter.push({type: "mode", value: this.state.searchTags3[i]});
                for (var i = 0; i < this.state.searchDates.length; i++)
                    filter.push({type: "year", value: this.state.searchDates[i]});
                await axios.post('/game', {filter: filter, keyword: this.state.keyword, size: 100}).then(res => {
                    var rawStrs = res.data.result;
                    var tmpGameNames = [];
                    var tmpGameTags = [];
                    var tmpReleaseDates = [];
                    var tmpPublishers = [];
                    var tmpDevelopers = [];
                    var tmpInfos = [];
                    var tmpImgUrls = [];
                    var tmpDetailUrls = [];
                    for (var i = 0; i < rawStrs.length; i++) {
                        const obj = JSON.parse(rawStrs[i]);
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
                }).catch(error => {
                    console.error(error);
                })
            } else if (this.state.searchType === 'all') {
                var filter = [];
                for (var i = 0; i < this.state.searchTags1.length; i++)
                    filter.push({type: "type", value: this.state.searchTags1[i]});
                for (var i = 0; i < this.state.searchTags2.length; i++)
                    filter.push({type: "theme", value: this.state.searchTags2[i]});
                for (var i = 0; i < this.state.searchTags3.length; i++)
                    filter.push({type: "mode", value: this.state.searchTags3[i]});
                for (var i = 0; i < this.state.searchDates.length; i++)
                    filter.push({type: "year", value: this.state.searchDates[i]});
                await axios.post('/game', {filter: filter, keyword: this.state.keyword, size: 100}).then(res => {
                    var rawStrs = res.data.result;
                    var tmpGameNames = [];
                    var tmpGameTags = [];
                    var tmpReleaseDates = [];
                    var tmpPublishers = [];
                    var tmpDevelopers = [];
                    var tmpInfos = [];
                    var tmpImgUrls = [];
                    var tmpDetailUrls = [];
                    for (var i = 0; i < rawStrs.length; i++) {
                        const obj = JSON.parse(rawStrs[i]);
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
                }).catch(error => {
                    console.error(error);
                })
                var api;
                if (this.state.searchType === 'news')
                    api = '/news';
                else if (this.state.searchType === 'methods')
                    api = '/raiders';
                else
                    api = '/video';
                await axios.post(api, {keyword: this.state.keyword, size: 100}).then(res => {
                    var rawStrs = res.data.result;
                    var tmpTitles = [];
                    var tmpDates = [];
                    var tmpInfos = [];
                    var tmpImgUrls = [];
                    var tmpDetailUrls = [];
                    for (var i = 0; i < rawStrs.length; i++) {
                        const obj = JSON.parse(rawStrs[i].source);
                        tmpTitles.push(obj.title);
                        tmpDates.push(obj.time);
                        tmpInfos.push(obj.info);
                        tmpImgUrls.push(obj.img_url);
                        tmpDetailUrls.push(obj.url);
                    }
                    this.setState({titles: tmpTitles, infos: tmpInfos, dates: tmpDates, imgUrls: tmpImgUrls, detailUrls: tmpDetailUrls});
                }).catch(error => {
                    console.error(error);
                })
            } else {
                var api;
                if (this.state.searchType === 'news')
                    api = '/news';
                else if (this.state.searchType === 'methods')
                    api = '/raiders';
                else
                    api = '/video';
                await axios.post(api, {keyword: this.state.keyword, size: 100}).then(res => {
                    var rawStrs = res.data.result;
                    var tmpTitles = [];
                    var tmpDates = [];
                    var tmpInfos = [];
                    var tmpImgUrls = [];
                    var tmpDetailUrls = [];
                    for (var i = 0; i < rawStrs.length; i++) {
                        const obj = JSON.parse(rawStrs[i].source);
                        tmpTitles.push(obj.title);
                        tmpDates.push(obj.time);
                        tmpInfos.push(obj.info);
                        tmpImgUrls.push(obj.img_url);
                        tmpDetailUrls.push(obj.url);
                    }
                    this.setState({titles: tmpTitles, infos: tmpInfos, dates: tmpDates, imgUrls: tmpImgUrls, detailUrls: tmpDetailUrls});
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    render() {
        var cards = [];
        if (this.state.searchType === 'games') {
            for (var i = 0; i < this.state.gameNames.length; i++) {
                cards.push(<ResultCard cardType='game' gameName={this.state.gameNames[i]} gameTags={this.state.gameTags[i]}
                        date={this.state.dates[i]} publisher={this.state.publishers[i]} developer={this.state.developers[i]} 
                        info={this.state.infos[i]} imgUrl={this.state.imgUrls[i]} detailUrl={this.state.detailUrls[i]} />)
            }
        } else if (this.state.searchType === 'all') {
            for (var i = 0; i < this.state.gameNames.length; i++) {
                cards.push(<ResultCard cardType='game' gameName={this.state.gameNames[i]} gameTags={this.state.gameTags[i]}
                        date={this.state.dates[i]} publisher={this.state.publishers[i]} developer={this.state.developers[i]} 
                        info={this.state.infos[i]} imgUrl={this.state.imgUrls[i]} detailUrl={this.state.detailUrls[i]} />)
            }
            for (var i = 0; i < this.state.titles.length; i++) {
                cards.push(<ResultCard cardType={this.state.searchType} title={this.state.titles[i]} date={this.state.dates[i]}
                        source={this.state.sources[i]} info={this.state.infos[i]} imgUrl={this.state.imgUrls[i]} detailUrl={this.state.detailUrls[i]}/>)
            }
        } else {
            for (var i = 0; i < this.state.titles.length; i++) {
                cards.push(<ResultCard cardType={this.state.searchType} title={this.state.titles[i]} date={this.state.dates[i]}
                        source={this.state.sources[i]} info={this.state.infos[i]} imgUrl={this.state.imgUrls[i]} detailUrl={this.state.detailUrls[i]}/>)
            }
        }
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%', width: '100%', backgroundImage: 'url(' + require('../assets/bgd3.jpg') + ')',
                            backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                    {/* <header style={{fontSize: '18px', color: 'white', marginTop: '20px', marginLeft: '30px', fontFamily: 'KaiTi'}}><KeyOutlined />&nbsp;探寻游戏之美</header> */}
                    {/* 搜索区域，含标签 */}
                    <div style={{width: '100%', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
                        <SearchBlock keyword={this.state.keyword} searchType={this.state.searchType}
                                    searchTags1={this.state.searchTags1} searchTags2={this.state.searchTags2} searchTags3={this.state.searchTags3} searchDates={this.state.searchDates} />
                    </div>
                    {/* 结果展示区域，以卡片形式分页，每页10个 */}
                    <div style={{width: '75%', margin: '0 auto', backgroundColor: 'rgb(0,0,0,0.15)'}}>
                        {cards}
                        {/* <Card hoverable size="small" onClick={() => {window.location.href='https://www.3dmgame.com/games/agentsofmayhem/'}} title={<span><RocketOutlined />&nbsp;<b>游戏</b></span>} style={{width: '93.3%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532401246_216469.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', width: '70%'}}>
                                    <div style={{display: 'flex'}}>
                                        <span style={{fontSize: '20px'}}><b>混乱特工（Agents of Mayhem）</b></span>
                                        <Tag color='magenta' style={{margin: 'auto 0', borderRadius: '10px'}}>第三人称射击</Tag>
                                    </div>
                                    <div style={{display: 'flex', marginTop: '1%'}}>
                                        <span style={{width: '33%'}}><b>发行时间：</b>2017-08-15（PC）</span>
                                        <span style={{width: '33%'}}><b>发行商：</b>Deep Silver</span>
                                        <span style={{width: '33%'}}><b>开发商：</b>Volition</span>
                                    </div>
                                    <div style={{marginTop: '1%'}}>
                                        <p>
                                            <b>游戏简介：</b>
                                            《混乱特工(Agents of Mayhem)》是一款由Deep Silver Volition制作Deep Silver发行的一款科幻类第三人称射击游戏，游戏的故事发生在韩国首尔，采用开放世界城市设定。和Volition的《黑道圣徒》系列有些类似，新作《混乱特工》仍旧是Volition喜欢的恶搞怪诞风格。在游戏中玩家扮演三名特工中的一个，每一个特工都有自己独特的技能。关于每个特工的技能，其实游戏的首支CG预告片已经进行了初次展示。玩家操控他们打败游戏中的妄自尊大的BOSS——L.E.G.I.O.N.。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable size="small" onClick={() => {window.location.href='https://www.3dmgame.com/games/quantumbreak/'}} title={<span><RocketOutlined />&nbsp;<b>游戏</b></span>} style={{width: '93.3%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532421659_659498.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', width: '70%'}}>
                                    <div style={{display: 'flex'}}>
                                        <span style={{fontSize: '20px'}}><b>量子破碎（Quantum Break）</b></span>
                                        <Tag color='magenta' style={{margin: 'auto 0', borderRadius: '10px'}}>第三人称射击</Tag>
                                    </div>
                                    <div style={{display: 'flex', marginTop: '1%'}}>
                                        <span style={{width: '33%'}}><b>发行时间：</b>2016-04-05（PC）</span>
                                        <span style={{width: '33%'}}><b>发行商：</b>Microsoft Game</span>
                                        <span style={{width: '33%'}}><b>开发商：</b>Remedy</span>
                                    </div>
                                    <div style={{marginTop: '1%'}}>
                                        <p>
                                            <b>游戏简介：</b>
                                            《量子破碎(Quantum Break)》是由Remedy  Entertainment制作，微软发行的一款第三人称动作射击游戏，游戏中主角可以用移行幻影大法耍酷，或者说是像“闪电”那样的超级英雄正在利用超速发动时间悖论。这位绝望的英雄在时间崩塌的世界里，需要面对各种挑战，并试图拯救世界与未来。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card> */}
                        {/* <Card size="small" title={<span><RocketOutlined />&nbsp;<b>游戏</b></span>} style={{width: '45%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532421659_659498.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', display: 'flex', width: '70%'}}>
                                    <div style={{width: '40%'}}>
                                        <a href='https://www.3dmgame.com/games/quantumbreak/'><p style={{fontSize: '15px'}}><b>量子破碎（Quantum Break）</b></p></a>
                                        <p style={{fontSize: '10px'}}><b>发行时间：</b>2016-04-05（PC）</p>
                                        <p style={{fontSize: '10px'}}><b>发行商：</b>Microsoft Game</p>
                                        <p style={{fontSize: '10px'}}><b>开发商：</b>Remedy</p>
                                        <p style={{fontSize: '10px'}}><b>游戏类型：</b>第三人称射击</p>
                                    </div>
                                    <div style={{width: '60%'}}>
                                        <p>
                                            <b>游戏简介：</b>
                                            《量子破碎(Quantum Break)》是由Remedy  Entertainment制作，微软发行的一款第三人称动作射击游戏，游戏中主角可以用移行幻影大法耍酷，或者说是像“闪电”那样的超级英雄正在利用超速发动时间悖论。这位绝望的英雄在时间崩塌的世界里，需要面对各种挑战，并试图拯救世界与未来。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card> */}
                        {/* <Card hoverable size="small" onClick={() => {window.location.href='http://www.ali213.net/news/html/2020-7/522177.html'}} title={<span><ChromeOutlined />&nbsp;<b>资讯</b></span>} style={{width: '93.3%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://imgs.ali213.net/news/2020/07/02/2020070241313191.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', width: '70%'}}>
                                    <div style={{marginTop: '1%'}}>
                                        <span style={{fontSize: '20px'}}><b>怎么回事？《美国末日2》M站玩家评分还在不断上涨！</b></span>
                                    </div>
                                    <div style={{display: 'flex', marginTop: '1%'}}>
                                        <span style={{width: '50%'}}><b>时间：</b>2020-07-02</span>
                                        <span style={{width: '50%'}}><b>来源：</b>游侠网</span>
                                    </div>
                                    <div style={{marginTop: '1%'}}>
                                        <p>
                                            <b>摘要：</b>
                                            《美国末日2》发售后受到大批玩家差评。在Metacritic平台上，最初几十名玩家打出的平均分仅有2.4分。而随着时间的推移，《美国末日2》M站平均分不断上涨，目前有10万多人评价，均分已达到5.0分。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable size="small" onClick={() => {window.location.href='https://gl.ali213.net/html/2020-7/454133.html'}} title={<span><BookOutlined />&nbsp;<b>攻略</b></span>} style={{width: '93.3%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://img1.ali213.net/glpic/2020/07/03/8d23a01c-5a12-d207-76c3-9badcc3bee2e.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', width: '70%'}}>
                                    <div style={{marginTop: '1%'}}>
                                        <span style={{fontSize: '20px'}}><b>《云顶之弈》10.13装备怎么选 10.13装备选择推荐</b></span>
                                    </div>
                                    <div style={{display: 'flex', marginTop: '1%'}}>
                                        <span style={{width: '50%'}}><b>时间：</b>2020-07-03</span>
                                        <span style={{width: '50%'}}><b>来源：</b>游侠网</span>
                                    </div>
                                    <div style={{marginTop: '1%'}}>
                                        <p>
                                            <b>摘要：</b>
                                            云顶之弈10.13装备怎么选？除了英雄之外，装备也是云顶之弈游戏中非常重要的一部分，今天带来云顶之弈10.13装备选择推荐，喜欢的玩家快来看看吧。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card> */}
                        <Pagination showSizeChanger={false} showQuickJumper={true} defaultCurrent={1} total={500} 
                            style={{backgroundColor: 'white', width: '93.3%', margin: '0 auto', marginTop: '1%', textAlign: 'center'}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultPage;