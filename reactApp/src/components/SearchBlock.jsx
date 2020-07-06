import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Select, Tag, Divider, Collapse } from 'antd';
import { CaretRightOutlined} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;
const { Panel } = Collapse;

const typeTagsData = ['游戏', '资讯', '攻略', '视频'];
const gameTagsData1 = ['动作游戏', '角色扮演', '射击游戏', '赛车游戏', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '2剧情', '剧情', '剧情', '剧1情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情', '剧情'];
const gameTagsData2 = ['开放世界', '生存恐怖', '剧情', '科幻'];
const gameTagsData3 = ['多人', '单人', '第一人称', '第三人称'];
const gameTagsData4 = ['2020', '2019', '2018', '2017'];

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
    }

    handleClose = (e, tagIndex) => {
        let nextSelectedTags;
        if (tagIndex === 1) {
            nextSelectedTags = this.state.selectedTags1;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 1);
            this.setState({ selectedTags1: nextSelectedTags });
        } else if (tagIndex === 2) {
            nextSelectedTags = this.state.selectedTags2;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 2);
            this.setState({ selectedTags2: nextSelectedTags });
        } else if (tagIndex === 3) {
            nextSelectedTags = this.state.selectedTags3;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 3);
            this.setState({ selectedTags3: nextSelectedTags });
        } else {
            nextSelectedTags = this.state.selectedTags4;
            nextSelectedTags.splice(nextSelectedTags.indexOf(e), 4);
            this.setState({ selectedTags4: nextSelectedTags });
        }
        this.props.recvFunc(nextSelectedTags, tagIndex);
    }

    render() {
        if (this.props.type === 'games') {
            const selectedTags1 = this.state.selectedTags1;
            const selectedTags2 = this.state.selectedTags2;
            const selectedTags3 = this.state.selectedTags3;
            const selectedTags4 = this.state.selectedTags4;
            var items = new Array();
            for (var i = 0; i < this.state.selectedTags1.length; i++) {
                items.push(<Tag color='magenta' closable key={this.state.selectedTags1[i]} onClose={this.handleClose.bind(this, this.state.selectedTags1[i], 1)}>
                            {this.state.selectedTags1[i]}</Tag>);
            }
            for (var i = 0; i < this.state.selectedTags2.length; i++) {
                items.push(<Tag color='red' closable key={this.state.selectedTags2[i]} onClose={this.handleClose.bind(this, this.state.selectedTags2[i], 2)}>
                            {this.state.selectedTags2[i]}</Tag>);
            }
            for (var i = 0; i < this.state.selectedTags3.length; i++) {
                items.push(<Tag color='volcano' closable key={this.state.selectedTags3[i]} onClose={this.handleClose.bind(this, this.state.selectedTags3[i], 3)}>
                            {this.state.selectedTags3[i]}</Tag>);
            }
            for (var i = 0; i < this.state.selectedTags4.length; i++) {
                items.push(<Tag color='orange' closable key={this.state.selectedTags4[i]} onClose={this.handleClose.bind(this, this.state.selectedTags4[i], 4)}>
                            {this.state.selectedTags4[i]}</Tag>);
            }
            return (
                <div style={{width: '45%', margin: '0 auto'}}>
                    <div style={{marginBottom: '1%'}}>
                        {items}
                    </div>
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                        expandIconPosition='right'
                        ghost='true'
                    >
                        <Panel header={<span style={{color: 'rgb(238,79,166)'}}><b>游戏类型</b></span>} key="1" className="site-collapse-custom-panel">
                            {gameTagsData1.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags1.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 1)}
                                    style={{float: 'left', width: '12.5%'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Panel header={<span style={{color: 'rgb(245,34,45)'}}><b>游戏主题</b></span>} key="2" className="site-collapse-custom-panel">
                            {gameTagsData2.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags2.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 2)}
                                    style={{float: 'left', width: '12.5%'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Panel header={<span style={{color: 'rgb(250,87,32)'}}><b>游戏模式</b></span>} key="3" className="site-collapse-custom-panel">
                            {gameTagsData3.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags3.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 3)}
                                    style={{float: 'left', width: '12.5%'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
                        <Panel header={<span style={{color: 'rgb(250,140,22)'}}><b>发行时间</b></span>} key="4" className="site-collapse-custom-panel">
                            {gameTagsData4.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags4.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked, 4)}
                                    style={{float: 'left', width: '12.5%'}}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </Panel>
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
        //this.handleChange = this.handleChange.bind(this);
    }

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        this.setState({ selectedTags: nextSelectedTags });
        this.props.recvFunc(nextSelectedTags);
    }

    render() {
        if (this.props.type === 'all') {
            const { selectedTags } = this.state;
            return (
                <>
                    <span style={{fontSize: '15px'}}><b>筛选结果：</b></span>
                    {typeTagsData.map(tag => (
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag) > -1}
                            onChange={checked => this.handleChange(tag, checked)}
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
            value: '',
            type: 'games',
            typeTags: ['游戏', '资讯', '攻略', '视频'],
            gameTags1: ['动作游戏'],
            gameTags2: ['开放世界'],
            gameTags3: ['多人'],
            gameTags4: ['2020'],
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTypeTags = this.getTypeTags.bind(this);
        this.getGameTags = this.getGameTags.bind(this);
    }



    handleSelectChange(value) {
        this.setState({type: value});
    }

    handleInputChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state.value + ' ' + this.state.type);
        
    }

    getTypeTags(res) {
        console.log(res);
        this.setState({typeTags: res});
        //console.log(this.state.typeTags);
    }

    getGameTags(res, resIndex) {
        if (resIndex === 1) {
            this.setState({selectedTags1: res});
        } else if (resIndex === 2) {
            this.setState({selectedTags2: res});
        } else if (resIndex === 3) {
            this.setState({selectedTags3: res});
        } else {
            this.setState({selectedTags4: res});
        }
        console.log(this.state.gameTags1);
        console.log(this.state.gameTags2);
        console.log(this.state.gameTags3);
        console.log(this.state.gameTags4);
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <div style={{textAlign:'center', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <img src={require('../assets/logo1.png')} width='15%'></img>
                    <Search
                        addonBefore={<Select defaultValue="all" className="select-before" onChange={this.handleSelectChange}>
                                        <Option value="all">搜全站</Option>
                                        <Option value="games">搜游戏</Option>
                                        <Option value="news">搜资讯</Option>
                                        <Option value="methods">搜攻略</Option>
                                        <Option value="videos">搜视频</Option>
                                    </Select>}
                        value="鬼泣5"
                        enterButton="Search"
                        size="large"
                        style={{width: '40%', marginLeft: '1%'}}
                        onChange={this.handleInputChange}
                        onSearch={this.handleSubmit}
                        allowClear='true'
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

export default SearchBlock;