import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Select, Tag, Divider, Collapse, Button, message } from 'antd';
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;
const { Panel } = Collapse;

const typeTagsData = ['游戏', '资讯', '攻略', '视频'];
const gameTagsData1 = ['动作游戏', '角色扮演', '射击游戏', '赛车游戏', '战争游戏', '模拟游戏', '体育游戏', '文字游戏', '即时战略游戏', '音乐游戏', '虚拟现实', '冒险游戏', '恋爱游戏'];
const gameTagsData2 = ['开放世界', '生存恐怖', '剧情', '科幻', '校园', '沙盒', '教育', '历史', '养成'];
const gameTagsData3 = ['多人', '单人', '第一人称', '第三人称', '网页游戏', '合作'];
const gameTagsData4 = ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010以前'];

class GameTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags1: props.gameTags1,
            selectedTags2: props.gameTags2,
            selectedTags3: props.gameTags3,
            selectedTags4: props.gameTags4,
        }
    }

    handleChange(tag, checked, tagIndex) {
        let nextSelectedTags;
        if (tagIndex === 1) {
            nextSelectedTags = checked ? [...this.state.selectedTags1, tag] : this.state.selectedTags1.filter(t => t !== tag);
            this.setState({ selectedTags1: nextSelectedTags });
            
        } else if (tagIndex === 2) {
            nextSelectedTags = checked ? [...this.state.selectedTags2, tag] : this.state.selectedTags2.filter(t => t !== tag);
            this.setState({ selectedTags2: nextSelectedTags });
        } else if (tagIndex === 3) {
            nextSelectedTags = checked ? [...this.state.selectedTags3, tag] : this.state.selectedTags3.filter(t => t !== tag);
            this.setState({ selectedTags3: nextSelectedTags });
        } else {
            nextSelectedTags = checked ? [...this.state.selectedTags4, tag] : this.state.selectedTags4.filter(t => t !== tag);
            this.setState({ selectedTags4: nextSelectedTags });
        }
        this.props.recvFunc(nextSelectedTags, tagIndex);
        // console.log(nextSelectedTags);
        // console.log(this.state);
    }

    handleClose = (e, tagIndex) => {
        let nextSelectedTags;
        if (tagIndex === 1) {
            nextSelectedTags = this.state.selectedTags1;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 1);
            this.setState({ selectedTags1: nextSelectedTags });
        } else if (tagIndex === 2) {
            nextSelectedTags = this.state.selectedTags2;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 1);
            this.setState({ selectedTags2: nextSelectedTags });
        } else if (tagIndex === 3) {
            nextSelectedTags = this.state.selectedTags3;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 1);
            this.setState({ selectedTags3: nextSelectedTags });
        } else {
            nextSelectedTags = this.state.selectedTags4;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 1);
            this.setState({ selectedTags4: nextSelectedTags });
        }
        this.props.recvFunc(nextSelectedTags, tagIndex);
        // console.log(nextSelectedTags);
        // console.log(this.state);
    }

    render() {
        if (this.props.type === 'games') {
            const selectedTags1 = this.state.selectedTags1;
            const selectedTags2 = this.state.selectedTags2;
            const selectedTags3 = this.state.selectedTags3;
            const selectedTags4 = this.state.selectedTags4;
            var items = new Array();
            for (var i = 0; i < this.state.selectedTags1.length; i++) {
                items.push(<Tag color='blue' closable key={this.state.selectedTags1[i]}  style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.selectedTags1[i], 1)}>
                            {this.state.selectedTags1[i]}</Tag>);
            }
            for (var i = 0; i < this.state.selectedTags2.length; i++) {
                items.push(<Tag color='geekblue' closable key={this.state.selectedTags2[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.selectedTags2[i], 2)}>
                            {this.state.selectedTags2[i]}</Tag>);
            }
            for (var i = 0; i < this.state.selectedTags3.length; i++) {
                items.push(<Tag color='purple' closable key={this.state.selectedTags3[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.selectedTags3[i], 3)}>
                            {this.state.selectedTags3[i]}</Tag>);
            }
            for (var i = 0; i < this.state.selectedTags4.length; i++) {
                items.push(<Tag color='volcano' closable key={this.state.selectedTags4[i]} style={{borderRadius: '10px'}} onClose={this.handleClose.bind(this, this.state.selectedTags4[i], 4)}>
                            {this.state.selectedTags4[i]}</Tag>);
            }
            return (
                <div style={{width: '75%', margin: '0 auto'}}>
                    <div style={{marginBottom: '1%', marginTop: '1%'}}>
                        {items}
                    </div>
                    <Collapse
                        bordered='true'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} style={{color: 'white'}}/>}
                        className="site-collapse-custom-collapse"
                        expandIconPosition='right'
                        ghost='true'
                        style={{backgroundColor: 'rgba(245, 245, 245, 0.4)'}}
                    >
                        <Divider dashed='true'/>
                        <Panel header={<span style={{color: 'white'}}><b>游戏类型</b></span>} key="1" className="site-collapse-custom-panel" extra={<span style={{color: 'white'}}>展开</span>}>
                            {gameTagsData1.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags1.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 1)}
                                    style={{float: 'left', width: '16%', color: 'white', fontSize: '15px', fontFamily: 'KaiTi'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Divider dashed='true'/>
                        <Panel header={<span style={{color: 'white'}}><b>游戏主题</b></span>} key="2" className="site-collapse-custom-panel" extra={<span style={{color: 'white'}}>展开</span>}>
                            {gameTagsData2.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags2.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 2)}
                                    style={{float: 'left', width: '16%', color: 'white', fontSize: '15px', fontFamily: 'KaiTi'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Divider dashed='true'/>
                        <Panel header={<span style={{color: 'white'}}><b>游戏模式</b></span>} key="3" className="site-collapse-custom-panel" extra={<span style={{color: 'white'}}>展开</span>}>
                            {gameTagsData3.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags3.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 3)}
                                    style={{float: 'left', width: '16%', color: 'white', fontSize: '15px', fontFamily: 'KaiTi'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Divider dashed='true'/>
                        <Panel header={<span style={{color: 'white'}}><b>发行时间</b></span>} key="4" className="site-collapse-custom-panel" extra={<span style={{color: 'white'}}>展开</span>}>
                            {gameTagsData4.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags4.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 4)}
                                    style={{float: 'left', width: '16%', color: 'white', fontSize: '15px', fontFamily: 'KaiTi'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Divider dashed='true'/>
                    </Collapse>,
                </div>
            );
        } else {
            return null;
        }
    }
}

class TypeTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTags: props.typeTags,
        }
    }

    handleChange(tag, checked) {
        const selectedTags = this.state.selectedTags;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        this.setState({ selectedTags: nextSelectedTags });
        //console.log(nextSelectedTags);
        this.props.recvFunc(nextSelectedTags);
    }

    render() {
        //console.log(this.state.selectedTags);
        if (this.props.type === 'all') {
            const selectedTags = this.state.selectedTags;
            return (
                <>
                    <span style={{fontSize: '15px', color: 'white'}}><b>筛选结果：</b></span>
                    {typeTagsData.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            onChange={checked => this.handleChange(tag, checked)}
                            style={{color: 'white'}}
                        >
                            {tag}
                        </CheckableTag>
                    ))}
                </>
            );
        } else {
            return null;
        }
    }
}

class SearchBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.keyword,
            type: props.searchType,
            typeTags: props.searchTypeTags,
            gameTags1: props.searchTags1,
            gameTags2: props.searchTags2,
            gameTags3: props.searchTags3,
            gameTags4: props.searchDates,
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTypeTags = this.getTypeTags.bind(this);
        this.getGameTags = this.getGameTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelectChange(value) {
        this.setState({type: value});
    }

    handleInputChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //console.log(this.state.value + ' ' + this.state.type);
        if (this.state.value.length === 0) {
            message.error("搜索框不能为空");
            return;
        }
        this.props.reSearchFunc(this.state);
    }

    getTypeTags(res) {
        this.setState({typeTags: res});
        //console.log(this.state.typeTags);
        this.props.recvTypeFunc(res);
    }

    getGameTags(res, resIndex) {
        if (resIndex === 1) {
            this.setState({gameTags1: res});
            this.props.recvGameFunc(res, this.state.gameTags2, this.state.gameTags3, this.state.gameTags4);
        } else if (resIndex === 2) {
            this.setState({gameTags2: res});
            this.props.recvGameFunc(this.state.gameTags1, res, this.state.gameTags3, this.state.gameTags4);
        } else if (resIndex === 3) {
            this.setState({gameTags3: res});
            this.props.recvGameFunc(this.state.gameTags1, this.state.gameTags2, res, this.state.gameTags4);
        } else {
            this.setState({gameTags4: res});
            this.props.recvGameFunc(this.state.gameTags1, this.state.gameTags2, this.state.gameTags3, res);
        }
        // console.log(res);
        // console.log(this.state);
    }

    render() {
        //console.log(this.state);
        return (
            <div style={{width: '100%'}}>
                <div style={{textAlign:'center', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={require('../assets/logo.png')} width='15%'></img>
                    <Search
                        addonBefore={<Select defaultValue={this.state.type} className="select-before" onChange={this.handleSelectChange}>
                                        <Option value="all">搜全站</Option>
                                        <Option value="games">搜游戏</Option>
                                        <Option value="news">搜资讯</Option>
                                        <Option value="methods">搜攻略</Option>
                                        <Option value="videos">搜视频</Option>
                                    </Select>}
                        value={this.state.value}
                        enterButton={<Button type='primary' icon={<SearchOutlined />}>Search</Button>}
                        size="large"
                        style={{width: '40%', marginLeft: '1%'}}
                        onChange={this.handleInputChange}
                        onSearch={this.handleSubmit}
                    />
                </div>
                <div style={{marginTop: '1%'}}>
                    <TypeTags typeTags={this.state.typeTags} type={this.state.type} recvFunc={this.getTypeTags} />
                    <GameTags gameTags1={this.state.gameTags1} gameTags2={this.state.gameTags2} gameTags3={this.state.gameTags3} gameTags4={this.state.gameTags4} type={this.state.type}  recvFunc={this.getGameTags} />
                </div>
            </div>
        );
    }
}

export default withRouter(SearchBlock);