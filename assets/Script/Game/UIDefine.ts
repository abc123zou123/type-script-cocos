import { UIView } from "../Framework/Component/UIView";
import { CtrlBase } from "../Framework/Core/CtrlBase";
import { LoginView } from "./UI/Login/LoginView";
import { LoginCtrl } from "./UI/Login/LoginCtrl";
import { HomeCtrl } from "./UI/Home/HomeCtrl";


interface CtrlConfig 
{
    ctrl:CtrlBase;
    path:string;
}


const CtrlName =
{
    Login:"Login",
    Home:"Home"
}

export class UIConfig 
{
    static configs:Record<string,CtrlConfig> = {};
    
    static Init()
    {
        UIConfig.configs[CtrlName.Login] = {ctrl:new LoginCtrl() ,path:"UILogin"}
        UIConfig.configs[CtrlName.Home] = {ctrl:new HomeCtrl() ,path:"UIHome"}
    }


}

export default CtrlName;