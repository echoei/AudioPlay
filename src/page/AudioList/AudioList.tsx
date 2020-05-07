import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../../store/storeType";
import './AudioList.scss';
import { actionsTypes } from "../../store/action";
import browserHistory from "../../router/history";
import { collectListRouter } from "../../router/router";
import AudioListItem from "../Compoents/AudioListItem";
interface AudioListProps {
  // audioList: any[];
  audioState: any;
  favoriteState: any;
  dispatch: Function;
}
class AudioList extends React.Component<AudioListProps> {
  public constructor(props: AudioListProps) {
    super(props);
    console.log(props);
  }

  public componentWillMount() {
    //在这里啊，咱们假装请求数据
    new Promise((resolve, reject) => {
      //假装一个请求成功
      setTimeout(()=>{
        resolve({
          list: [
            {
              name: "暗恋说", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "不再见面", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "如她", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "视觉疲劳", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "随心歌", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "他的剑", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "特别曲目", 
              singer: "西瓜jun",
              audioUrl: ""
            },
            {
              name: "状元叹", 
              singer: "西瓜jun",
              audioUrl: ""
            },
          ]
        });
      },0)
    }).then((data: any) => {
      this.props.dispatch({
        type: actionsTypes.UPDATE,
        list: data.list
      })
    })
  }


  public render(): React.ReactNode {
    return <div className="audio-list-con">
      <div className="top-bar">
        <div className="title">音频列表</div>
        <div className="btn" onClick={()=>{
          browserHistory.push(collectListRouter.path);
        }}>收藏列表</div>
      </div>
      
      {
        this.props.audioState.list.map((item: any, index: number)=>{
          return <AudioListItem data={item} key={'audio' + index} favoriteList={this.props.favoriteState.list} dispatch={this.props.dispatch}></AudioListItem>
        })
      }
    </div>
  }
}

export default connect((state: StoreState) => {
  const {  audioListReducer, favoriteReducer }  = state;
  return {audioState: audioListReducer, favoriteState: favoriteReducer};
} )(AudioList);