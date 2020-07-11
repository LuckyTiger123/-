import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { RocketOutlined, ChromeOutlined, BookOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Card, Tag } from 'antd';
import { Link } from 'react-router-dom';

class ResultCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardType: props.cardType,
            gameID: props.gameID,
            gameName: props.gameName,
            gameTags: props.gameTags,
            date: props.date,
            publisher: props.publisher,
            developer: props.developer,
            source: props.source,
            title: props.title,
            info: props.info,
            imgUrl: props.imgUrl,
            detailUrl: props.detailUrl
        }

    }

    render() {
        if (this.state.cardType === 'games') {
            var tags = [];
            //console.log(this.state.gameTags);
            var gameTags = this.state.gameTags.split(' ');
            var length = (gameTags.length === 1) ? 1 : (gameTags.length - 1);
            for (var i = 0; i < length; i++)
                tags.push(<Tag color='blue'  key={gameTags[i]} style={{margin: 'auto 0', borderRadius: '10px'}}>{gameTags[i]}</Tag>);
            return (
                <Link to={'/info/' + this.state.gameID} target='_blank'>
                    <Card hoverable size="small" title={<span><RocketOutlined />&nbsp;<b>游戏</b></span>} style={{width: '93.3%', margin: '0 auto', marginTop: '1%', backgroundColor: 'rgba(245,245,245,0.75)'}} key={this.state.gameName}>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '30%'}}>
                                <img src={this.state.imgUrl} width='100%'></img>
                            </div>
                            <div style={{marginLeft: '1%', width: '70%'}}>
                                <div style={{display: 'flex'}}>
                                    <span style={{fontSize: '20px'}}><b dangerouslySetInnerHTML={{__html: this.state.gameName}}></b></span>
                                    <div style={{float: 'left', marginTop: '1%', marginLeft: '1%'}} >
                                        {tags}
                                    </div>
                                </div>
                                <div style={{display: 'flex', marginTop: '1%'}}>
                                    <span style={{width: '33%'}}><b>发行时间：</b>{this.state.date}</span>
                                    <span style={{width: '33%'}} dangerouslySetInnerHTML={{__html: "<b>发行商：</b>" + this.state.publisher}}></span>
                                    <span style={{width: '33%'}} dangerouslySetInnerHTML={{__html: "<b>开发商：</b>" + this.state.developer}}></span>
                                </div>
                                <div style={{marginTop: '1%'}}>
                                    <p>
                                        <b>游戏简介：</b>
                                        {this.state.info}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            );
        } else {
            var titleHtml;
            //console.log(this.state.cardType);
            if (this.state.cardType === 'news')
                titleHtml = <span><ChromeOutlined />&nbsp;<b>资讯</b></span>;
            else if (this.state.cardType === 'methods')
                titleHtml = <span><BookOutlined />&nbsp;<b>攻略</b></span>;
            else
                titleHtml = <span><VideoCameraOutlined />&nbsp;<b>视频</b></span>;
            return (
                <Card hoverable size="small" onClick={() => {window.open(this.state.detailUrl, '_blank')}} title={titleHtml} style={{width: '93.3%', margin: '0 auto', marginTop: '1%', backgroundColor: 'rgba(245,245,245,0.75)'}} key={this.state.title}>
                    <div style={{display: 'flex'}}>
                        <div style={{width: '30%'}}>
                            <img src={this.state.imgUrl} width='100%'></img>
                        </div>
                        <div style={{marginLeft: '1%', width: '70%'}}>
                            <div style={{marginTop: '1%'}}>
                                <span style={{fontSize: '20px'}}><b dangerouslySetInnerHTML={{__html: this.state.title}}></b></span>
                            </div>
                            <div style={{display: 'flex', marginTop: '1%'}}>
                                <span style={{width: '50%'}}><b>时间：</b>{this.state.date}</span>
                                <span style={{width: '50%'}}><b>来源：</b>{this.state.source}</span>
                            </div>
                            <div style={{marginTop: '1%'}}>
                                <p dangerouslySetInnerHTML={{__html: "<b>简介：</b>" + this.state.info}}></p>
                            </div>
                        </div>
                    </div>
                </Card>
            );
        }
    }
}

export default ResultCard;