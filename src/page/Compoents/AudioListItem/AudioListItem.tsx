import React from "react"
import { connect } from "react-redux";
import { StoreState } from "../../../store/storeType";
import { actionsTypes } from "../../../store/action";
import './AudioListItem.scss';
import ReactDOM from "react-dom";

interface AudioListItemData {
  data: any;
  dispatch: Function;
  favoriteList: any[];
  //使每个音频的stop函数订阅父组件，方便控制
  stopFun: (fn: Function)=>void;
  //父组件的stop方法
  stop: ()=> void;
}
interface AudioListItemState {
  audioPlaying: boolean;
}
export default class AudioListItem extends React.Component<AudioListItemData, AudioListItemState> {
  private audioPlaying: boolean = false;
  private audio: HTMLAudioElement = {} as HTMLAudioElement;
  private curAudioUrl: string = "";
  public constructor(props: AudioListItemData) {
    super(props);
    this.state = {
      audioPlaying: false,
    }
   
  }

  public componentDidMount() {
    let cur: Element = ReactDOM.findDOMNode(this) as Element;
    this.audio = cur.getElementsByTagName("audio")[0];
    this.audio.load();
    let progress_con: HTMLElement = cur.getElementsByClassName("progress-con")[0] as HTMLElement;
    let progress: HTMLElement = cur.getElementsByClassName("progress")[0] as HTMLElement;
    this.audio.addEventListener("timeupdate", ()=>{
      let width: number = 10 + this.audio.currentTime / this.audio.duration * (progress_con.clientWidth - 10);
      progress.style.width = width + "px";
    });
    //增加stop订阅者
    this.props.stopFun(this.stop.bind(this));
  }

  private stop() {
    // console.log(this.audio.);
    //如果不是当前点击的音频就绝对关闭
    if(!this.curAudioUrl)
    {
      this.audio.pause();
      this.audio.currentTime = 1;
      this.audioPlaying = false;
      this.setState({
        audioPlaying: false
      })
    }
    this.curAudioUrl = "";
  }

  public render(): React.ReactNode {
    // console.log(this.props.favorite.list);
    let index: number = this.props.favoriteList.findIndex((item: any)=>{
      return item.name === this.props.data.name;
    });
    let audioUrl: string = "../../assets/audio/" + this.props.data.audioUrl;
    return <div className="item-div">
    <div>{this.props.data.name}</div>
    <div className="audio" >
      <audio>
        <source src={audioUrl} type=""/>
      </audio>
      <div className="controller">
        <div className={"paly-btn" + (this.state.audioPlaying ? " playing" : "")} onClick={(e)=>{
          this.curAudioUrl = this.audio.currentSrc;
          this.props.stop();
          if(this.audioPlaying) {
            this.audio.pause()
          }
          else {
            this.audio.play();
          }
          this.audioPlaying = !this.audioPlaying;
          this.setState({
            audioPlaying: this.audioPlaying
          })
          }}>
        </div>
        <div className="progress-con">
          <div className="progress"></div>
        </div>
      </div>
    </div>
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
