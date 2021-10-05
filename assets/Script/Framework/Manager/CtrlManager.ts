
import { _decorator, Component, Node, Rect, path, debug, assert } from 'cc';
import CtrlName, { UIConfig } from '../../Game/UIDefine';
import { Stack } from '../Collections/Stack';
import { App } from '../Core/App';
import { CtrlBase } from '../Core/CtrlBase';
import { UIView } from '../Component/UIView';
import { IManager } from './IManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CtrlManager
 * DateTime = Sun Oct 03 2021 16:50:37 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = CtrlManager.ts
 * FileBasenameNoExtension = CtrlManager
 * URL = db://assets/Script/Framework/Manager/CtrlManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

 
/**
 * 界面跳转功能
 */
@ccclass('CtrlManager')
export class CtrlManager implements IManager 
{
    
    ctrlStack:Stack<CtrlBase> = new Stack<CtrlBase>();

    // ctrlNameWithPopWindows:Record<string,List<CtrlBase>>;


    private getCurrentCtrl()
    {
        return this.ctrlStack.Peek();
    }

    private pushStack(ctrl:CtrlBase)
    {
        this.ctrlStack.Push(ctrl);
    }

    private popStack():CtrlBase
    {
        return this.ctrlStack.Pop();
    }


    


    /**
     * 初始化
     */
    public start() 
    {
    
    }


    /**
     * 启动控制界面
     */
    public StartPage() 
    {        
        this.JumpTo(CtrlName.Login);     
    }


    /**
     * 控制器跳转
     * @param ctrl 指定控制器
     * @param args 
     */
    public  JumpTo(ctrlName:string,args:any = null)
    {
        var dstConfig = UIConfig.configs[ctrlName];
        
        var lastCtrl = this.getCurrentCtrl();
        if (this.getCurrentCtrl() != null)
        {
            lastCtrl.view.SetActive(false);
        }

        dstConfig.ctrl.OnAwake(args);
        this.pushStack(dstConfig.ctrl)
        
        if (dstConfig.ctrl.view == null)
        {

            let fullPath = "Prefab/UIForm/" + dstConfig.path;
            App.Instance.resMgr.loadPrefab(fullPath,(node)=>
            {                
                dstConfig.ctrl.view = node.getComponent(UIView);
                App.Instance.uiMgr.Show(dstConfig.ctrl.view);
                dstConfig.ctrl.OnCreate();
                dstConfig.ctrl.OnShow();
            });

        }
        else
        {
            dstConfig.ctrl.OnShow();
        }
        
    }

    /**
     * 回到上一个界面
     * @param ctrlName 
     * @param args 
     */
    public Back(ctrlName:string,args:any = null)
    {
        var lastCtrl = this.popStack();
        lastCtrl.OnReMove();
        lastCtrl.view.ReMove();
        var currentCtrl = this.getCurrentCtrl();
        currentCtrl.view.SetActive(true);
        currentCtrl.OnShow();
    }

    update(deltaTime: number) 
    {
        var arrys = this.ctrlStack.GetArray();
        arrys.forEach(element => {
            element.Update(deltaTime);
        });
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
