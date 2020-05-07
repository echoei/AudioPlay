import React from "react"
import { connect } from "react-redux";
import { StoreState } from "../../store/storeType";
import { actionsTypes } from "../../store/action";
import './AudioListItem.scss';

interface AudioListItemData {
  data: any;
  dispatch: Function;
  favoriteList: any[];
}
export default class AudioListItem extends React.Component<AudioListItemData> {
  public constructor(props: AudioListItemData) {
    super(props);
  }

  public render(): React.ReactNode {
    // console.log(this.props.favorite.list);
    let index: number = this.props.favoriteList.findIndex((item: any)=>{
      return item.name === this.props.data.name;
    });
    
    return <div className="item-div">
    <div>{this.props.data.name}</div>
    <div className={"btn-div" + (index !== -1 ? " collect" : "")} onClick={()=>{
      if(index !== -1) {
        this.props.dispatch({
          type: actionsTypes.DELETE_AUDIO,
          list: [this.props.data]
        })
      }
      else {
        this.props.dispatch({
          type: actionsTypes.ADD_AUDIO,
          list: [this.props.data]
        })
      }
    }}>收藏</div>
  </div>
  }
}
