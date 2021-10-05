
import { _decorator, Component, Node, director, SceneAsset, Scene } from 'cc';
import { IManager } from './IManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SceneManager
 * DateTime = Sun Oct 03 2021 16:50:13 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = SceneManager.ts
 * FileBasenameNoExtension = SceneManager
 * URL = db://assets/Script/Framework/Manager/SceneManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('SceneManager')
export class SceneManager implements IManager  
{

    start() 
    {

    }

    update(deltaTime: number) 
    {
     
    }

    public PreloadScene(sname:string,callback:()=>{})
    {
        director.preloadScene(sname,callback)
    }

    public LoadScene(sname:string,callback:(err:Error,scene:Scene)=>void)
    {
        director.loadScene(sname,callback)
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
