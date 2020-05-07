import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../store/storeType";
import AudioListItem from "../Compoents/AudioListItem";

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

  public render(): React.ReactNode {
    return <div className="collect-list-con">
      收藏列表
      {
        this.props.favoriteState.list.map((item: any, index: number)=>{
          return <AudioListItem data={item} key={'audio' + index} favoriteList={this.props.favoriteState.list} dispatch={this.props.dispatch}></AudioListItem>
        })
      }
    </div>
  }
}

export default connect((state: StoreState)=>{
  const { favoriteReducer } = state;
  return { favoriteState: favoriteReducer }
})(CollectList);