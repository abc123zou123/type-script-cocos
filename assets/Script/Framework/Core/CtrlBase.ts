import { _decorator, Component, Node } from 'cc';
import { UIView } from '../Component/UIView';

/**
 * 控制器基类型
 */
export class CtrlBase   
{
   
    public view:UIView;

    /**
     * 控制器激活的函数，如果是出栈的控制器会被重新激活     
     */
    public OnAwake(args:any=null)
    {
        Util.Log("待实现 OnAwake",typeof this);
    }

    /**
     * UI创建结束后的回调
     */
    public OnCreate()
    {
        Util.Log("待实现 OnCreate");
    }

    /**
     * 每次跳转成功会调用的显示函数
     */
    public OnShow()
    {
        Util.Log("待实现 OnShow");
        
    }

    public OnReMove()
    {
        Util.Log("待实现 OnReMove ",typeof this);
    }


    public Update(deltaTime:number)
    {
        
    }

    

}

