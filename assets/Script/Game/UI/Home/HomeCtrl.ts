import { _decorator, Node, __private, Game, Prefab, find } from 'cc';
import { ECSImpl } from '../../../3rd/ECS/impl/ECSImpl';
import { App } from '../../../Framework/Core/App';
import { CtrlBase } from '../../../Framework/Core/CtrlBase';
import NodeHelper from '../../../Framework/Util/NodeHelper';
import Util from '../../../Framework/Util/Util';
import { MovableSystem } from '../../ECSLogic/systems/MovableSystem';
import { NPCFactorySystem } from '../../ECSLogic/systems/NPCFactorySystem';
import CtrlName from '../../UIDefine';
import { HomeView } from './HomeView';


/**
 * 登录页面控制器
 */
export class HomeCtrl extends CtrlBase   
{

    public view:HomeView

    // private ecs = createECSEnv();

    private ecs = new ECSImpl()

    public  OnAwake(arg:any)
    {
        Util.Log("HomeCtrl OnAwake");
    }

    public  OnCreate()
    {
        this.view.backBtn.on(Node.EventType.TOUCH_START,this.testBack,this)
        this.view.starClick.on(Node.EventType.TOUCH_START,this.testStart,this)
    }
    testStart()
    {
        App.Instance.sceneMgr.LoadScene("scene",(err,scene)=>{

            if (err)
            {
                console.error(err);
                
            }

            App.Instance.poolMgr.Get("Cube",(goinst)=>
            {
                this.ecs.systems.
                    add(new MovableSystem()).
                    add(new NPCFactorySystem(NodeHelper.FindNode("root1"), goinst));
                
            });

        })

        

    }

    testBack()
    {
        App.Instance.ctrlMgr.Back(CtrlName.Login);
    }

    public OnShow()
    {
        Util.Log("OnShow");
        this.view.ShowOk()
        
    }

    public Update(deltaTime:number)
    {
        this.ecs.update(deltaTime);
    }
    
}


