
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NexDelegate
 * DateTime = Wed Oct 13 2021 16:14:59 GMT+0800 (中国标准时间)
 * Author = abc123zou123
 * FileBasename = nex-delegate.ts
 * FileBasenameNoExtension = nex-delegate
 * URL = db://assets/Script/nex-delegate.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('NexDelegate')
export class NexDelegate  implements nexgim.NexGimDiscoveryListener , nexgim.NexGimDeviceListener  {

    foundOk!:(devicesName:Array<string>,devices:nexgim.NexGimDevice[])=>void;
    devicesName:Array<string> = new Array<string>();
    dstDevices:Array<nexgim.NexGimDevice> = new Array<nexgim.NexGimDevice>();

    private isConnecting:boolean = false;


    public SetIsConnecting(state:boolean)
    {
        this.isConnecting = state;
    }

    public GetIsConnect()
    {
        return this.isConnecting;
    }
    
    public static Speed:number = 0;




    async onDeviceFounding (device: nexgim.NexGimDevice)
    {   
        // console.log("onDeviceFounding");
        var name = await device.getName();
        console.log("AWait ok onDeviceFounding",name);

        if (name == '')
        {
            return;
        }
        console.log("name="+name+";");
        

         this.devicesName.push(name)
         this.dstDevices.push(device);
        // this.listView.SetTotalNum(this.devices.length);
    }
    /**
     * 当停止扫描设备或者扫描时间已到触发，返回所有已经扫描到的设备
     */
    onDevicesFound (devices: nexgim.NexGimDevice[])
    {
        console.log("onDevicesFound",this.dstDevices, this.dstDevices.length);
        
        // this.dstDevices = devices;
        this.foundOk(this.devicesName,this.dstDevices);
    } 

    onConnectionChanged(device: nexgim.NexGimDevice, status: number, errorCode: number) {
        console.log("onConnectionChanged");
        this.SetIsConnecting(false);
        if (status == 1) {
            console.log("连接成功");
            
            // 连接成功
        } else {
            console.log("连接失败");
        }
     }
   

    onInstantDataReceived(device: nexgim.NexGimDevice,cadence: number, power: number, torque: number, speed: number)
    {
        console.log("device",device,"cadence",cadence,"power",power,"torque",torque,"speed",speed);
        NexDelegate.Speed = speed;
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
