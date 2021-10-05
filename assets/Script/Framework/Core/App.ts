
import { _decorator, Component, Node, game } from 'cc';
import { SceneManager } from '../Manager/SceneManager';
import { PoolManager } from '../Manager/PoolManager';
import { ResManager } from '../Manager/ResManager';
import { UIManager } from '../Manager/UIManager';
import { CtrlManager } from '../Manager/CtrlManager';
import { IManager } from '../Manager/IManager';
import { GameRT } from '../../Game/GameRT';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Main
 * DateTime = Sun Oct 03 2021 16:45:15 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = Main.ts
 * FileBasenameNoExtension = Main
 * URL = db://assets/Script/Framework/Core/Main.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
/**
 * 应用启动的入口
 */
@ccclass('Main')
export class App extends Component 
{
    public static Instance:App;


    public sceneMgr:SceneManager = new SceneManager();
    public poolMgr:PoolManager = new PoolManager();
    public resMgr:ResManager= new ResManager();
    public uiMgr:UIManager = new UIManager();
    public ctrlMgr:CtrlManager = new CtrlManager();

    onLoad(){
        App.Instance = this;
        game.addPersistRootNode(this.node);
    }

    start () {
        this.sceneMgr.start();
        this.poolMgr.start();
        this.resMgr.start();
        this.uiMgr.start();
        this.ctrlMgr.start();

        //游戏逻辑启动
        GameRT.StartUp();

    }


    update(deltaTime:number){
        this.sceneMgr.update(deltaTime);
        this.poolMgr.update(deltaTime);
        this.resMgr.update(deltaTime);
        // this.uiMgr.update(deltaTime);
        this.ctrlMgr.update(deltaTime);
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
