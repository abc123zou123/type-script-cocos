declare namespace PLMediaPlayer {
    namespace JSB {
        function fullClassName(sampleClassName: string): string;
        function callNativeMethod(className: string, methodName: string, ...parameters: any): any;
        function isAndroid(): boolean;
        function isIOS(): boolean;
    }
    const Listener: {
        listeners: PLOnMediaPlayerListener[];
        setListener(listener: PLOnMediaPlayerListener): void;
        removeListener(listener: PLOnMediaPlayerListener): void;
        onPrepared(preparedTime: number): void;
        onInfo(what: number, extra: number): void;
        onCompletion(): void;
        onError(errorCode: number): void;
        onBufferingUpdate(percent: number): void;
        onVideoSizeChanged(width: number, height: number): void;
        onSeekComplete(): void;
        onImageCaptured(hex: string): void;
    };
    interface AVOptions {
        /**
         * 解码方式:
         * codec=0, 软解
         * codec=1，硬解
         * codec=2, 硬解优先，失败后自动切换到软解
         */
        "mediacodec": 0 | 1 | 2;
        /**
         * 设置偏好的视频格式，设置后会加快对应格式视频流的打开速度，但播放其他格式会出错
         * m3u8 = 1, mp4 = 2, flv = 3
         */
        "prefer-format": 1 | 2 | 3;
        /**
         * 打开视频时单次 http 请求的超时时间(ms)，一次打开过程最多尝试五次
         */
        "timeout": number;
        /**
         * 是否开启直播优化，1 为开启，0 为关闭。若开启，视频暂停后再次开始播放时会触发追帧机制
         * 默认为 0
         */
        "live-streaming": 0 | 1;
        /**
         * 默认的缓存大小，单位是 ms
         * 默认值是：500
         */
        "cache-buffer-duration": number;
        /**
         * 最大的缓存大小，单位是 ms
         * 默认值是：2000，若设置值小于 cache-buffer-duration 则不会生效
         */
        "max-cache-buffer-duration": number;
        /**
         * 设置本地缓存目录，目前只支持 mp4 点播
         * 默认值是：无
         */
        "cache-dir": string;
        /**
         * 设置本地缓存文件的后缀名，只有在设置了缓存目录后才会生效，一个流地址在设置了自定义后缀名后，再次播放前必须设置相同的后缀名，否则无法打开
         * 默认值是 mp4
         */
        "cache-ext": string;
        /**
         * 开启解码后的视频数据回调
         * 默认值为 0，设置为 1 则开启
         */
        "video-data-callback": 0 | 1;
        /**
         * 开启解码后的音频数据回调
         * 默认值为 0，设置为 1 则开启
         */
        "audio-data-callback": 0 | 1;
        /**
         * 开启自定义视频数据渲染
         * 默认值为 0，由 SDK 内部渲染视频；设置为 1 则开启
         */
        "video-render-external": 0 | 1;
        /**
         * 开启自定义音频数据播放
         * 默认值为 0，由 SDK 内部播放音频；设置为 1 则开启
         */
        "audio-render-external": 0 | 1;
        /**
         * 快开模式，0，关闭；1，启用后会加快该播放器实例再次打开相同协议的视频流的速度
         */
        "fast-open": 0 | 1;
        /**
         * DNS 服务器设置
         * 若不设置此项，则默认使用 DNSPod 的 httpdns 服务
         * 若设置为 127.0.0.1，则会使用系统的 DNS 服务器
         * 若设置为其他 DNS 服务器地址，则会使用设置的服务器
         */
        "dns-server": string;
        /**
         * DNS 缓存设置
         * 若不设置此项，则每次播放未缓存的域名时都会进行 DNS 解析，并将结果缓存
         * 参数为 String[]，包含了要缓存 DNS 结果的域名列表
         * SDK 在初始化时会解析列表中的域名，并将结果缓存
         */
        "domain-list": string[];
        /**
         * 设置拖动模式，1 位精准模式，即会拖动到时间戳的那一秒；0 为普通模式，会拖动到时间戳最近的关键帧。默认为 0
         */
        "accurate-seek": 0 | 1;
        /**
         * 打开重试次数，设置后若打开流地址失败，则会进行重试
         */
        "open-retry-times": number;
        /**
         * 预设置 SDK 的 log 等级， 0-4 分别为 v/d/i/w/e
         */
        "log-level": 0 | 1 | 2 | 3 | 4;
        /**
         * 设置开始播放位置
         * 默认不开启，单位为 ms
         */
        "start-position": number;
        "cache-filename_encode": string;
        "mp4-preload": string;
        "sdk-id": string;
        "drm-key": ArrayBuffer;
        "comp-key": string;
    }
    interface PLOnMediaPlayerListener {
        /**
         * 该对象用于监听播放器的 prepare 过程，该过程主要包括：创建资源、建立连接、请求码流等等，当 prepare 完成后，SDK 会回调该对象的 onPrepared 接口，下一步则可以调用播放器的 start() 启动播放。
         * @param preparedTime prepared time: ms
         */
        onPrepared?: (preparedTime: number) => void;
        /**
         * 该对象用于监听播放器的状态消息，在播放器启动后，SDK 会在播放器发生状态变化时调用该对象的 onInfo 方法，同步状态信息。
         * 1     未知消息
         * 3     第一帧视频已成功渲染
         * 200   连接成功
         * 340   读取到 metadata 信息
         * 701   开始缓冲
         * 702   停止缓冲
         * 802   硬解失败，自动切换软解
         * 901   预加载完成
         * 8088  loop 中的一次播放完成
         * 10001 获取到视频的播放角度
         * 10002 第一帧音频已成功播放
         * 10003 获取视频的I帧间隔
         * 20001 视频的码率统计结果
         * 20002 视频的帧率统计结果
         * 20003 音频的帧率统计结果
         * 20004 音频的帧率统计结果
         * 10004 视频帧的时间戳
         * 10005 音频帧的时间戳
         * 1345  离线缓存的部分播放完成
         * 565   上一次 seekTo 操作尚未完成
         * @param what 消息类型
         * @param extra 附加信息
         */
        onInfo?: (what: number, extra: number) => void;
        /**
         * 该对象用于监听播放结束的消息，关于该回调的时机，有如下定义：
         * 如果是播放文件，则是播放到文件结束后产生回调
         * 如果是在线视频，则会在读取到码流的EOF信息后产生回调，回调前会先播放完已缓冲的数据
         * 如果播放过程中产生onError，并且没有处理的话，最后也会回调本接口
         * 如果播放前设置了 setLooping(true)，则播放结束后会自动重新开始，不会回调本接口
         * 如果同时将 AVOptions.KEY_FAST_OPEN 与 AVOptions.KEY_SEEK_MODE 设置为 1，并且希望在收到本接口后播放同一个视频，需要在 start 后手动调用 seekTo(0)
         */
        onCompletion?: () => void;
        /**
         * -1    未知错误
         * -2    播放器打开失败
         * -3    网络异常
         * -4    拖动失败
         * -5    预加载失败
         * -2003 硬解失败
         * -2008 播放器已被销毁，需要再次 setVideoURL 或 prepareAsync
         * -9527 so 库版本不匹配，需要升级
         * -4410 AudioTrack 初始化失败，可能无法播放音频
         */
        onError?: (errorCode: number) => void;
        /**
         * 该回调用于监听当前播放器已经缓冲的数据量占整个视频时长的百分比，在播放直播流中无效，仅在播放文件和回放时才有效。
         */
        onBufferingUpdate?: (percent: number) => void;
        /**
         * 该回调用于监听当前播放的视频流的尺寸信息，在 SDK 解析出视频的尺寸信息后，会触发该回调，开发者可以在该回调中调整 UI 的视图尺寸。
         */
        onVideoSizeChanged?: (width: number, height: number) => void;
        /**
         * 该回调用于监听 seek 完成的消息，当调用的播放器的 seekTo 方法后，SDK 会在 seek 成功后触发该回调。
         */
        onSeekComplete?: () => void;
        /**
         * 该回调用于监听 seek 完成的消息，当调用的播放器的 seekTo 方法后，SDK 会在 seek 成功后触发该回调。
         * @param data 编码后的 jpeg 截图数据
         */
        onImageCaptured?: (data: ArrayBuffer) => void;
    }
    class PLMediaPlayer {
        className: string;
        constructor(options?: AVOptions | {});
        enableLog(enable: boolean): void;
        /**
         * Releases resources associated with this MediaPlayer object.
         */
        release(): void;
        /**
         * 获取播放器当前状态
         */
        getPlayerState(): number;
        /**
         * 获取 METADATA 信息
         */
        getMetadata(): {
            [name: string]: string;
        };
        /**
         * 播放参数配置
         * 请在开始播放之前配置
         */
        setAVOptions(options: AVOptions): void;
        /**
         *  获取 RTMP Message Timestamp
         */
        getRtmpAudioTimestamp(): number;
        /**
         * 设置显示模式
         * @param ratio
         *  ASPECT_RATIO_ORIGIN = 0;
         *  ASPECT_RATIO_FIT_PARENT = 1;
         *  ASPECT_RATIO_PAVED_PARENT = 2;
         *  ASPECT_RATIO_16_9 = 3;
         *  ASPECT_RATIO_4_3 = 4;
         */
        setDisplayAspectRatio(ratio: number): void;
        /**
         *  获取 RTMP Message Timestamp
         */
        getRtmpVideoTimestamp(): number;
        /**
         * 设置播放区域
         * 播放视频的一部分区域。若所有参数均为 0，则不裁剪画面。
         */
        setVideoArea(topLeftX: number, topLeftY: number, bottomRightX: number, bottomRightY: number): void;
        /**
         * 控制我们是否应该使用附加的 SurfaceHolder 在视频播放时保持屏幕开启。
         */
        setScreenOnWhilePlaying(screenOn: boolean): void;
        /**
         * 设置播放地址
         * @param path
         */
        setDataSource(path: string, headers?: {
            [name: string]: string;
        } | undefined): void;
        /**
         * 设置播放地址
         * @param path
         */
        setVideoPath(path: string, headers?: {
            [name: string]: string;
        } | undefined): void;
        /**
         * 获取播放地址
         */
        getDataSource(): string;
        /**
         * 获取播放地址
         */
        getVideoPath(): string;
        /**
         * 配置和准备，当一切都准备就绪以后，就可以调用 prepareAsync() 开始准备播放了，该过程是异步的，因此需要首先注册一个 PLOnPreparedListener 获取准备结束的回调（如果前面已经注册过，则不用重复注册）。
         */
        prepareAsync(): void;
        /**
         * 倍数播放，范围：0.1～32 倍数
         */
        setPlaySpeed(speed: number): boolean;
        /**
         * 获取播放倍速
         */
        getPlaySpeed(): number;
        /**
         * 播放器声音调节
         */
        setVolume(leftVolume: number, rightVolume: number): void;
        /**
         * 添加预缓存
         */
        addCache(url: string): void;
        /**
         * 清楚预缓存
         */
        delCache(url: string): void;
        /**
         * 添加预加载资源
         */
        addIOCache(url: string): void;
        /**
         * 清除预加载资源
         */
        delIOCache(url: string): void;
        /**
         * 设置文件预加载预大小，单位为 byte，默认 10 * 1024
         */
        setIOCacheSize(size: number): void;
        /**
         * 重新播放（停在视频最开始）
         */
        restart(): void;
        /**
         * 播放
         */
        start(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 停止
         */
        stop(): void;
        /**
         * 停止
         */
        stopPlayback(): void;
        /**
         * 跳转到指定的时间位置。单位 ms
         */
        seekTo(msec: number): void;
        /**
         * 获取视频宽度
         */
        getVideoWidth(): number;
        /**
         * 获取视频高度
         */
        getVideoHeight(): number;
        /**
         * 获取视频比特率
         */
        getVideoBitrate(): number;
        /**
         * 获取视频帧数
         */
        getVideoFps(): number;
        /**
         * 获取音频采样率
         */
        getAudioSampleRate(): number;
        /**
         * 获取音频频道
         */
        getAudioChannels(): number;
        /**
         * 获取音频比特率
         */
        getAudioBitrate(): number;
        /**
         * 获取音频帧数
         */
        getAudioFps(): number;
        /**
         * 视频是否在播放
         */
        isPlaying(): boolean;
        /**
         * 获取视频播放位置
         * @returns 当前位置（以毫秒为单位）
         */
        getCurrentPosition(): number;
        /**
         * 获取文件或流的持续时间。
         */
        getDuration(): number;
        /**
         * 设置循环播放
         */
        setLooping(looping: boolean): void;
        /**
         * 是否循环播放
         */
        isLooping(): boolean;
        /**
         * 可以通过 captureImage 方法进行视频截图，截图数据将会在 PLOnImageCapturedListener 中回调
         * @param delayTimeMs 截取调用此方法后相应毫秒后的视频画面，仅对点播流生效
         */
        captureImage(delayTimeMs: number): void;
        /**
         * 是否启用视频
         */
        setVideoEnabled(enabled: boolean): void;
        /**
         * 暂停/恢复播放器的预缓冲
         */
        setBufferingEnabled(enabled: boolean): void;
        /**
         * 获取已经缓冲的长度（单位 byte, 形式为十六进制字符串）
         * @returns
         */
        getHttpBufferSize(): string;
        /**
         * 获取请求响应信息，可以在播放开始后调用。
         */
        getResponseInfo(): string;
        /**
         * 设置视频监听器
         * @param listener 监听器
         */
        setPLOnMediaPlayerListener(listener: PLOnMediaPlayerListener): void;
        /**
         * 移除视频监听器
         * @param listener 监听器
         */
        removePLOnMediaPlayerListener(listener: PLOnMediaPlayerListener): void;
    }
    const support: boolean;
    function getMediaPlayer(options?: AVOptions | undefined): PLMediaPlayer;
}
