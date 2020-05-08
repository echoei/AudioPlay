import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../store/storeType";
import AudioListItem from "../Compoents/AudioListItem/AudioListItem";

interface CollectListProps {
  favoriteState: any;
  dispatch: Function;
}
/** 收藏列表 */
class CollectList extends React.Component<CollectListProps> {
  public constructor(props: CollectListProps) {
    super(props);
    console.log(this.props.favoriteState);
  }

  private stopList: Function[] = [];
  private stopFun(fun: Function): void {
    this.stopList.push(fun);
  }

  private stop(): void {
    this.stopList.forEach(item => item());
  }

  public render(): React.ReactNode {
    return <div className="collect-list-con">
      收藏列表
      {
        this.props.favoriteState.list.map((item: any, index: number)=>{
          return <AudioListItem 
            data={item} 
            key={'audio' + index} 
            favoriteList={this.props.favoriteState.list} 
            dispatch={this.props.dispatch}
            stopFun={this.stopFun.bind(this)}
            stop = {this.stop.bind(this)}
          ></AudioListItem>
        })
      }
    </div>
  }
}

export default connect((state: StoreState)=>{
  const { favoriteReducer } = state;
  return { favoriteState: favoriteReducer }
})(CollectList);