declare namespace nexgim {
    namespace JSB {
        function fullClassName(sampleClassName: string): string;
        function callNativeMethod(className: string, methodName: string, ...parameters: any): any;
        function isAndroid(): boolean;
        function isIOS(): boolean;
    }
    namespace Listener {
        const deviceListener: {
            listeners: NexGimDeviceListener[];
            setListener(listener: NexGimDeviceListener | null): void;
            onConnectionChanged(deviceId: string, status: number, errorCode: number): void;
            onInstantDataReceived(deviceId: string, cadence: number, power: number, torque: number, speed: number): void;
        };
        const discoveryListener: {
            listener: NexGimDiscoveryListener | null;
            listeners: NexGimDiscoveryListener[];
            setListener(listener: NexGimDiscoveryListener | null): void;
            onDeviceFounding(deviceId: string): void;
            onDevicesFound(deviceIds: string): void;
        };
    }
    class NexGimDevice {
        deviceId: string;
        className: string;
        constructor(deviceId: string);
        getName(): Promise<string>;
        getMac(): Promise<string>;
    }
    /**
     * 设备监听器
     */
    interface NexGimDeviceListener {
        /**
         * 当设备连接发生改变时触发
         */
        onConnectionChanged?: (device: NexGimDevice, status: number, errorCode: number) => void;
        /**
         * 接收到设备停止的 indoor bike data 时触发
         */
        onInstantDataReceived?: (device: NexGimDevice, cadence: number, power: number, torque: number, speed: number) => void;
    }
    /**
     * 扫描结果监听器
     */
    interface NexGimDiscoveryListener {
        /**
         * 每扫描到一个设备都会触发
         */
        onDeviceFounding?: (device: NexGimDevice) => void;
        /**
         * 当停止扫描设备或者扫描时间已到触发，返回所有已经扫描到的设备
         */
        onDevicesFound?: (devices: NexGimDevice[]) => void;
    }
    class NexGimDeviceInfo {
        motorSN: string | undefined;
        motorVersion: string | undefined;
        dashboardSN: string | undefined;
        dashboardVersion: string | undefined;
        constructor(motorSN: string, motorVersion: string, dashboardSN: string, dashboardVersion: string);
        getMotorSN(): string | undefined;
        getMotorVersion(): string | undefined;
        getDashboardSN(): string | undefined;
        getDashboardVersion(): string | undefined;
    }
    class NexGim {
        className: string;
        constructor();
        /**
         * 开始扫描设备
         * @param listener 扫描结果监听器
         */
        startDiscovery(listener: NexGimDiscoveryListener): void;
        /**
         * 停止扫描设备
         */
        stopDiscovery(): void;
        /**
         * 设置设备阻力
         * @param device 要设置的设备
         * @param torque 设置的阻力值（0.5 ~ 40, 小数位仅 5 生效）
         */
        setTorque(device: NexGimDevice, torque: number): void;
        /**
         * 获取设备信息
         * @param device 要获取的设备
         * @returns 设备信息
         */
        getDeviceInfo(device: NexGimDevice): Promise<NexGimDeviceInfo | null>;
        /**
         * 注册设备监听器
         * @param listener 设备监听器
         */
        register(listener: NexGimDeviceListener): void;
        /**
         * 注销设备监听器
         */
        unregister(): void;
        /**
         * 连接设备
         * @param device 要连接的设备
         */
        connect(device: NexGimDevice): void;
        /**
         * 断开设备连接
         * @param device 要断开的设备
         */
        disconnect(device: NexGimDevice): void;
        /**
         * 判断设备是否已经链接
         * @param device
         * @returns 设备是否连接
         */
        isConnected(device: NexGimDevice): Promise<boolean>;
    }
    const support: boolean;
    const nexgimService: NexGim;
}
