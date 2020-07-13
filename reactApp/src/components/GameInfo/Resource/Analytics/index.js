import React, { useEffect, useState } from 'react';
import { generateDates } from './dates';
import { FrownOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';

import "./index.css"


export const Analytics = ({ baiduIndex }) => {
  const [showType, setShowType] = useState(0);

  useEffect(() => {
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
  }, [])

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
          </div>
        }
      </div>
      <div className="button-container">
        <div className="analytics-switch-button">
          <Button ghost onClick={() => (showType === 0 ? setShowType(1) : setShowType(0))}>
            {showType == 0 ? "点击生成词云" : "查看百度指数"}
          </Button>
        </div>
      </div>
    </>
  )
}