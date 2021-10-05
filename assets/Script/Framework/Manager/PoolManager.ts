
import { _decorator, Component, Node, Pool, NodePool } from 'cc';
import { Dictionary } from '../Collections/Dictionary';
import { GoInst } from '../Component/GoInst';
import { App } from '../Core/App';
import { IManager } from './IManager';
const { ccclass, property } = _decorator;
/**
 * Predefined variables
 * Name = PoolManager
 * DateTime = Sun Oct 03 2021 16:48:56 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = PoolManager.ts
 * FileBasenameNoExtension = PoolManager
 * URL = db://assets/Script/Framework/Manager/PoolManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('PoolManager')
export class PoolManager implements IManager
{

    private poolDir:Dictionary<string,NodePool> = new Dictionary<string,NodePool>();

    start() 
    {

    }
    update(deltaTime: number) 
    {
     
    }

    /**
     * 从指定对象池获取节点 
     * @param poolName 
     * @param callback 
     */
    public Get(poolName:string,callback:(goinst:GoInst)=>void)
    {
    //    var  =  new NodePool()
        if (this.poolDir.ContainsKey(poolName) == false)
        {
            this.poolDir.Add(poolName,new NodePool());
        }
        let pool = this.poolDir.TryGetValue(poolName)

        if (pool.size() > 0)
        {
            
             let goInst = pool.get().getComponent(GoInst);
             callback(goInst);
        }
        else
        {
            let path = "Prefab/Goinst/" + poolName
            App.Instance.resMgr.loadPrefab(path,(node)=>
            {
                let goInst = node.getComponent(GoInst);
                callback(goInst);
            });
        }

    }

    /**
     * 释放节点回到对象池
     * @param goInst 
     */
    public Put(goInst:GoInst)
    {
        let poolName:string =  goInst.poolName 

        if (this.poolDir.ContainsKey(poolName) == false)
        {
            this.poolDir.Add(poolName,new NodePool());
        }

        let pool = this.poolDir.TryGetValue(poolName)
        pool.put(goInst.node);
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
