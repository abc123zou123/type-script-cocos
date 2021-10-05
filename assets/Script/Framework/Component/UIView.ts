
import { _decorator, Component, Node, Enum, AssetManager, Asset, resources } from 'cc';
import { App } from '../Core/App';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIBase
 * DateTime = Sun Oct 03 2021 16:52:15 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = UIBase.ts
 * FileBasenameNoExtension = UIBase
 * URL = db://assets/Script/Framework/Component/UIBase.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
 export enum FormType
 {
     Normal,
     Fixed,
     Window,
     HUD,
     Warning,
     Loading
 }
  

/**
 * 挂在界面上的组件
 */
@ccclass('UIView')
export class UIView extends Component
{
   
    @property({type:Enum(FormType)})
    public formType:FormType = FormType.Normal

    public SetActive(state)
    {
        this.node.active = state;
    }

    public ReMove()
    {
        this.node.destroy();
        resources.releaseUnusedAssets();
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
