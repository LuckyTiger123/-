import React, { Component } from 'react';
import $ from 'jquery';
import SearchBlock from '../components/SearchBlock';
import { KeyOutlined, RocketOutlined, ChromeOutlined } from '@ant-design/icons'
import { Card, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class ResultPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%', width: '100%'}}>
                    <header style={{fontSize: '18px', color: 'white', marginTop: '20px', marginLeft: '30px', fontFamily: 'KaiTi'}}><KeyOutlined />&nbsp;探寻游戏之美</header>
                    {/* 搜索区域，含标签 */}
                    <div style={{width: '100%', alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
                        <SearchBlock />
                    </div>
                    {/* 结果展示区域，以卡片形式分页，每页10个 */}
                    <div style={{width: '100%'}}>
                        <Card size="small" title={<span><RocketOutlined />&nbsp;<b>游戏</b></span>} style={{width: '45%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532401246_216469.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', display: 'flex', width: '70%'}}>
                                    <div style={{width: '40%'}}>
                                        <a href='https://www.3dmgame.com/games/agentsofmayhem/'><p style={{fontSize: '15px'}}><b>混乱特工（Agents of Mayhem）</b></p></a>
                                        <p style={{fontSize: '10px'}}><b>发行时间：</b>2017-08-15（PC）</p>
                                        <p style={{fontSize: '10px'}}><b>发行商：</b>Deep Silver</p>
                                        <p style={{fontSize: '10px'}}><b>开发商：</b>Volition</p>
                                        <p style={{fontSize: '10px'}}><b>游戏类型：</b>第三人称射击</p>
                                    </div>
                                    <div style={{width: '60%'}}>
                                        <p>
                                            <b>游戏简介：</b>
                                            《混乱特工(Agents of Mayhem)》是一款由Deep Silver Volition制作Deep Silver发行的一款科幻类第三人称射击游戏，游戏的故事发生在韩国首尔，采用开放世界城市设定。和Volition的《黑道圣徒》系列有些类似，新作《混乱特工》仍旧是Volition喜欢的恶搞怪诞风格。在游戏中玩家扮演三名特工中的一个，每一个特工都有自己独特的技能。关于每个特工的技能，其实游戏的首支CG预告片已经进行了初次展示。玩家操控他们打败游戏中的妄自尊大的BOSS——L.E.G.I.O.N.。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card size="small" title={<span><RocketOutlined />&nbsp;<b>游戏</b></span>} style={{width: '45%', margin: '0 auto', marginTop: '1%'}}>
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
                        </Card>
                        <Card size="small" title={<span><ChromeOutlined />&nbsp;<b>资讯</b></span>} style={{width: '45%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://imgs.ali213.net/news/2020/07/02/2020070241313191.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', width: '70%'}}>
                                    <a href='http://www.ali213.net/news/html/2020-7/522177.html'><p style={{fontSize: '15px'}}><b>怎么回事？《美国末日2》M站玩家评分还在不断上涨！</b></p></a>
                                    <p style={{fontSize: '13px'}}><b>时间：</b>2020-07-02</p>
                                    <p style={{fontSize: '13px'}}><b>来源：</b>游侠网</p>
                                    <p style={{fontSize: '13px'}}><b>摘要：</b>《美国末日2》发售后受到大批玩家差评。在Metacritic平台上，最初几十名玩家打出的平均分仅有2.4分。而随着时间的推移，《美国末日2》M站平均分不断上涨，目前有10万多人评价，均分已达到5.0分。</p>
                                </div>
                            </div>
                        </Card>
                        <Card size="small" title={<span><ChromeOutlined />&nbsp;<b>资讯</b></span>} style={{width: '45%', margin: '0 auto', marginTop: '1%'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%'}}>
                                    <img src='https://imgs.ali213.net/news/2020/07/05/2020070571205127.jpg' width='100%'></img>
                                </div>
                                <div style={{marginLeft: '1%', width: '70%'}}>
                                    <a href='http://www.ali213.net/news/html/2020-7/522709.html'><p style={{fontSize: '15px'}}><b>疑因LGBT内容《地平线：零之曙光》在中东地区被禁！</b></p></a>
                                    <p style={{fontSize: '13px'}}><b>时间：</b>2020-07-05</p>
                                    <p style={{fontSize: '13px'}}><b>来源：</b>游侠网</p>
                                    <p style={{fontSize: '13px'}}><b>摘要：</b>由索尼旗下第一方工作室Guerrilla Games制作的PS4独占RPG游戏《地平线：零之曙光》即将于8月7日正式在Steam发售，不过据外媒报道当Steam官推于7月3日公布这一消息时，有网友回复称部分地区Steam商店无法搜索到《地平线：零之曙光》。</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultPage;