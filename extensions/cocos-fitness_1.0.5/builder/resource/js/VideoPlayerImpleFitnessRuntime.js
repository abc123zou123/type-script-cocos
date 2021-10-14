if (cc.internal.VideoPlayer) {
    let rt = loadRuntime();

    const {
        EventType
    } = cc.internal.VideoPlayer;

    let vec3 = cc.Vec3;
    let mat4 = cc.Mat4;
    let _mat4_temp = new mat4();

    let _topLeft = new vec3();
    let _bottomRight = new vec3();

    cc.internal.VideoPlayerImplManager.getImpl = function (componenet) {
        return new VideoPlayerImplFitnessRuntime(componenet);
    };

    class VideoPlayerImplFitnessRuntime extends cc.internal.VideoPlayerImpl {
        constructor(componenet) {
            super(componenet);
            this._matViewProj_temp = new mat4();
        }

        syncClip(clip) {
            this.removeVideoPlayer();
            if (!clip) {
                return;
            }
            this.createVideoPlayer(clip._nativeAsset);
        }

        syncURL(url) {
            this.removeVideoPlayer();
            if (!url) {
                return;
            }
            this.createVideoPlayer(url);
        }

        onCanplay() {
            if (this._loaded) {
                return;
            }
            this._loaded = true;
            this.video.setVisible(this._visible);
            this.dispatchEvent(EventType.READY_TO_PLAY);
            this.delayedPlay();
        }

        _bindEvent() {
            let video = this._video;
            let self = this;

            if (!video) {
                return;
            }
            // this.video.addEventListener("video.loadedMetadata", this.onLoadedMetadata.bind(this));
            // this.video.addEventListener("video.onReady", this.onCanPlay.bind(this));
            // this.video.addEventListener("video.onPlay", this.onPlay.bind(this));
            // this.video.addEventListener("video.onPause", this.onPause.bind(this));
            // this.video.addEventListener("video.onStop", this.onStoped.bind(this));
            // this.video.addEventListener("video.onClick", this.onClick.bind(this));
            // this.video.addEventListener("video.onComplete", this.onEnded.bind(this));

            video.onPlay(function () {
                if (self._video !== video) return;
                self._playing = true;
                self.dispatchEvent(EventType.PLAYING);
            });
            video.onEnded(function () {
                if (self._video !== video) return;
                self._playing = false;
                self.currentTime = self.duration; // ensure currentTime is at the end of duration
                self.dispatchEvent(EventType.COMPLETED);
            });
            video.onPause(function () {
                if (self._video !== video) return;
                self._playing = false;
                self.dispatchEvent(EventType.PAUSED);
            });
            video.onTimeUpdate(function (res) {
                var data = JSON.parse(res.position);
                if (typeof data === "object") {
                    self.duration = data.duration;
                    self.currentTime = data.position;
                    return;
                }
                self.duration = res.duration;
                self.currentTime = res.position;
            });
            video.onStopped(function () {
                if (self._video !== video) return;
                self._playing = false;
                self.dispatchEvent(EventType.STOPPED);
            });
            video.onClicked(function () {
                if (self._video !== video) return;
                self.dispatchEvent(EventType.CLICKED);
            });
            video.onReadyPlay(function (duration) {
                if (self._video !== video) return;
                if (typeof duration === 'number') {
                    self.duration = duration;
                }
                self.currentTime = 0;
                self._loaded = true;
                self.dispatchEvent(EventType.READY_TO_PLAY);
            });
            video.onMetaLoaded(function () {
                if (self._video !== video) return;
                if (self._video.onMetaLoadedTiggle) {
                    self.dispatchEvent(EventType.META_LOADED);
                    self._video.onMetaLoadedTiggle = false;
                }
            });
            video.onFullScreenChanged(function (fullScreenEnabled) {
                if (self._video !== video) return;
                self._fullScreenOnAwake = fullScreenEnabled;
            });

        }

        onLoadedMetadata() {
            this._loadedMeta = true;
            this._forceUpdate = true;
            if (this._visible) {
                this.enable();
            } else {
                this.disable();
            }
            this.dispatchEvent(EventType.META_LOADED);
            this.delayedFullScreen();
            this.delayedPlay();
        }

        createVideoPlayer(url) {
            this._video = rt.createVideo({
                x: this._tx,
                y: this._ty,
                width: this._width,
                height: this._height,
                src: url,
                objectFit: "contain",
                live: false,
            });

            if (this._stayOnBottom) {
                this._video.setStayOnBottom(true);
            }
            this._video.onMetaLoadedTiggle = true;
            this._video.src = url;
            this._video.muted = false;
            this._loaded = false;
            this._playing = false;
            let self = this;
            this._video.onReadyPlay(function (duration) {
                // if (self._video !== video) return;
                if (typeof duration === 'number') {
                    self.duration = duration;
                }
                self.currentTime = 0;
                self._loadedMeta = true;
                self._loaded = true;
                self.enable();
                self._bindEvent();
                self._video.setVisible(self._visible);
                // self._video.setURL(url);
                self._forceUpdate = true;
                self.dispatchEvent(EventType.READY_TO_PLAY);
            })

        }

        removeVideoPlayer() {
            let video = this.video;
            if (video) {
                video.stop();
                video.setVisible(false);
                video.destroy();
                this._playing = false;
                this._loaded = false;
                this._loadedMeta = false;
                this._ignorePause = false;
                this._cachedCurrentTime = 0;
                this._video = null;
            }
        }

        getDuration() {
            if (!this.video) {
                return -1;
            }
            return this.duration;
        }

        syncPlaybackRate(val) {
            if (this.video) {
                this.video.setPlaybackRate(val)
            }
        }

        syncVolume() {
            cc.warn("The platform does not support");
        }

        syncMute(enabled) {
            if (this.video) {
                this.video.setMute();
            }
        }

        syncLoop(enabled) {
            if (this.video) {
                this.video.setLooping(enabled);
            }
        }

        syncStayOnBottom(enabled) {
            this._stayOnBottom = enabled;
            if (this.video) {
                this.video.setStayOnBottom(enabled);
            }
        }

        getCurrentTime() {
            return this.currentTime;
        }

        seekTo(val) {
            if (this.video) {
                this.video.seek(val);
                this.currentTime = val;
            }
        }

        disable(noPause) {
            if (this.video) {
                if (!noPause) {
                    this.video.pause();
                }
                this.video.setVisible(false);
                this._visible = false;
            }
        }

        enable() {
            if (this.video) {
                this.video.setVisible(true);
                this._visible = true;
            }
        }

        canPlay() {
            this.video.play();
            // this.syncCurrentTime();
        }

        resume() {
            if (this.video) {
                this.video.resume();
                // this.syncCurrentTime();
                this._playing = true;
            }
        }

        pause() {
            if (this.video) {
                this._cachedCurrentTime = this.currentTime;
                this.video.pause();
            }
        }

        stop() {
            if (this.video) {
                this._ignorePause = true;
                this.video.seek(0);
                this._cachedCurrentTime = 0;
                this.currentTime = 0;
                this.video.stop();
            }
        }

        canFullScreen(enabled) {
            if (this.video) {
                this.video.setFullScreenEnabled(enabled);
            }
        }

        syncKeepAspectRatio(enabled) {
            cc.warn("The platform does not support");
            // if (this.video) {
            //     this.video.setKeepAspectRatioEnabled(enabled);
            // }
        }

        syncMatrix() {
            if (!this._video || !this._component || !this._uiTrans) return;

            const camera = this.UICamera;
            if (!camera) {
                return;
            }

            this._component.node.getWorldMatrix(_mat4_temp);
            const uiWidth = this._uiTrans.contentSize.width;
            const uiHeight = this._uiTrans.contentSize.height;

            // if (!this._forceUpdate &&
            //     camera.matViewProj.equals(this._matViewProj_temp) &&
            //     this._m00 === _mat4_temp.m00 && this._m01 === _mat4_temp.m01 &&
            //     this._m04 === _mat4_temp.m04 && this._m05 === _mat4_temp.m05 &&
            //     this._m12 === _mat4_temp.m12 && this._m13 === _mat4_temp.m13 &&
            //     this._w === uiWidth && this._h === uiHeight) {
            //     return;
            // }

            this._matViewProj_temp.set(camera.matViewProj);
            // update matrix cache
            this._m00 = _mat4_temp.m00;
            this._m01 = _mat4_temp.m01;
            this._m04 = _mat4_temp.m04;
            this._m05 = _mat4_temp.m05;
            this._m12 = _mat4_temp.m12;
            this._m13 = _mat4_temp.m13;
            this._w = uiWidth;
            this._h = uiHeight;

            let canvas_width = cc.game.canvas.width;
            let canvas_height = cc.game.canvas.height;

            let ap = this._uiTrans.anchorPoint;
            // Vectors in node space
            vec3.set(_topLeft, -ap.x * this._w, (1.0 - ap.y) * this._h, 0);
            vec3.set(_bottomRight, (1 - ap.x) * this._w, -ap.y * this._h, 0);
            // Convert to world space
            vec3.transformMat4(_topLeft, _topLeft, _mat4_temp);
            vec3.transformMat4(_bottomRight, _bottomRight, _mat4_temp);
            // need update camera data
            camera.update();
            // Convert to Screen space
            camera.worldToScreen(_topLeft, _topLeft);
            camera.worldToScreen(_bottomRight, _bottomRight);

            let finalWidth = _bottomRight.x - _topLeft.x;
            let finalHeight = _topLeft.y - _bottomRight.y;

            if (this._video.x === _topLeft.x &&
                this._video.y === canvas_height - _topLeft.y &&
                this._video.width === finalWidth &&
                this._video.height === finalHeight) {
                return;
            }

            this._video.x = _topLeft.x;
            this._video.y = canvas_height - _topLeft.y;
            this._video.width = finalWidth;
            this._video.height = finalHeight;

            if (typeof this._video.setDisplayArea === 'function') {
                this._video.setDisplayArea(_topLeft.x, canvas_height - _topLeft.y, finalWidth, finalHeight);
            }

            this._forceUpdate = false;
        }
    }
}