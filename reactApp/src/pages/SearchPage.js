import React, { Component } from 'react';
import SearchBar from '../components/SearchBar'
import { Row, Col, Carousel } from 'antd';
import {RedoOutlined, KeyOutlined} from '@ant-design/icons'
import $ from 'jquery';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameImgUrls: [],
            gameDetailUrls: [],
        }
    }

    componentDidMount() {
        $.post('/game/index', {pageSize: 16, page: 1}, function(data, status) {
            var rawStrs = data.result;
            var tmpImgUrls = [];
            var tmpDetailUrls = [];
            for (var i = 0; i < rawStrs.length; i++) {
                const obj = JSON.parse(rawStrs[i]);
                tmpDetailUrls.push(obj.detail_url);
                tmpImgUrls.push((obj.imgs)[0]);
            }
            this.setState({gameImgUrls: tmpImgUrls, gameDetailUrls: tmpDetailUrls});
        })
    }

    render() {
        var items = new Array();
        for (var i = 0; i < 4; i++) {
            items.push(new Array());
            for (var j = 0; j < 4; j++) {
                items[i].push(<Col span={12} style={{height: '200px'}}><a href={this.state.gameDetailUrls[i * 4 + j]}>
                    <img src={this.state.gameImgUrls[i * 4 + j]} width='90%'></img></a></Col>);
            }
        }
        return (
            <div style={{height: '100%'}}>
                <div style={{height: '100%', width: '100%', position: 'fixed', backgroundImage: 'url(' + require('../assets/bgd.jpg') + ')',
                                backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                    <header style={{fontSize: '18px', color: 'white', marginTop: '20px', marginLeft: '30px', fontFamily: 'KaiTi'}}><KeyOutlined />&nbsp;探寻游戏之美</header>
                    <div style={{height: '80%', width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
                    <SearchBar />
                    <div style={{width: '33%', textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                        <p style={{fontSize: '20px', color: 'white', fontFamily: 'KaiTi'}}>游戏推荐：</p>
                        <Carousel autoplay>
                        <div>
                            <Row>
                                {items[0]}
                            </Row>
                            {/* <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/quantumbreak/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532421659_659498.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532401246_216469.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180723/1532329526_484485.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180608/1528423903_571787.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row> */}
                        </div>
                        <div>
                            <Row>
                                {items[1]}
                            </Row>
                            {/* <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/quantumbreak/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532421659_659498.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532401246_216469.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180723/1532329526_484485.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180608/1528423903_571787.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row> */}
                        </div>
                        <div>
                            <Row>
                                {items[2]}
                            </Row>
                            {/* <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/quantumbreak/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532421659_659498.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532401246_216469.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180723/1532329526_484485.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180608/1528423903_571787.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row> */}
                        </div>
                        <div>
                            <Row>
                                {items[3]}
                            </Row>
                            {/* <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/quantumbreak/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532421659_659498.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180724/1532401246_216469.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180723/1532329526_484485.jpg' width='90%' />
                                </a>
                            </Col>
                            <Col span={12} style={{height: '200px'}}>
                                <a href='https://www.3dmgame.com/games/agentsofmayhem/'>
                                <img src='https://img.3dmgame.com/uploads/images/thumbkwdfirst/20180608/1528423903_571787.jpg' width='90%' />
                                </a>
                            </Col>
                            </Row> */}
                        </div>
                        </Carousel>
                    </div>
                </div>
                <footer style={{marginTop: '30px', textAlign: 'center', color: 'white', fontSize: '15px', fontFamily: 'KaiTi'}}>Copyright © 浙江大学计算机科学与技术学院<br/>杨佳妮 方陶然 翁罗轩 胡欣雨 赵晨阳</footer>
            </div>
            </div>
        );
    }
}

export default SearchPage;