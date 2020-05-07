export function sycnState(content:any, obj: any): Promise<any> {
  return new Promise((resolve, reject) =>{
    content.setState(obj, resolve)
  })
}