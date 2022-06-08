<template>
    <div  id="remote-video-wrap" v-if='wrapModal'>
        <span style="width:20px;height:20px;font-size:26px;color:#000;position:absolute;right:8px;cursor:pointer;" @click="closeVideoWin">×</span>
        <div>
            <video id='remote-video-id' autoplay='' style="width:100%;height:calc(100% - 20px);top:35px;position:absolute;">
            </video>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        props:['wrapModal','videoUrl'],
        data(){
            return{
                id:'remote-video-id',
                Bom:{},
                videoDevices:[],
                audioDevices:[],
                speakerDevices:[],
                speakerIndex:0,
                audioIndex:0,
                videoIndex:0,
                RTC:{}
            }
        },
        created(){
            this.Bom = {
                /**
                * @description 读取location.search
                *
                * @param {String} n 名称
                * @return {String} search值
                * @example
                * 		$.bom.query('mod');
                */
                query: function (n) {
                    var m = window.location.search.match(new RegExp("(\\?|&)" + n + "=([^&]*)(&|$)"));
                    return !m ? "" : decodeURIComponent(m[2]);
                },
                getHash: function (n) {
                    var m = window.location.hash.match(new RegExp("(#|&)" + n + "=([^&]*)(&|$)"));
                    return !m ? "" : decodeURIComponent(m[2]);
                }
            };
        },
        methods:{
            onKickout () {
                alert("on kick out!");
            },
            quitRTC () {
                this.RTC.quit();
                // document.getElementById("video-section").hide();
                // $("#input-container").show();
            },
            onRelayTimeout (msg) {
                alert("onRelayTimeout!" + (msg ? JSON.stringify(msg) : ""));
            },
            onRemoteStreamUpdate (info) {
                console.log("===============remote=======================")
                if (info.stream && info.stream.active === true) {
                    var video = document.getElementById(this.id);
                    setTimeout(function () {
                        video.srcObject = info.stream;
                    }, 50)
                }
            },
            onRemoteStreamRemove (info) {
                // console.log(info.userId + ' 断开了连接');
                var videoNode = document.getElementById(this.id);
                if (videoNode) {
                    videoNode.srcObject = null;
                    // document.getElementById(this.id).parentElement.removeChild(videoNode);
                }
            },
            onWebSocketClose () {
                this.RTC.quit();
            },
            gotStream (opt, succ) {
                this.RTC.getLocalStream({
                    video: false,
                    audio: true
                }, function (info) {
                    var stream = info.stream;
                    succ(stream)
                });
            },
            stopRTC () {
                this.RTC.stopRTC(0, function (info) {
                    // console.debug(info)
                }, function (info) {
                    // console.debug(info)
                });
            },
            stopWs () {
                this.RTC.global.websocket.close();
            },
            startRTC () {
                this.RTC.startRTC(0, function (info) {
                    // console.debug(info)
                }, function (info) {
                    // console.debug(info)
                });
            },
            listDevices(){
                //枚举摄像头
                let that = this;
                this.RTC.getVideoDevices(function(devices) {
                    that.videoDevices = devices;
                    var deviceJsonList = [];
                    for(var a in devices){
                        // console.debug( devices[a])
                        deviceJsonList.push({
                            label: devices[a].label,
                            deviceId: devices[a].deviceId
                        })
                    }
                }); 
                //枚举麦克风
                this.RTC.getAudioDevices(function(devices) {
                    that.audioDevices = devices;
                    var deviceJsonList = [];
                    for(var a in devices){
                        // console.debug( devices[a])
                        deviceJsonList.push({
                            label: devices[a].label,
                            deviceId: devices[a].deviceId
                        })
                    }
                });
                //枚举麦克风
                this.RTC.getSpeakerDevices(function(devices) {
                    that.speakerDevices = devices;
                    var deviceJsonList = [];
                    for(var a in devices){
                        // console.debug( devices[a])
                        deviceJsonList.push({
                            label: devices[a].label,
                            deviceId: devices[a].deviceId
                        })
                    }
                });
            },
            switchVideoDevice() {
                this.videoIndex ++;
                if(this.videoIndex == this.videoDevices.length )this.videoIndex = 0;
                console.debug('switchVideoDevice',this.videoIndex, this.videoDevices[this.videoIndex])
                this.RTC.chooseVideoDevice( this.videoDevices[this.videoIndex] );
            },
            switchAudioDevice(){
                this.audioIndex ++;
                if( this.audioIndex ==  this.audioDevices.length ) this.audioIndex = 0;
                this.RTC.chooseAudioDevice( this.audioDevices[this.audioIndex] );
            },
            switchSpeakerDevice(){
                this.speakerIndex ++;
                if( this.speakerIndex ==  this.speakerDevices.length ) this.speakerIndex = 0;
                $("#remote-video-wrap video").each(function(index, video){
                    this.RTC.chooseSpeakerDevice( video, this.speakerDevices[this.speakerIndex] );
                })
            },
            initRTC (opts) {
                let that = this;
                // 初始化
                this.RTC = new WebRTCAPI({
                    "userId": opts.userId,
                    "userSig": opts.userSig,
                    "sdkAppId": opts.sdkappid
                });
                
                this.RTC.createRoom({
                    roomid: opts.roomid * 1,
                    privMap: 255
                }, function () {
                    that.gotStream({
                        audio: true,
                        video: false
                    }, function (stream) {
                        that.RTC.startRTC({
                            stream: stream,
                            role: 'user'
                        });
                    })
                });
                
                // 远端流新增/更新
                this.RTC.on("onRemoteStreamUpdate", this.onRemoteStreamUpdate)
                // 本地流新增
                //RTC.on("onLocalStreamAdd", onLocalStreamAdd)
                // 远端流断开
                this.RTC.on("onRemoteStreamRemove", this.onRemoteStreamRemove)
                // 重复登录被T
                this.RTC.on("onKickout", this.onKickout)
                // 服务器超时
                // this.RTC.on("onRelayTimeout", this.onRelayTimeout)
                // just for debugging
                // RTC.on("*",function(e){
                // console.debug(e)
                // });
                this.RTC.on("onErrorNotify", function (info) {
                    console.error(info)
                    if (info.errorCode === this.RTC.getErrorCode().GET_LOCAL_CANDIDATE_FAILED) {
                        // alert( info.errorMsg )
                    }
                });
                this.RTC.on("onStreamNotify", function (info) {
                    // console.warn('onStreamNotify', info)
                });
                this.RTC.on("onWebSocketNotify", function (info) {
                    // console.warn('onWebSocketNotify', info)
                });
                this.RTC.on("onUserDefinedWebRTCEventNotice", function (info) {
                    // console.error( 'onUserDefinedWebRTCEventNotice',info )
                });
                this.listDevices();
            },
            closeVideoWin(){
                this.$emit('editWin',false);
                this.quitRTC();
            }
        }
    }
</script>