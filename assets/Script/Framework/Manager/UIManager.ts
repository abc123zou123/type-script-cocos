
import { _decorator, Component, Node, find, UI } from 'cc';
import { Stack } from '../Collections/Stack';
import { App } from '../Core/App';
import { FormType, UIView } from '../Component/UIView';
import { IManager } from './IManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIManager
 * DateTime = Sun Oct 03 2021 16:49:48 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = UIManager.ts
 * FileBasenameNoExtension = UIManager
 * URL = db://assets/Script/Framework/Manager/UIManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('UIManager')
export class UIManager implements IManager {
   
    private normalNode:Node;

    // private uiStack:Stack<UIForm> = new Stack<UIForm>();

    start() 
    {
        this.normalNode = find("Canvas/Normal");
    }

    update(deltaTime: number)
    {

    }

    Show(ui:UIView)
    {
        switch(ui.formType)
        {
            case FormType.Normal:
                ui.node.setParent(this.normalNode,false);
                break;
            default:
                break;
            
        }

        
        ui.node.setParent(this.normalNode,false);

        if (ui.node.active == false)
        {
            ui.SetActive(true);
        }

        // this.uiStack.Push(ui);

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
