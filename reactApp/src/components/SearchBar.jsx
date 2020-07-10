import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Select, Tag, Menu, Dropdown, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import '../myStyles.css';

const { Search } = Input;
const { Option } = Select;

class SearchTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: new Array(),
            menu1: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='射击##0'>射击</Menu.Item>
                    <Menu.Item key='动作##0'>动作</Menu.Item>
                    <Menu.Item key='冒险##0'>冒险</Menu.Item>
                    <Menu.Item key='赛车##0'>赛车</Menu.Item>
                    <Menu.Item key='策略##0'>策略</Menu.Item>
                    <Menu.Item key='养成##0'>养成</Menu.Item>
                    <Menu.Item key='音乐##0'>音乐</Menu.Item>
                    <Menu.Item key='格斗##0'>格斗</Menu.Item>
                    <Menu.Item key='角色扮演##0'>角色扮演</Menu.Item>
                    <Menu.Item key='动作角色##0'>动作角色</Menu.Item>
                    <Menu.Item key='即时战略##0'>即时战略</Menu.Item>
                    <Menu.Item key='桌面棋牌##0'>桌面棋牌</Menu.Item>
                    <Menu.Item key='休闲益智##0'>休闲益智</Menu.Item>
                    <Menu.Item key='体育运动##0'>体育运动</Menu.Item>
                    <Menu.Item key='模拟经营##0'>模拟经营</Menu.Item>
                </Menu>
            ),
            menu2: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='体育##1'>体育</Menu.Item>
                    <Menu.Item key='竞速##1'>竞速</Menu.Item>
                    <Menu.Item key='解谜##1'>解谜</Menu.Item>
                    <Menu.Item key='剧情##1'>剧情</Menu.Item>
                    <Menu.Item key='恐怖##1'>恐怖</Menu.Item>
                    <Menu.Item key='科幻##1'>科幻</Menu.Item>
                    <Menu.Item key='生存##1'>生存</Menu.Item>
                    <Menu.Item key='探索##1'>探索</Menu.Item>
                    <Menu.Item key='教育##1'>教育</Menu.Item>
                    <Menu.Item key='成人##1'>成人</Menu.Item>
                    <Menu.Item key='建造##1'>建造</Menu.Item>
                    <Menu.Item key='管理##1'>管理</Menu.Item>
                    <Menu.Item key='僵尸##1'>僵尸</Menu.Item>
                    <Menu.Item key='战争##1'>战争</Menu.Item>
                    <Menu.Item key='历史##1'>历史</Menu.Item>
                    <Menu.Item key='未来##1'>未来</Menu.Item>
                    <Menu.Item key='军事##1'>军事</Menu.Item>
                    <Menu.Item key='推理##1'>推理</Menu.Item>
                    <Menu.Item key='飞行##1'>飞行</Menu.Item>
                    <Menu.Item key='心理##1'>心理</Menu.Item>
                    <Menu.Item key='自然##1'>自然</Menu.Item>
                    <Menu.Item key='电竞##1'>电竞</Menu.Item>
                    <Menu.Item key='编程##1'>编程</Menu.Item>
                    <Menu.Item key='女性主角##1'>女性主角</Menu.Item>
                </Menu>
            ),
            menu3: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='3D##2'>3D</Menu.Item>
                    <Menu.Item key='单人##2'>单人</Menu.Item>
                    <Menu.Item key='多人##2'>多人</Menu.Item>
                    <Menu.Item key='合作##2'>合作</Menu.Item>
                    <Menu.Item key='沙盒##2'>沙盒</Menu.Item>
                    <Menu.Item key='回合制##2'>回合制</Menu.Item>
                    <Menu.Item key='第一人称##2'>第一人称</Menu.Item>
                    <Menu.Item key='第三人称##2'>第三人称</Menu.Item>
                    <Menu.Item key='开放世界##2'>开放世界</Menu.Item>
                    <Menu.Item key='本地多人##2'>本地多人</Menu.Item>
                    <Menu.Item key='玩家对战##2'>玩家对战</Menu.Item>
                    <Menu.Item key='大型多人在线##2'>大型多人在线</Menu.Item>
                </Menu>
            ),
            menu4: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='奇幻##3'>奇幻</Menu.Item>
                    <Menu.Item key='怀旧##3'>怀旧</Menu.Item>
                    <Menu.Item key='喜剧##3'>喜剧</Menu.Item>
                    <Menu.Item key='唯美##3'>唯美</Menu.Item>
                    <Menu.Item key='暴力##3'>暴力</Menu.Item>
                    <Menu.Item key='血腥##3'>血腥</Menu.Item>
                    <Menu.Item key='惊悚##3'>惊悚</Menu.Item>
                    <Menu.Item key='快节奏##3'>快节奏</Menu.Item>
                    <Menu.Item key='蒸汽朋克##3'>蒸汽朋克</Menu.Item>
                    <Menu.Item key='重玩价值##3'>重玩价值</Menu.Item>
                    <Menu.Item key='选择取向##3'>选择取向</Menu.Item>
                    <Menu.Item key='好评原生音轨##3'>好评原生音轨</Menu.Item>
                </Menu>
            ),
            menu5: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='2020##4'>2020</Menu.Item>
                    <Menu.Item key='2019##4'>2019</Menu.Item>
                    <Menu.Item key='2018##4'>2018</Menu.Item>
                    <Menu.Item key='2017##4'>2017</Menu.Item>
                    <Menu.Item key='2016##4'>2016</Menu.Item>
                    <Menu.Item key='2015##4'>2015</Menu.Item>
                    <Menu.Item key='2014##4'>2014</Menu.Item>
                    <Menu.Item key='2013##4'>2013</Menu.Item>
                    <Menu.Item key='2012##4'>2012</Menu.Item>
                    <Menu.Item key='2011##4'>2011</Menu.Item>
                    <Menu.Item key='2010以前##4'>2010以前</Menu.Item>
                </Menu>
            ),
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick = e => {
        //console.log(e.key);
        var oldTags = this.state.tags;
        var index = -1;
        for (var i = 0; i < oldTags.length; i++) {
            if (oldTags[i][oldTags[i].length - 1] === (e.key)[e.key.length - 1]) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            oldTags.splice(index, 1);
        }
        oldTags.push(e.key);
        this.setState({tags: oldTags});
        //console.log(this.state.tags);
        this.props.recvFunc(oldTags);
    }

    handleClose = e => {
        //console.log(e);
        var oldTags = this.state.tags;
        oldTags.splice(oldTags.indexOf(e), 1);
        this.setState({tags: oldTags});
        //console.log(this.state.tags);
        this.props.recvFunc(oldTags);
    }

    render() {
        if (this.props.type === 'games') {
            var items = new Array();
            for (var i = 0; i < this.state.tags.length; i++) {
                if (this.state.tags[i][this.state.tags[i].length - 1] === '0')
                    items.push(<Tag color='blue' closable key={this.state.tags[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.tags[i])}>
                            {this.state.tags[i].slice(0, this.state.tags[i].length - 3)}</Tag>);
                else if (this.state.tags[i][this.state.tags[i].length - 1] === '1')
                    items.push(<Tag color='geekblue' closable key={this.state.tags[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.tags[i])}>
                            {this.state.tags[i].slice(0, this.state.tags[i].length - 3)}</Tag>);
                else if (this.state.tags[i][this.state.tags[i].length - 1] === '2')
                    items.push(<Tag color='purple' closable key={this.state.tags[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.tags[i])}>
                            {this.state.tags[i].slice(0, this.state.tags[i].length - 3)}</Tag>);
                else if (this.state.tags[i][this.state.tags[i].length - 1] === '3')
                    items.push(<Tag color='cyan' closable key={this.state.tags[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.tags[i])}>
                            {this.state.tags[i].slice(0, this.state.tags[i].length - 3)}</Tag>);
                else
                    items.push(<Tag color='volcano' closable key={this.state.tags[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.tags[i])}>
                            {this.state.tags[i].slice(0, this.state.tags[i].length - 3)}</Tag>);
            }
            return (
                <div style={{marginTop: '10px'}}>
                    <div style={{marginTop: '10px'}}>
                        <Dropdown overlay={this.state.menu1}>
                            <Button type="primary" shape="round" style={{marginLeft: '15px'}}>游戏类型</Button>
                        </Dropdown>
                        <Dropdown overlay={this.state.menu2}>
                            <Button type="primary" shape="round" style={{marginLeft: '15px'}}>游戏主题</Button>
                        </Dropdown>
                        <Dropdown overlay={this.state.menu3}>
                            <Button type="primary" shape="round" style={{marginLeft: '15px'}}>游戏模式</Button>
                        </Dropdown>
                        <Dropdown overlay={this.state.menu4}>
                            <Button type="primary" shape="round" style={{marginLeft: '15px'}}>游戏风格</Button>
                        </Dropdown>
                        <Dropdown overlay={this.state.menu5}>
                            <Button type="primary" shape="round" style={{marginLeft: '15px'}}>发行时间</Button>
                        </Dropdown>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        {items}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            type: 'all',
            tags: [],
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTags = this.getTags.bind(this);
    }

    handleSelectChange(value) {
        this.setState({type: value});
    }

    handleInputChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //console.log(this.state.tags);
        if (this.state.value.length === 0) {
            message.error("搜索框不能为空");
            return;
        }
        var searchTags1 = new Array();
        var searchTags2 = new Array();
        var searchTags3 = new Array();
        var searchTags4 = new Array();
        var searchDate = new Array();
        for (var i = 0; i < this.state.tags.length; i++) {
            if (this.state.tags[i][this.state.tags[i].length - 1] === '4')
                searchDate.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else if (this.state.tags[i][this.state.tags[i].length - 1] === '3')
                searchTags4.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else if (this.state.tags[i][this.state.tags[i].length - 1] === '2')
                searchTags3.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else if (this.state.tags[i][this.state.tags[i].length - 1] === '1')
                searchTags2.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else
                searchTags1.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
        }
        this.props.history.push({pathname: '/result', query: {searchType: this.state.type, searchSize: 100, 
                                searchTags1: searchTags1, searchTags2: searchTags2, searchTags3: searchTags3, 
                                searchTags4: searchTags4, searchDates: searchDate, keyword: this.state.value, lastPage: 'home'}});
    }

    getTags(res) {
        this.setState({tags: res});
        console.log(this.state.tags);
    }

    render() {
        return (
            <div style={{textAlign:'center', width: '90%'}}>
                <div>
                    <img src={require('../assets/logo.png')} width='20%'></img>
                </div>
                <Search
                    addonBefore={<Select defaultValue={this.state.type} className="select-before" onChange={this.handleSelectChange}>
                                    <Option value="all">搜全站</Option>
                                    <Option value="games">搜游戏</Option>
                                    <Option value="news">搜资讯</Option>
                                    <Option value="methods">搜攻略</Option>
                                    <Option value="videos">搜视频</Option>
                                </Select>}
                    placeholder="请输入关键词..."
                    enterButton={<Button type='primary' icon={<SearchOutlined />}>Search</Button>}
                    size="large"
                    style={{width: '50%'}}
                    onChange={this.handleInputChange}
                    onSearch={this.handleSubmit}
                />
                <SearchTags type={this.state.type} recvFunc={this.getTags} />
            </div>
        );
    }
}

export default withRouter(SearchBar);