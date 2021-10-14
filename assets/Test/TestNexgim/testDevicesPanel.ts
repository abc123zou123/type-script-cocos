
import { _decorator, Component, Node, Button, Label, EventHandler } from 'cc';
import { ListView } from '../../Script/Framework/Component/ListView';
import { NexDelegate } from '../../Script/Game/nex-delegate';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NewComponent
 * DateTime = Wed Oct 13 2021 15:47:09 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = NewComponent.ts
 * FileBasenameNoExtension = NewComponent
 * URL = db://assets/Script/Views/NewComponent.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('testDevicesPanel')
export class testDevicesPanel extends Component {

    @property(ListView)
    listView!:ListView;
    delegateNexgim!: NexDelegate;

    

    start () {
        // [3]
        // console.log("start 1");
        
        this.delegateNexgim  = new NexDelegate();
        nexgim.nexgimService.startDiscovery(this.delegateNexgim)
        nexgim.nexgimService.register(this.delegateNexgim);
        // console.log("start 2");
        this.listView.SetCallBack((index)=>
        {
            this.OnIndexNode(index);
        }
 
        );

        this.listView.SetTotalNum(0);

        this.delegateNexgim.foundOk = (names,devices)=>
        {
            this.listView.SetTotalNum(devices.length);
        }

        setTimeout(() => {
            console.log("stopDiscovery");            
             nexgim.nexgimService.stopDiscovery();
        }, 5*1000);
    }

    OnIndexNode(index: number)
    {
        let node = this.listView.GetIndexNode(index);
        
        node!.getComponentInChildren(Label)!.string = this.delegateNexgim.devicesName[index];
        node?.off(Node.EventType.TOUCH_END); //保险起见
         node?.on(Node.EventType.TOUCH_END,()=>
         {
            console.log("start connect",this.delegateNexgim.devicesName[index],index);
            console.log("this.delegateNexgim.devices",this.delegateNexgim.dstDevices);
            console.log("this.delegateNexgim.devices[index]",this.delegateNexgim.dstDevices[index]);
            

             if (this.delegateNexgim.GetIsConnect() == false)
             {
                 this.delegateNexgim.SetIsConnecting(true);
                 nexgim.nexgimService.connect(this.delegateNexgim.dstDevices[index]);
             }

         });
    }

  

    public ActivePanel()
    {
        this.listView.node.active = !this.listView.node.active;
        
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
