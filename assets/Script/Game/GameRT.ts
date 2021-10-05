import { _decorator, Component, Node, CCClass } from 'cc';
import { App } from '../Framework/Core/App';
import { CtrlManager } from '../Framework/Manager/CtrlManager';
import { UIConfig } from './UIDefine';
const { ccclass, property } = _decorator;


export class GameRT
{
    public static StartUp()
    {
        UIConfig.Init();

        
        App.Instance.ctrlMgr.StartPage()
    }
} 