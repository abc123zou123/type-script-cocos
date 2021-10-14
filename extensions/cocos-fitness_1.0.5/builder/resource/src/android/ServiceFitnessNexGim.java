package com.cocos.service;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.content.ContextCompat;

import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.cocos.service.fitness.nexgim.NexGimDevice;
import com.cocos.service.fitness.nexgim.NexGimDeviceInfo;
import com.cocos.service.fitness.nexgim.NexGimManager;
import com.cocos.service.fitness.nexgim.callback.NexGimDeviceListener;
import com.cocos.service.fitness.nexgim.callback.NexGimDiscoveryListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ServiceFitnessNexGim implements SDKWrapper.SDKInterface {

    public static Map<String, NexGimDevice> gimDeviceMap = new HashMap<>();

    public static NexGimDiscoveryListener discoveryListener = new NexGimDiscoveryListener() {
        @Override
        public void onDeviceFounding(NexGimDevice device) {
            putDevice(device);
            onNexGimListener(NexGimListenerEvent.DiscoveryDeviceFounding, "('" + device.getMac() + "')");
        }

        @Override
        public void onDevicesFound(List<NexGimDevice> devices) {
            if (devices == null)
                return;
            JSONArray array = new JSONArray();
            for (NexGimDevice device : devices) {
                putDevice(device);
                array.put(device.getMac());
            }
            onNexGimListener(NexGimListenerEvent.DiscoveryDevicesFound, "('" + array.toString() + "')");
        }
    };

    @SuppressWarnings("StringBufferReplaceableByString")
    public static NexGimDeviceListener deviceListener = new NexGimDeviceListener() {
        @Override
        public void onConnectionChanged(NexGimDevice device, int status, int errorCause) {
            StringBuilder sb = new StringBuilder("(");
            sb.append("'").append(device.getMac()).append("'").append(", ").append(status).append(", ")
                    .append(errorCause).append(")");
            onNexGimListener(NexGimListenerEvent.DeviceConnectionChanged, sb.toString());
        }

        @Override
        public void onInstantDataReceived(NexGimDevice device, float cadence, float power, float torque, float speed) {
            StringBuilder sb = new StringBuilder("(");
            sb.append("'").append(device.getMac()).append("'").append(", ").append(cadence).append(", ").append(power)
                    .append(", ").append(torque).append(", ").append(speed).append(")");
            onNexGimListener(NexGimListenerEvent.DeviceInstantDataReceived, sb.toString());
        }
    };

    @Override
    public void init(Context context) {
        NexGimManager.getInstance().init(((Activity) context).getApplication());
    }

    public static void startDiscovery() {
        System.out.println("public static void startDiscovery() {}");
        NexGimManager.getInstance().startDiscovery(discoveryListener);
    }

    public static void stopDiscovery() {
        System.out.println("public static void stopDiscovery() {}");
        // runOnUiThread(() -> {
        //
        // });
        NexGimManager.getInstance().stopDiscovery();
    }

    public static void setTorque(String deviceId, float torque) {
        NexGimDevice device = getDevice(deviceId);
        if (device == null)
            return;
        NexGimManager.getInstance().setTorque(device, torque);
    }

    public static String getDeviceInfo(String deviceId) {
        NexGimDevice device = getDevice(deviceId);
        if (device == null)
            return "{}";
        NexGimDeviceInfo info = NexGimManager.getInstance().getDeviceInfo(device);
        if (info == null)
            return "{}";
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("motorSN", info.getMotorSN());
            jsonObject.put("motorVersion", info.getMotorVersion());
            jsonObject.put("dashboardSN", info.getDashboardSN());
            jsonObject.put("dashboardVersion", info.getDashboardVersion());
        } catch (JSONException ignored) {
        }
        return jsonObject.toString();
    }

    public static void register() {
        NexGimManager.getInstance().register(deviceListener);
    }

    public static void unregister() {
        NexGimManager.getInstance().unregister();
    }

    public static void connect(String deviceId) {
        System.out.println("public static void connect(String deviceId) => " + deviceId);
        NexGimDevice device = getDevice(deviceId);
        if (device == null)
            return;
        NexGimManager.getInstance().connect(device);
    }

    public static void disconnect(String deviceId) {
        NexGimDevice device = getDevice(deviceId);
        if (device == null)
            return;
        NexGimManager.getInstance().disconnect(device);
    }

    public static boolean isConnected(String deviceId) {
        NexGimDevice device = getDevice(deviceId);
        if (device == null)
            return false;
        return NexGimManager.getInstance().isConnected(device);
    }

    public static String getName(String deviceId) {
        NexGimDevice device = getDevice(deviceId);
        return device != null ? device.getName() : "";
    }

    public static String getMac(String deviceId) {
        NexGimDevice device = getDevice(deviceId);
        return device != null ? device.getMac() : "";
    }

    private static void putDevice(NexGimDevice device) {
        if (gimDeviceMap.containsKey(device.getMac()))
            return;
        gimDeviceMap.put(device.getMac(), device);
    }

    private static NexGimDevice getDevice(String deviceId) {
        return getDevice(deviceId, null);
    }

    @SuppressWarnings("SameParameterValue")
    private static NexGimDevice getDevice(String deviceId, NexGimDevice device) {
        return gimDeviceMap.containsKey(deviceId) ? gimDeviceMap.get(deviceId) : device;
    }

    private static void runOnUiThread(final Runnable runnable) {
        SDKWrapper.shared().getActivity().runOnUiThread(runnable);
    }

    private static void runOnGameThread(final Runnable runnable) {
        CocosHelper.runOnGameThread(runnable);
    }

    private static void onNexGimListener(String event, String params) {
        executeJavaScriptCode(event + params);
    }

    private static void executeJavaScriptCode(String jsc) {
        runOnGameThread(() -> CocosJavascriptJavaBridge.evalString(jsc));
    }

    public interface NexGimListenerEvent {
        String DiscoveryDeviceFounding = "typeof nexgim !== 'undefined' && nexgim.Listener.discoveryListener.onDeviceFounding";
        String DiscoveryDevicesFound = "typeof nexgim !== 'undefined' && nexgim.Listener.discoveryListener.onDevicesFound";
        String DeviceConnectionChanged = "typeof nexgim !== 'undefined' && nexgim.Listener.deviceListener.onConnectionChanged";
        String DeviceInstantDataReceived = "typeof nexgim !== 'undefined' && nexgim.Listener.deviceListener.onInstantDataReceived";
    }

    public static void checkAndRequestAppPermission(Activity activity, String[] permissions, int reqCode) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M)
            return;
        List<String> permissionList = new ArrayList<>();
        for (String permission : permissions) {

            if (ContextCompat.checkSelfPermission(activity, permission) != PackageManager.PERMISSION_GRANTED)
                permissionList.add(permission);
        }
        if (permissionList.size() == 0)
            return;
        String[] requestPermissions = permissionList.toArray(new String[0]);
        activity.requestPermissions(requestPermissions, reqCode);
    }

    @Override
    public void onStart() {
        String[] needPermissions = { Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.BLUETOOTH_ADMIN,
                Manifest.permission.BLUETOOTH, Manifest.permission.BLUETOOTH_PRIVILEGED };
        checkAndRequestAppPermission(SDKWrapper.shared().getActivity(), needPermissions, 1000);
    }
}
