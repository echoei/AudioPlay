import React from "react";
import browserHistory from "../../../router/history";
import './TopBar.scss';

export interface TopBarProps {
  hasBtn?: hasBtnData;
  isHome?: boolean;
}

interface hasBtnData {
  name: string,
  path: string
}

export default class TopBar extends React.Component<TopBarProps> {
  public constructor(props: TopBarProps){
    super(props);
  }

  public render(): React.ReactNode {
    return <header className="top-bar">
    <h3 className="title">音频列表</h3>
    {!this.props.isHome && <div className="btn back" onClick={()=>{
      browserHistory.goBack();
    }}>返回</div>}
    {this.props.hasBtn && <div className="btn" onClick={()=>{
      const _path:string = this.props.hasBtn ? this.props.hasBtn.path : "";
      browserHistory.push(_path);
    }}>{this.props.hasBtn.name}</div>}
  </header>
  }
}