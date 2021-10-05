
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestAsync
 * DateTime = Sun Oct 03 2021 15:55:54 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = TestAsync.ts
 * FileBasenameNoExtension = TestAsync
 * URL = db://assets/Script/Test/TestAsync.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('TestAsync')
export class TestAsync extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    async start () {
        // [3]
        console.log("ok000");
        var a = await this.test();
        console.log("ok111");

    }

    async  test() {
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve(null);
            }, 5000);
        })
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
