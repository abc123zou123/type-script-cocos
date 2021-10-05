
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NoInst
 * DateTime = Sun Oct 03 2021 16:51:30 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = NoInst.ts
 * FileBasenameNoExtension = NoInst
 * URL = db://assets/Script/Framework/Component/NoInst.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
/**
 * 所有游戏相关的预制体节点(不含UI)都需要挂上该节点
 */
@ccclass('GoInst')
export class GoInst extends Component 
{
    /**
     * 对象池的名称
     */
    poolName: string;


    start () 
    {

    }

  
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
