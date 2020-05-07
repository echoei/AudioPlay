export function deepClone(obj: any): any{
  if(!obj || typeof obj !== "object"){
    return obj;
  }
  
  let _obj: any = new obj.constructor();
  switch(getObjType(obj)) {
    case objType.Array:
    case objType.Object:
      for(let key in obj) {
        //这是为了判断当前key不是继承的属性
        if(obj.hasOwnProperty(key)) {
          _obj[key] = deepClone(obj[key]);
        }
      };
      break;
    case objType.Date:
      _obj = new Date(obj);
      break;
    case objType.RegExp:
      _obj = new RegExp(obj);
      _obj.lastIndex = obj.lastIndex;
      break;
    case objType.Set:
      for(let value of obj) {
        _obj.add(value);
      }
      break;
    case objType.Map:
      for(let [key, value] of obj) {
        //map对象的key也可以是引用类型
        _obj.set(deepClone(key), deepClone(value));
      }
      break;
  }
  return _obj;
  
}

const objType = {
  Object: "Object",
  Array: "Array",
  Date: "Date",
  Set: "Set",
  RegExp: "RegExp",
  Map: "Map"
}

function getObjType<T>(obj: T): string {
  let typeStr: string = Object.prototype.toString.call(obj).slice(8,-1);
  return typeStr;
}


export class Promise1 {
  private state: string = 'pending';
  private value: any = null;
  private callbacks: any[] = [];
  public constructor(fn: Function) {
    fn(this.resolve.bind(this),this.rejected.bind(this));
  }

  public then (onFulfilled: Function, onRejected?: Function) {
      return new Promise1((resolve: Function, rejected: Function)=> {
          this.handle({
              onFulfilled: onFulfilled || null,
              onRejected: onRejected || null,
              resolve: resolve,
              rejected: rejected
          });
      });
  };

  private handle(callback: any) {
      if (this.state === 'pending') {
          this.callbacks.push(callback);
          return;
      }
      console.log("------------handle-------------");
      //如果then中没有传递任何东西
      let tempFun = "fulfilled" ? callback.onFulfilled : callback.onRejected;
      if(tempFun == null) {
        let _curFun = "fulfilled" ? callback.resolve: callback.rejected;
          _curFun(this.value);
          return;
      }

      if(this.state === "fulfilled") {
        try {
          let ret = tempFun(this.value);
          callback.resolve(ret);
        } catch (e) {
          callback.rejected(e);
        }
      }
      else {
        let ret = callback.onRejected(this.value);
        callback.rejected(ret);
      }
  }


  private resolve(newValue: any) {
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (typeof then === 'function') {
              then.call(newValue, this.resolve.bind(this), this.rejected.bind(this));
              return;
          }
      }
      console.log(this.state);
      this.state = 'fulfilled';
      this.value = newValue;
      console.log(this.callbacks);
      setTimeout(() => {
          this.callbacks.forEach((callback)=> {
            console.log("啥空的你怎么进来的");
              this.handle(callback);
          });
      }, 0);
  }

  private rejected(reason: any) {
    this.state = "rejected";
    this.value = reason;
    setTimeout(() => {
      this.callbacks.forEach((callback)=> {
          this.handle(callback);
      });
  }, 0);
  }

  
}

