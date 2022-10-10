import React from "react";

export default function VehicleScreen(props) {
    return (
        props.vehicleList.map((v, i) => {
            return (
                <div className="weui-media-box weui-media-box_text" key={i} style={{textAlign: 'left'}}>
                    <div className="weui-media-box__title weui-media-box__title_in-text">{v.name}：{v.info}</div>
                    <div className={"weui-media-box__desc display-type_"+v.colorType}>{v.time}</div>
                </div>
            )
        })
    )
}
