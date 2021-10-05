
import { _decorator, Component, Node, UI, loader, assetManager, resources, director, instantiate, Prefab } from 'cc';
import Util from '../Util/Util';
import { IManager } from './IManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ResManager
 * DateTime = Sun Oct 03 2021 16:48:01 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = ResManager.ts
 * FileBasenameNoExtension = ResManager
 * URL = db://assets/Script/Framework/Manager/ResManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('ResManager')
export class ResManager implements IManager  
{

    public loadPrefab(path:string,loadCall: (go:Node) => void) 
    {
        // assetManager.(path,(error,asset)=>
        // {

        // })

        // assetManager.loadBundle()

        resources.load<Prefab>(path,(error,aseet)=>
        {
            Util.Log("res load :",path);
            
            if (error && error.message)
            {
                console.error("loadPrefab",error.message)   
                return;
            }
            var prefab = aseet as Prefab;
            var newNode = instantiate(prefab);
            director.getScene().addChild(newNode);
            loadCall(newNode);

        })
    }

    

    start() 
    {

    }

    update(deltaTime: number) 
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
