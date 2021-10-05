import { _decorator, Node, __private } from 'cc';
import { App } from '../../../Framework/Core/App';
import { CtrlBase } from '../../../Framework/Core/CtrlBase';
import Util from '../../../Framework/Util/Util';
import CtrlName from '../../UIDefine';
import { LoginView } from './LoginView';

/**
 * 登录页面控制器
 */
export class LoginCtrl extends CtrlBase   
{

    public view:LoginView

    public  OnAwake(args:any)
    {
        Util.Log("LoginCtrl OnAwake");
    }

    public  OnCreate()
    {
        this.view.loginBtn.on(Node.EventType.TOUCH_START,this.testClick,this)
    }

    testClick()
    {
        App.Instance.ctrlMgr.JumpTo(CtrlName.Home);
    }

    public OnShow()
    {
        Util.Log("OnShow");
        this.view.ShowOk()
        
    }
    
}

