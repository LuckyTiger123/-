import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Select, Tag, Menu, Dropdown, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

class SearchTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: new Array(),
            menu1: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='动作游戏##0'>动作游戏</Menu.Item>
                    <Menu.Item key='角色扮演##0'>角色扮演</Menu.Item>
                    <Menu.Item key='射击游戏##0'>射击游戏</Menu.Item>
                    <Menu.Item key='赛车游戏##0'>赛车游戏</Menu.Item>
                </Menu>
            ),
            menu2: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='开放世界##1'>开放世界</Menu.Item>
                    <Menu.Item key='生存恐怖##1'>生存恐怖</Menu.Item>
                    <Menu.Item key='剧情##1'>剧情</Menu.Item>
                    <Menu.Item key='科幻##1'>科幻</Menu.Item>
                </Menu>
            ),
            menu3: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='多人##2'>多人</Menu.Item>
                    <Menu.Item key='单人##2'>单人</Menu.Item>
                    <Menu.Item key='第一人称##2'>第一人称</Menu.Item>
                    <Menu.Item key='第三人称##2'>第三人称</Menu.Item>
                </Menu>
            ),
            menu4: (
                <Menu onClick={this.handleClick}>
                    <Menu.Item key='2020##3'>2020</Menu.Item>
                    <Menu.Item key='2019##3'>2019</Menu.Item>
                    <Menu.Item key='2018##3'>2018</Menu.Item>
                    <Menu.Item key='2017##3'>2017</Menu.Item>
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
        var searchTags1 = [], searchTags2 = [], searchTags3 = [], searchDate = [];
        for (var i = 0; i < this.state.tags.length; i++) {
            if (this.state.tags[i][this.state.tags[i].length - 1] === '3')
                searchDate.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else if (this.state.tags[i][this.state.tags[i].length - 1] === '2')
                searchTags3.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else if (this.state.tags[i][this.state.tags[i].length - 1] === '1')
                searchTags2.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
            else
                searchTags1.push(this.state.tags[i].slice(0, this.state.tags[i].length - 3));
        }
        if (this.state.type === 'games') {
            this.props.history.push({pathname: '/result', query: {searchType: 'games', searchSize: 100, 
                                    searchTags1: searchTags1, searchTags2: searchTags2, searchTags3: searchTags3, 
                                    searchDates: searchDate, keyword: this.state.value, lastPage: 'home'}});
        } else {
            this.props.history.push({pathname: '/result', query: {searchType: this.state.type, searchSize: 100, keyword: this.state.value, lastPage: 'home'}});
        }
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
                    allowClear='true'
                />
                <SearchTags type={this.state.type} recvFunc={this.getTags} />
            </div>
        );
    }
}

export default withRouter(SearchBar);