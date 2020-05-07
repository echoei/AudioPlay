import React from "react";
import { deepClone, Promise1 } from "../../utils/objUtil";
import "./Home.scss";
import axios, { AxiosRequestConfig } from "axios";
import { connect, Provider } from "react-redux";
import { increment } from "../../store/action";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import createBrowserHistory from "../../router/history";
import { audioListRouter, collectListRouter } from "../../router/router";
import store from "../../store/store";

interface HomeProps {
    // incrementState: any;
    // dispatch: Function;
    // state:any;
}
interface HomeState {
    show: boolean;
    count: number;
}

export class Home extends React.Component<HomeProps, HomeState> {
    public constructor(props: HomeProps) {
        super(props);
        this.state = {
            show: true,
            count: 0,
            // number: this.props.incrementState.number
        }
        // let obj1: Obj = {
        //     a: "aa",
        //     b: {
        //         d: "dd",
        //     }
        // }

        // let obj2: any = deepClone(obj1);
        // obj2.b.c= "FF";
        // console.log("---obj1---");
        // console.log(obj1);
        // console.log("---obj2---");
        // console.log(obj2);
        let jsonObj: any = {
            obj: {
                a: "sss",
            },
            _null: null,
            _undefined: undefined,
            _NaN: NaN,
            _infinity: Infinity,
            _date: new Date(1585449816000),
            _rex: /\d/,
            _set: new Set([1,2,3]),
            _map: new Map([["foo", "map"]])
        }

        // let jsonClone: any = JSON.parse(JSON.stringify(jsonObj));
        // console.log(jsonClone);
        let clone: any = deepClone(jsonObj);
        // console.log(clone._date.getTime());

        // let p1 = new Promise((resolve, reject)=>{
        //     resolve("测试");
        // });
        // let p2 = p1.then((value)=>{
        //     console.log(value);
        // }, (err)=>{});
        // p2.then(data=>{
        //     console.log(data);
        // }).catch(err=>{
        //     console.log(err);
        // })

        // let p1 = new Promise1((resolve: Function)=>{
        //     setTimeout(()=>{
        //         resolve("测试");
        //     },1000);
        // });
        // p1.then((data: any)=>{
        //     console.log(1);
        //     console.log(data.name);
        //     return new Promise1((resolve: Function, reject: Function)=>{
        //         setTimeout(()=>{
        //             reject("出现错误了");
        //         },2000);
        //     });
        // }).then((use: any)=>{
        //     console.log(2);
        //     console.log(use);
        // }, (use: any)=>{
        //     console.log(use);
        // })  

    //    console.log(this.regNumToKilo(121522000.1548));
    //     let i:number = 1;
    //    let intervalTime = setInterval(()=>{
    //         if(i>2){
    //             clearInterval(intervalTime);
    //         }
    //        console.log("interval");
    //        i++;
    //    },10)
    //    setTimeout(()=>{
    //        console.log("timeout");
    //    },10);
        //http://t1.6tiantian.com:8080/ajax/stat2/cp/book/question/stat/list?bookId=11251&statMonth=202004&pageNumber=1&pageSize=20&type=3
        // this.test();

        /** 测试redux */
  

    }

    private async  test() {
        let config:AxiosRequestConfig = {
            url: "http://t1.6tiantian.com/ajax/stat2/cp/book/question/stat/list",
            method: "get",
            params:{
                bookId:11251,
                statMonth:202004,
                pageNumber:1,
                pageSize:20,
                type:3
            }
        }
        let res = await axios.request(config);
        console.log(res);
    }

    private reqFun(url: string, data: any): Promise<any> {
        return Promise.race([
            axios.get(url,{
                params: data
            }),
            new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    //这里是超时进行
                }, 10000)
            })
        ]);
    }

    private regNumToKilo(num: number): string {
        let reg: RegExp = /(\d*)(?<=\d)(\d{3})/;//(\d*)(?<=\d)(\d{3})
        let numStr: string = num + "";
        
        while(reg.test(numStr)){
            console.log(numStr);
            console.log(numStr.match(reg));
            numStr = numStr.replace(reg, "$1,$2");
        }
        return numStr;
    }

    private numToKilo(num: number): string {
        const numList: string[]  = (num+"").split(".");
        return numList.reduce((pre, cur, index)=>{
            return index ===  0 ? pre + this.strToKilo(cur) : pre + "." + this.strToKilo(cur)
        }, "")
    }

    private strToKilo(str: string): string {
        let tempStr: string = str;
        let kiloStr: string = "";
        //每次从tempStr中取后面三位组成一个新的字符串，当tempStr长度小于等于三时便不用取了
        while(tempStr.length>3){
            //取出tempStr后三位
            let _str: string = tempStr.substr(tempStr.length - 3, 3);
            //将取出的字符串从原来的字符串中删除
            tempStr = tempStr.replace(_str, "");
            //三位之前要加逗号，放入新的数组中
            kiloStr = "," + _str + kiloStr;
        }
        //返回最后剩余的tempStr 和 组合好的kiloStr的组合，得到千分显示
        return tempStr + kiloStr;
    }

 


    public render(): React.ReactNode {
        
        return <Router history={createBrowserHistory}>
            <Switch>
                <Route exact path={audioListRouter.path} component={audioListRouter.component}></Route>
                <Route path={collectListRouter.path} component={collectListRouter.component}></Route>
                <Redirect to={audioListRouter.path}></Redirect>
            </Switch>
        </Router>
       
        
       
    }
}

interface Obj {
    a: string;
    b: bObj;
}

interface bObj {
    d: string;
    c?: any;
}

export default connect((state)=> ({state: state}))(Home);