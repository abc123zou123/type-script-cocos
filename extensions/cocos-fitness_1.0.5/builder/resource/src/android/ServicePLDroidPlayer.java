package com.cocos.service;

import android.content.Context;
import android.graphics.PixelFormat;
import android.util.Log;
import android.view.SurfaceView;
import android.widget.FrameLayout;

import com.cocos.lib.CocosActivity;
import com.cocos.lib.CocosHelper;
import com.cocos.lib.CocosJavascriptJavaBridge;
import com.pili.pldroid.player.AVOptions;
import com.pili.pldroid.player.PlayerState;
import com.pili.pldroid.player.widget.PLVideoView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

@SuppressWarnings("unused")
public class ServicePLDroidPlayer implements SDKWrapper.SDKInterface {
    private static final String TAG = "ServicePLDroidPlayer";
    private static final char[] HEX_CHAR = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E',
            'F' };

    private static WeakReference<CocosActivity> activityWeakRef = null;
    private static FrameLayout.LayoutParams layoutParams = null;
    private static WeakReference<PLVideoView> plVideoViewWeakRef = null;
    private static boolean enableLog = false;
    private static String videoPath = "";
    private static float playSpeed = 1f;
    private static boolean isPlayingSeekTo = false;
    private static final int delayMS = 150;
    private static boolean isRestart = false;

    private static final Map<PlayerState, Integer> playerStateMap = new HashMap<>();

    static {
        playerStateMap.put(PlayerState.IDLE, 0);
        playerStateMap.put(PlayerState.PREPARING, 1);
        playerStateMap.put(PlayerState.PREPARED, 2);
        playerStateMap.put(PlayerState.PLAYING, 3);
        playerStateMap.put(PlayerState.BUFFERING, 4);
        playerStateMap.put(PlayerState.PAUSED, 5);
        playerStateMap.put(PlayerState.COMPLETED, 6);
        playerStateMap.put(PlayerState.ERROR, 7);
        playerStateMap.put(PlayerState.RECONNECTING, 8);
        playerStateMap.put(PlayerState.PLAYING_CACHE, 9);
        playerStateMap.put(PlayerState.DESTROYED, 10);
    }

    @Override
    public void init(Context context) {
        // 设置 Cocos SurfaceView
        SurfaceView cocosSurfaceView = ((CocosActivity) context).getSurfaceView();
        ((FrameLayout) cocosSurfaceView.getParent()).bringChildToFront(cocosSurfaceView);
        cocosSurfaceView.setZOrderOnTop(true);
        cocosSurfaceView.setZOrderMediaOverlay(true);
        cocosSurfaceView.getHolder().setFormat(PixelFormat.TRANSPARENT);
        cocosSurfaceView.setZOrderOnTop(true);
        cocosSurfaceView.setZOrderMediaOverlay(true);
        layoutParams = (FrameLayout.LayoutParams) cocosSurfaceView.getLayoutParams();
        activityWeakRef = new WeakReference<>((CocosActivity) context);
        System.out.println("Current Thread : " + Thread.currentThread().getName());
    }

    public static void enableLog(boolean enable) {
        enableLog = enable;
    }

    public static void createPLMediaPlayer(String options) {
        Log("ServicePLDroidPlayer.createPLMediaPlayer invoke! Params: " + options);
        System.out.println("Current Thread : " + Thread.currentThread().getName());
        runOnUiThreadWithWait(() -> {
            if (plVideoViewWeakRef == null) {
                PLVideoView plVideoView = new PLVideoView(activityWeakRef.get());
                plVideoViewWeakRef = new WeakReference<>(plVideoView);
                if (!"{}".equals(options))
                    plVideoViewWeakRef.get().setAVOptions(parseAVOptions(options));
                activityWeakRef.get().addContentView(plVideoViewWeakRef.get(), layoutParams);
                // 设置监听器
                plVideoViewWeakRef.get().setOnPreparedListener(ServicePLDroidPlayer::onPrepared);
                plVideoViewWeakRef.get().setOnInfoListener(ServicePLDroidPlayer::onInfo);
                plVideoViewWeakRef.get().setOnVideoSizeChangedListener(ServicePLDroidPlayer::onVideoSizeChanged);
                plVideoViewWeakRef.get().setOnCompletionListener(ServicePLDroidPlayer::onCompletion);
                plVideoViewWeakRef.get().setOnSeekCompleteListener(ServicePLDroidPlayer::onSeekComplete);
                plVideoViewWeakRef.get().setOnImageCapturedListener(ServicePLDroidPlayer::onImageCaptured);
                plVideoViewWeakRef.get().setOnErrorListener(ServicePLDroidPlayer::onError);
                plVideoViewWeakRef.get().setOnBufferingUpdateListener(ServicePLDroidPlayer::onBufferingUpdate);
            }
        });
    }

    public static void release() {
        // todo:
    }

    public static int getPlayerState() {
        Log("ServicePLDroidPlayer.getPlayerState invoke!");
        if (checkPLVideoView()) {
            AtomicInteger atomicInteger = new AtomicInteger();
            runOnUiThreadWithWait(() -> {
                // noinspection ConstantConditions
                atomicInteger.set(playerStateMap.get(plVideoViewWeakRef.get().getPlayerState()));
            });
            return atomicInteger.get();
        }
        return 10;
    }

    public static String getMetadata() {
        Log("ServicePLDroidPlayer.getMetadata invoke!");
        if (checkPLVideoView()) {
            AtomicReference<String> atomicString = new AtomicReference<>();
            runOnUiThreadWithWait(() -> atomicString.set(stringMapToJson(plVideoViewWeakRef.get().getMetadata())));
            return atomicString.get();
        }
        return "{}";
    }

    public static void setAVOptions(String options) {
        Log("ServicePLDroidPlayer.setAVOptions invoke! Params: " + options);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setAVOptions(parseAVOptions(options)));
        }
    }

    public static long getRtmpAudioTimestamp() {
        Log("ServicePLDroidPlayer.getRtmpAudioTimestamp invoke!");
        if (checkPLVideoView()) {
            AtomicLong atomicLong = new AtomicLong();
            runOnUiThreadWithWait(() -> atomicLong.set(plVideoViewWeakRef.get().getRtmpAudioTimestamp()));
            return atomicLong.get();
        }
        return -1L;
    }

    public static void setDisplayAspectRatio(int ratio) {
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setDisplayAspectRatio(ratio));
        }
    }

    public static long getRtmpVideoTimestamp() {
        Log("ServicePLDroidPlayer.getRtmpVideoTimestamp invoke!");
        if (checkPLVideoView()) {
            AtomicLong atomicLong = new AtomicLong();
            runOnUiThreadWithWait(() -> atomicLong.set(plVideoViewWeakRef.get().getRtmpVideoTimestamp()));
            return atomicLong.get();
        }
        return -1L;
    }

    public static void setWakeMode(int mode) {
        Log("ServicePLDroidPlayer.setWakeMode invoke! Params: " + mode);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setWakeMode(SDKWrapper.shared().getActivity(), mode));
        }
    }

    public static void setVideoArea(int topLeftX, int topLeftY, int bottomRightX, int bottomRightY) {
        Log("ServicePLDroidPlayer.setVideoArea invoke! Params: " + topLeftX + ", " + topLeftY + ", " + bottomRightX
                + ", " + bottomRightY);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setVideoArea(topLeftX, topLeftY, bottomRightX, bottomRightY));
        }
    }

    public static void setScreenOnWhilePlaying(boolean screenOn) {
        Log("ServicePLDroidPlayer.setScreenOnWhilePlaying invoke! Params: " + screenOn);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setScreenOnWhilePlaying(screenOn));
        }
    }

    public static void setVideoPath(String path, String headers) {
        Log("ServicePLDroidPlayer.setVideoPath invoke! Params: " + path + ", " + headers);
        if (checkPLVideoView()) {
            runOnUiThread(() -> {
                if ("{}".equals(headers)) {
                    plVideoViewWeakRef.get().setVideoPath(path);
                } else {
                    // noinspection unchecked
                    plVideoViewWeakRef.get().setVideoPath(path, (Map<String, String>) jsonToMap(headers));
                }
                videoPath = path;
                plVideoViewWeakRef.get().setBufferingEnabled(true);
            });
        }
    }

    public static String getVideoPath() {
        Log("ServicePLDroidPlayer.getVideoPath invoke!");
        return videoPath;
    }

    public static void prepareAsync() {
        // todo
    }

    public static boolean setPlaySpeed(float speed) {
        Log("ServicePLDroidPlayer.setPlaySpeed invoke! Params: " + speed);
        if (speed < 0.1f || speed > 32) {
            Log.d(TAG, "The play speed is out of range, the effective value is [0.1, 32]");
            return false;
        }
        if (checkPLVideoView()) {
            AtomicBoolean atomicBoolean = new AtomicBoolean();
            runOnUiThreadWithWait(() -> atomicBoolean.set(plVideoViewWeakRef.get().setPlaySpeed(speed)));
            // 设备倍速成功，同步缓存的倍数
            if (atomicBoolean.get())
                playSpeed = speed;
            return atomicBoolean.get();
        }
        return false;
    }

    public static float getPlaySpeed() {
        Log("ServicePLDroidPlayer.getPlaySpeed invoke!");
        return playSpeed;
    }

    public static void setVolume(float leftVolume, float rightVolume) {
        Log("ServicePLDroidPlayer.setVolume invoke! Params: " + leftVolume + ", " + rightVolume);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setVolume(leftVolume, rightVolume));
        }
    }

    public static void addCache(String url) {
        Log("ServicePLDroidPlayer.addCache invoke! Params: " + url);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().addCache(url));
        }
    }

    public static void delCache(String url) {
        Log("ServicePLDroidPlayer.delCache invoke! Params: " + url);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().delCache(url));
        }
    }

    public static void addIOCache(String url) {
        Log("ServicePLDroidPlayer.addIOCache invoke! Params: " + url);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().addIOCache(url));
        }
    }

    public static void delIOCache(String url) {
        Log("ServicePLDroidPlayer.delIOCache invoke! Params: " + url);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().delIOCache(url));
        }
    }

    public static void setIOCacheSize(long size) {
        Log("ServicePLDroidPlayer.setIOCacheSize invoke! Params: " + size);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setIOCacheSize(size));
        }
    }

    public static void restart() {
        Log("ServicePLDroidPlayer.restart invoke!");
        isRestart = true;
        setVideoPath(videoPath, "{}");
    }

    public static void start() {
        Log("ServicePLDroidPlayer.start invoke!");
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().start());
        }
    }

    public static void pause() {
        Log("ServicePLDroidPlayer.pause invoke!");
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().pause());
        }
    }

    public static void stopPlayback() {
        Log("ServicePLDroidPlayer.stopPlayback invoke!");
        if (checkPLVideoView()) {
            runOnUiThreadWithWait(() -> plVideoViewWeakRef.get().stopPlayback());
            plVideoViewWeakRef = null;
        }
    }

    public static void seekTo(long msec) {
        Log("ServicePLDroidPlayer.seekTo invoke! Params: " + msec);
        if (checkPLVideoView()) {
            runOnUiThread(() -> {
                if (!plVideoViewWeakRef.get().isPlaying()) {
                    plVideoViewWeakRef.get().start();
                    isPlayingSeekTo = false;
                }
                delayExecute(() -> plVideoViewWeakRef.get().seekTo(msec), delayMS);
            });
        }
    }

    public static int getVideoWidth() {
        // todo
        return 0;
    }

    public static int getVideoHeight() {
        // todo
        return 0;
    }

    public static long getVideoBitrate() {
        Log("ServicePLDroidPlayer.getVideoBitrate invoke!");
        if (checkPLVideoView()) {
            AtomicLong atomicLong = new AtomicLong();
            runOnUiThreadWithWait(() -> atomicLong.set(plVideoViewWeakRef.get().getVideoBitrate()));
            return atomicLong.get();
        }
        return 0;
    }

    public static int getVideoFps() {
        Log("ServicePLDroidPlayer.getVideoFps invoke!");
        if (checkPLVideoView()) {
            AtomicInteger atomicInteger = new AtomicInteger();
            runOnUiThreadWithWait(() -> atomicInteger.set(plVideoViewWeakRef.get().getVideoFps()));
            return atomicInteger.get();
        }
        return 0;
    }

    public static int getAudioSampleRate() {
        // todo
        return 0;
    }

    public static int getAudioChannels() {
        // todo
        return 0;
    }

    public static int getAudioBitrate() {
        // todo
        return 0;
    }

    public static int getAudioFps() {
        // todo
        return 0;
    }

    public static boolean isPlaying() {
        Log("ServicePLDroidPlayer.isPlaying invoke!");
        if (checkPLVideoView()) {
            AtomicBoolean atomicBoolean = new AtomicBoolean();
            runOnUiThreadWithWait(() -> atomicBoolean.set(plVideoViewWeakRef.get().isPlaying()));
            return atomicBoolean.get();
        }
        return false;
    }

    public static long getCurrentPosition() {
        Log("ServicePLDroidPlayer.getCurrentPosition invoke!");
        if (checkPLVideoView()) {
            AtomicLong atomicLong = new AtomicLong();
            runOnUiThreadWithWait(() -> atomicLong.set(plVideoViewWeakRef.get().getCurrentPosition()));
            return atomicLong.get();
        }
        return 0;
    }

    public static long getDuration() {
        Log("ServicePLDroidPlayer.getDuration invoke!");
        if (checkPLVideoView()) {
            AtomicLong atomicLong = new AtomicLong();
            runOnUiThreadWithWait(() -> atomicLong.set(plVideoViewWeakRef.get().getDuration()));
            return atomicLong.get();
        }
        return 0;
    }

    public static void setLooping(boolean looping) {
        Log("ServicePLDroidPlayer.setLooping invoke!, Params: " + looping);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setLooping(looping));
        }
    }

    public static boolean isLooping() {
        Log("ServicePLDroidPlayer.isLooping invoke!");
        if (checkPLVideoView()) {
            AtomicBoolean atomicBoolean = new AtomicBoolean();
            runOnUiThreadWithWait(() -> atomicBoolean.set(plVideoViewWeakRef.get().isLooping()));
            return atomicBoolean.get();
        }
        return false;
    }

    public static void captureImage(long delayTimeMs) {
        Log("ServicePLDroidPlayer.captureImage invoke!, Params: " + delayTimeMs);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().captureImage(delayTimeMs));
        }
    }

    public static void setVideoEnabled(boolean enabled) {
        Log("ServicePLDroidPlayer.setVideoEnabled invoke!, Params: " + enabled);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setVideoEnabled(enabled));
        }
    }

    public static void setBufferingEnabled(boolean enabled) {
        Log("ServicePLDroidPlayer.setBufferingEnabled invoke!, Params: " + enabled);
        if (checkPLVideoView()) {
            runOnUiThread(() -> plVideoViewWeakRef.get().setBufferingEnabled(enabled));
        }
    }

    public static String getHttpBufferSize() {
        Log("ServicePLDroidPlayer.getHttpBufferSize invoke!");
        if (checkPLVideoView()) {
            AtomicReference<String> atomicString = new AtomicReference<>();
            runOnUiThreadWithWait(() -> atomicString.set(plVideoViewWeakRef.get().getHttpBufferSize().toString(16)));
            return atomicString.get();
        }
        return "00";
    }

    public static String getResponseInfo() {
        Log("ServicePLDroidPlayer.getResponseInfo invoke!");
        if (checkPLVideoView()) {
            AtomicReference<String> atomicString = new AtomicReference<>();
            runOnUiThreadWithWait(() -> atomicString.set(plVideoViewWeakRef.get().getResponseInfo()));
            return atomicString.get();
        }
        return "{}";
    }

    private static String objectMapToJson(Map<String, Object> map) {
        if (map == null)
            return "{}";
        return new JSONObject(map).toString();
    }

    private static String stringMapToJson(Map<String, String> map) {
        if (map == null)
            return "{}";
        return new JSONObject(map).toString();
    }

    private static Object jsonToMap(String json) {
        json = json.trim();
        Map<String, Object> map = new HashMap<>();
        List<Object> list = new LinkedList<>();
        try {
            if (json.charAt(0) == '{') {
                JSONObject jsonObject = new JSONObject(json);
                Iterator<String> iterator = jsonObject.keys();
                while (iterator.hasNext()) {
                    String key = (String) iterator.next();
                    Object value = jsonObject.get(key);
                    map.put(key,
                            (value instanceof JSONArray || value instanceof JSONObject) ? jsonToMap(value.toString())
                                    : value.toString());
                }
                return map;
            } else if (json.charAt(0) == '[') {
                JSONArray jsonArray = new JSONArray(json);
                for (int i = 0; i < jsonArray.length(); i++) {
                    Object value = jsonArray.get(i);
                    list.add((value instanceof JSONArray || value instanceof JSONObject) ? jsonToMap(value.toString())
                            : value.toString());
                }
                return list;
            }
        } catch (JSONException ignore) {
        }
        return map;
    }

    private static AVOptions parseAVOptions(String options) {
        AVOptions avOptions = new AVOptions();
        try {
            JSONObject jsonObject = new JSONObject(options);
            if (jsonObject.has(AVOptions.KEY_MEDIACODEC)) {
                avOptions.setInteger(AVOptions.KEY_MEDIACODEC, jsonObject.getInt(AVOptions.KEY_MEDIACODEC));
            }
            if (jsonObject.has(AVOptions.KEY_PREFER_FORMAT)) {
                avOptions.setInteger(AVOptions.KEY_PREFER_FORMAT, jsonObject.getInt(AVOptions.KEY_PREFER_FORMAT));
            }
            if (jsonObject.has(AVOptions.KEY_PREPARE_TIMEOUT)) {
                avOptions.setInteger(AVOptions.KEY_PREPARE_TIMEOUT, jsonObject.getInt(AVOptions.KEY_PREPARE_TIMEOUT));
            }
            if (jsonObject.has(AVOptions.KEY_LIVE_STREAMING)) {
                avOptions.setInteger(AVOptions.KEY_LIVE_STREAMING, jsonObject.getInt(AVOptions.KEY_LIVE_STREAMING));
            }
            if (jsonObject.has(AVOptions.KEY_CACHE_BUFFER_DURATION)) {
                avOptions.setInteger(AVOptions.KEY_CACHE_BUFFER_DURATION,
                        jsonObject.getInt(AVOptions.KEY_CACHE_BUFFER_DURATION));
            }
            if (jsonObject.has(AVOptions.KEY_MAX_CACHE_BUFFER_DURATION)) {
                avOptions.setInteger(AVOptions.KEY_MAX_CACHE_BUFFER_DURATION,
                        jsonObject.getInt(AVOptions.KEY_MAX_CACHE_BUFFER_DURATION));
            }
            if (jsonObject.has(AVOptions.KEY_CACHE_DIR)) {
                avOptions.setString(AVOptions.KEY_CACHE_DIR, jsonObject.getString(AVOptions.KEY_CACHE_DIR));
            }
            if (jsonObject.has(AVOptions.KEY_CACHE_EXT)) {
                avOptions.setString(AVOptions.KEY_CACHE_EXT, jsonObject.getString(AVOptions.KEY_CACHE_EXT));
            }
            if (jsonObject.has(AVOptions.KEY_VIDEO_DATA_CALLBACK)) {
                avOptions.setInteger(AVOptions.KEY_VIDEO_DATA_CALLBACK,
                        jsonObject.getInt(AVOptions.KEY_VIDEO_DATA_CALLBACK));
            }
            if (jsonObject.has(AVOptions.KEY_AUDIO_DATA_CALLBACK)) {
                avOptions.setInteger(AVOptions.KEY_AUDIO_DATA_CALLBACK,
                        jsonObject.getInt(AVOptions.KEY_AUDIO_DATA_CALLBACK));
            }
            if (jsonObject.has(AVOptions.KEY_VIDEO_RENDER_EXTERNAL)) {
                avOptions.setInteger(AVOptions.KEY_VIDEO_RENDER_EXTERNAL,
                        jsonObject.getInt(AVOptions.KEY_VIDEO_RENDER_EXTERNAL));
            }
            if (jsonObject.has(AVOptions.KEY_AUDIO_RENDER_EXTERNAL)) {
                avOptions.setInteger(AVOptions.KEY_AUDIO_RENDER_EXTERNAL,
                        jsonObject.getInt(AVOptions.KEY_AUDIO_RENDER_EXTERNAL));
            }
            if (jsonObject.has(AVOptions.KEY_FAST_OPEN)) {
                avOptions.setInteger(AVOptions.KEY_FAST_OPEN, jsonObject.getInt(AVOptions.KEY_FAST_OPEN));
            }
            if (jsonObject.has(AVOptions.KEY_DNS_SERVER)) {
                avOptions.setString(AVOptions.KEY_PREPARE_TIMEOUT, jsonObject.getString(AVOptions.KEY_DNS_SERVER));
            }
            if (jsonObject.has(AVOptions.KEY_DOMAIN_LIST)) {
                JSONArray jsonArray = jsonObject.getJSONArray(AVOptions.KEY_DOMAIN_LIST);
                List<String> strings = new ArrayList<>();
                for (int i = 0; i < jsonArray.length(); i++)
                    strings.add(jsonArray.getString(i));
                avOptions.setStringArray(AVOptions.KEY_DOMAIN_LIST, strings.toArray(new String[0]));
            }
            if (jsonObject.has(AVOptions.KEY_SEEK_MODE)) {
                avOptions.setInteger(AVOptions.KEY_SEEK_MODE, jsonObject.getInt(AVOptions.KEY_SEEK_MODE));
            }
            if (jsonObject.has(AVOptions.KEY_OPEN_RETRY_TIMES)) {
                avOptions.setInteger(AVOptions.KEY_OPEN_RETRY_TIMES, jsonObject.getInt(AVOptions.KEY_OPEN_RETRY_TIMES));
            }
            if (jsonObject.has(AVOptions.KEY_LOG_LEVEL)) {
                avOptions.setInteger(AVOptions.KEY_LOG_LEVEL, jsonObject.getInt(AVOptions.KEY_LOG_LEVEL));
            }
            if (jsonObject.has(AVOptions.KEY_START_POSITION)) {
                avOptions.setInteger(AVOptions.KEY_START_POSITION, jsonObject.getInt(AVOptions.KEY_START_POSITION));
            }
        } catch (JSONException ignore) {

        }
        return avOptions;
    }

    private static boolean checkPLVideoView() {
        return plVideoViewWeakRef != null && plVideoViewWeakRef.get() != null;
    }

    private static void executeJavaScriptCode(String jsc) {
        runOnGameThread(() -> CocosJavascriptJavaBridge.evalString(jsc));
    }

    private static void runOnGameThread(final Runnable runnable) {
        CocosHelper.runOnGameThread(runnable);
    }

    private static void runOnUiThread(final Runnable runnable) {
        SDKWrapper.shared().getActivity().runOnUiThread(runnable);
    }

    private static void runOnUiThreadWithWait(final Runnable runnable) {
        final CountDownLatch latch = new CountDownLatch(1);
        runOnUiThread(() -> {
            runnable.run();
            latch.countDown();
        });
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private static void onPLMediaPlayerListener(String event, String params) {
        executeJavaScriptCode(event + params);
    }

    private static String bytes2HexStr(byte[] bytes) {
        char[] buf = new char[bytes.length * 2];
        int index = 0;
        for (byte b : bytes) {
            // 利用位运算进行转换
            buf[index++] = HEX_CHAR[b >>> 4 & 0xf];
            buf[index++] = HEX_CHAR[b & 0xf];
        }
        return new String(buf);
    }

    @SuppressWarnings("SameParameterValue")
    private static void delayExecute(Runnable runnable, long delay) {
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                runnable.run();
            }
        }, delay);
    }

    private static void Log(String log) {
        if (enableLog)
            Log.i(TAG, log);
    }

    public interface PLMediaPlayerListenerEvent {
        String OnPrepared = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onPrepared";
        String OnInfo = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onInfo";
        String OnCompletion = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onCompletion";
        String OnError = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onError";
        String OnBufferingUpdate = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onBufferingUpdate";
        String OnVideoSizeChanged = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onVideoSizeChanged";
        String OnSeekComplete = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onSeekComplete";
        String OnImageCaptured = "typeof PLMediaPlayer !== 'undefined' && PLMediaPlayer.Listener.onImageCaptured";
    }

    private static void onPrepared(int preparedTime) {
        if (checkPLVideoView()) {
            plVideoViewWeakRef.get().start();
            delayExecute(() -> plVideoViewWeakRef.get().seekTo(0), delayMS);
        }
        if (isRestart) {
            isRestart = false;
            return;
        }
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnPrepared, "(" + preparedTime + ")");
    }

    private static void onInfo(int what, int extra) {
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnInfo, "(" + what + ", " + extra + ")");
    }

    private static void onVideoSizeChanged(int width, int height) {
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnVideoSizeChanged, "(" + width + ", " + height + ")");
    }

    private static void onCompletion() {
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnCompletion, "()");
    }

    private static void onSeekComplete() {
        if (!isPlayingSeekTo && checkPLVideoView())
            plVideoViewWeakRef.get().pause();
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnSeekComplete, "()");
    }

    private static void onImageCaptured(byte[] bytes) {
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnCompletion, "(' " + bytes2HexStr(bytes) + "')");
    }

    private static void onBufferingUpdate(int percent) {
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnBufferingUpdate, "(" + percent + ")");
    }

    private static boolean onError(int errorCode) {
        onPLMediaPlayerListener(PLMediaPlayerListenerEvent.OnError, "(" + errorCode + ")");
        return false;
    }

}
