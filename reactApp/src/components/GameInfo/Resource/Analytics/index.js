import React, { useEffect, useState } from 'react';
import { generateDates } from './dates';
import { FrownOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'echarts-wordcloud';

import "./index.css"

export const Analytics = ({ baiduIndex, words }) => {
  const [showType, setShowType] = useState(0);

  const initChart = () => {
    const charts = echarts.init(document.getElementById("analytics-chart"));
    charts.setOption({
      xAxis: {
        type: 'category',
        data: generateDates("2020-01-01", baiduIndex.length),
        axisLabel: {
          interval: 30,
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [{
        data: baiduIndex,
        type: 'line',
        symbol: "none",
      }],
    });
  }

  const initWordCloud = () => {
    let wordCloud = echarts.init(document.getElementById('analytics-word-cloud'));
    let maskImage = new Image();
    maskImage.src = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI1NnB4IiBoZWlnaHQ9IjI1NnB4IiB2aWV3Qm94PSIwIDAgNTQ4LjE3NiA1NDguMTc2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NDguMTc2IDU0OC4xNzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNNTI0LjE4MywyOTcuMDY1Yy0xNS45ODUtMTkuODkzLTM2LjI2NS0zMi42OTEtNjAuODE1LTM4LjM5OWM3LjgxLTExLjk5MywxMS43MDQtMjUuMTI2LDExLjcwNC0zOS4zOTkgICBjMC0yMC4xNzctNy4xMzktMzcuNDAxLTIxLjQwOS01MS42NzhjLTE0LjI3My0xNC4yNzItMzEuNDk4LTIxLjQxMS01MS42NzUtMjEuNDExYy0xOC4yNzEsMC0zNC4wNzEsNS45MDEtNDcuMzksMTcuNzAzICAgYy0xMS4yMjUtMjcuMDI4LTI5LjA3NS00OC45MTctNTMuNTI5LTY1LjY2N2MtMjQuNDYtMTYuNzQ2LTUxLjcyOC0yNS4xMjUtODEuODAyLTI1LjEyNWMtNDAuMzQ5LDAtNzQuODAyLDE0LjI3OS0xMDMuMzUzLDQyLjgzICAgYy0yOC41NTMsMjguNTQ0LTQyLjgyNSw2Mi45OTktNDIuODI1LDEwMy4zNTFjMCwyLjg1NiwwLjE5MSw2Ljk0NSwwLjU3MSwxMi4yNzVjLTIyLjA3OCwxMC4yNzktMzkuODc2LDI1LjgzOC01My4zODksNDYuNjg2ICAgQzYuNzU5LDI5OS4wNjcsMCwzMjIuMDU1LDAsMzQ3LjE4YzAsMzUuMjExLDEyLjUxNyw2NS4zMzMsMzcuNTQ0LDkwLjM1OWMyNS4wMjgsMjUuMDMzLDU1LjE1LDM3LjU0OCw5MC4zNjIsMzcuNTQ4aDMxMC42MzYgICBjMzAuMjU5LDAsNTYuMDk2LTEwLjcxNSw3Ny41MTItMzIuMTIxYzIxLjQxMy0yMS40MTIsMzIuMTIxLTQ3LjI0OSwzMi4xMjEtNzcuNTE1ICAgQzU0OC4xNzIsMzM5Ljc1Nyw1NDAuMTc0LDMxNi45NTIsNTI0LjE4MywyOTcuMDY1eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
    maskImage.onload = () => {
      wordCloud.setOption({
        backgroundColor: '',
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [{
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [25, 75],
          rotationRange: [-45, 0, 45, 90],
          maskImage: maskImage,
          textStyle: {
            normal: {
              color: () => {
                return 'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) +
                  ', ' + Math.round(Math.random() * 255) + ')'
              }
            }
          },
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '90%',
          height: '110%',
          data: words
        }]
      })
    }
  }

  useEffect(() => {
    if (showType === 0) {
      initChart();
    } else {
      initWordCloud();
    }
  }, [showType])

  const noneBaiduIndexDesc = () => (
    < div className="empty-content" >
      <FrownOutlined />暂无相关内容
    </div >
  )

  return (
    <>
      <div className="analytics-info">
        {showType === 0 ?
          <div className="analytics-chart-container">
            {baiduIndex.length === 0 && noneBaiduIndexDesc()}
            <div style={{ display: baiduIndex.length === 0 ? 'none' : 'inline' }}>
              <div className="analytics-chart-info">
                <div className="analytics-desc">用户日搜索量</div>
                <div className="analytics-source">来源：百度指数</div>
              </div>
              <div
                id="analytics-chart"
                className="analytics-chart"
                style={{ height: '600px', width: '980px' }}>
              </div>
            </div>
          </div> :
          <div className="word-cloud-container">
            <div></div>
            {words.length === 0 && noneBaiduIndexDesc()}
            <div style={{ display: words.length === 0 ? 'none' : 'inline' }}>
              <div
                id="analytics-word-cloud"
                className="analytics-word-cloud"
                style={{ height: '600px', width: '980px' }}>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="button-container">
        <div className="analytics-switch-button">
          <Button ghost onClick={() => (showType === 0 ? setShowType(1) : setShowType(0))}>
            {showType === 0 ? "点击生成词云" : "查看百度指数"}
          </Button>
        </div>
      </div>
    </>
  )
}