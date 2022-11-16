import React from "react";

export default function SearchResult(props) {
    return (
        props.stationList.map((v, i) => {
            return (
                <a href={"#/bus/detail?regionId=330600&stationId="+v.stationId} key={i}>
                    <div className="weui-media-box weui-media-box_text">
                        <div className="weui-media-box__title weui-media-box__title_in-text" data-mid={v.stationId}>{v.stationName}</div>
                        <div className="weui-media-box__desc">站台编号：{v.stationId}</div>
                        <div className="weui-media-box__desc">地铁换乘：{v.stationMetro === 1 ? '是' : '否'}</div>
                    </div>
                </a>
            )
        })
    )
}
