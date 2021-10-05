
import { _decorator, Component, Node, __private } from 'cc';
import { UIView } from '../../../Framework/Component/UIView';
import Util from '../../../Framework/Util/Util';
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
 


/**
 * 登录页面视图层
 */
@ccclass('HomeView')
export class HomeView extends UIView 
{
    @property(Node)
    public starClick:Node;

    @property(Node)
    public backBtn:Node

    ShowOk()
    {
        Util.Log("ShowOk");
        
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
