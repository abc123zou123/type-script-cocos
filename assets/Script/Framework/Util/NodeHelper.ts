import { find, Node, Vec3, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class NodeHelper {

    /**
     *  从场景上查找节点
     */
    public static FindNode(name:string)
    {
        let rt = find(name);
        if (rt == null)
        {
            console.warn("FindNode node null",name);            
            return null;
        }
        return rt;

    }

    public static SetPosition(node:Node,pos:Vec3)
    {
        node.position = pos;
    }

    public static NodeActive(node:Node,state:boolean)
    {
        node.active = state;
    }


    public static SetParent(node:Node,parent:Node,stayWorldPos:boolean = false)
    {
        node.setParent(parent,stayWorldPos);
    }
}