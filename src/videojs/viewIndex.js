function onKickout () {
    alert("on kick out!");
}

function quitRTC () {
    RTC.quit();
    $("#video-section").hide();
    $("#input-container").show();
    $("#remote-video-wrap").html("");
}

function onRelayTimeout (msg) {
    alert("onRelayTimeout!" + (msg ? JSON.stringify(msg) : ""));
}

function createVideoElement (id, isLocal) {
    var videoDiv = document.createElement("div");
    if("local"==id){
    	videoDiv.setAttribute("style","display:none;");
    }
    videoDiv.innerHTML = '<video id="' + id + '" autoplay ' + (isLocal ? 'muted' : '') + '  width="50%" height="50%" style="object-fit:fill"></video>';
    document.getElementById("remote-video-wrap").appendChild(videoDiv);
    return document.getElementById(id);
}

function onLocalStreamAdd (info) {
	console.log("===============local=======================")
    if (info.stream && info.stream.active === true) {
        var id = "local";
        var video = document.getElementById(id);
        if (!video) {
            createVideoElement(id, true);
        }
        var video = document.getElementById(id)
        video.srcObject = info.stream;
        video.muted = true
        video.autoplay = true
        video.playsinline = true

    }
}


function onRemoteStreamUpdate (info) {
    console.log("===============remote=======================")
    if (info.stream && info.stream.active === true) {
        var id = info.videoId;
        var video = document.getElementById(id);
        if (!video) {
            video = createVideoElement(id);
        }
        setTimeout(function () {
            video.srcObject = info.stream;
        }, 50)
    } else {
        // console.log('欢迎用户' + info.userId + '加入房间');
    }
}


function onRemoteStreamRemove (info) {
    // console.log(info.userId + ' 断开了连接');
    var videoNode = document.getElementById(info.videoId);
    if (videoNode) {
        videoNode.srcObject = null;
        document.getElementById(info.videoId).parentElement.removeChild(videoNode);
    }
}

function onWebSocketClose () {
    RTC.quit();
}


Bom = {
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


function gotStream (opt, succ) {
    RTC.getLocalStream({
        video: false,
        audio: true
       // videoDevice: opt.videoDevice
    }, function (info) {
        var stream = info.stream;
        succ(stream)
    });
}


function stopRTC () {
    RTC.stopRTC(0, function (info) {
        // console.debug(info)
    }, function (info) {
        // console.debug(info)
    });
}

function stopWs () {
    RTC.global.websocket.close();
}

function startRTC () {
    RTC.startRTC(0, function (info) {
        // console.debug(info)
    }, function (info) {
        // console.debug(info)
    });
}


var videoDevices = [];
var audioDevices = [];
var speakerDevices = [];
var speakerIndex = 0;
var audioIndex = 0;
var videoIndex = 0;

function listDevices(){
    //枚举摄像头
    RTC.getVideoDevices(function(devices) {
        videoDevices = devices;
        var deviceJsonList = [];
        for(var a in devices){
            console.debug( devices[a])
            deviceJsonList.push({
                label: devices[a].label,
                deviceId: devices[a].deviceId
            })
        }
    }); 
    //枚举麦克风
    RTC.getAudioDevices(function(devices) {
        audioDevices = devices;
        var deviceJsonList = [];
        for(var a in devices){
            console.debug( devices[a])
            deviceJsonList.push({
                label: devices[a].label,
                deviceId: devices[a].deviceId
            })
        }
    });
    //枚举麦克风
    RTC.getSpeakerDevices(function(devices) {
        speakerDevices = devices;
        var deviceJsonList = [];
        for(var a in devices){
            console.debug( devices[a])
            deviceJsonList.push({
                label: devices[a].label,
                deviceId: devices[a].deviceId
            })
        }
    });
}

function switchVideoDevice() {
    videoIndex ++;
    if(videoIndex == videoDevices.length )videoIndex = 0;
    console.debug('switchVideoDevice',videoIndex, videoDevices[videoIndex])
    RTC.chooseVideoDevice( videoDevices[videoIndex] );
}

function switchAudioDevice(){
    audioIndex ++;
    if( audioIndex ==  audioDevices.length ) audioIndex = 0;
    RTC.chooseAudioDevice( audioDevices[audioIndex] );
}

function switchSpeakerDevice(){
    speakerIndex ++;
    if( speakerIndex ==  speakerDevices.length ) speakerIndex = 0;
    $("#remote-video-wrap video").each(function(index, video){
        RTC.chooseSpeakerDevice( video, speakerDevices[speakerIndex] );
    })
}


function initRTC (opts) {
    // 初始化
    window.RTC = new WebRTCAPI({
        "userId": opts.userId,
        "userSig": opts.userSig,
        "sdkAppId": opts.sdkappid
    });


    RTC.createRoom({
        roomid: opts.roomid * 1,
        privMap: 255
    }, function () {
        gotStream({
            audio: true,
            video: true
        }, function (stream) {
            RTC.startRTC({
                stream: stream,
                role: 'ed320'
            });
        })
    });
    
    // 远端流新增/更新
    RTC.on("onRemoteStreamUpdate", onRemoteStreamUpdate)
    // 本地流新增
    RTC.on("onLocalStreamAdd", onLocalStreamAdd)
    // 远端流断开
    RTC.on("onRemoteStreamRemove", onRemoteStreamRemove)
    // 重复登录被T
    RTC.on("onKickout", onKickout)
    // 服务器超时
    RTC.on("onRelayTimeout", onRelayTimeout)
    // just for debugging
    // RTC.on("*",function(e){
    // console.debug(e)
    // });
    RTC.on("onErrorNotify", function (info) {
        console.error(info)
        if (info.errorCode === RTC.getErrorCode().GET_LOCAL_CANDIDATE_FAILED) {
            // alert( info.errorMsg )
        }
    });
    RTC.on("onStreamNotify", function (info) {
        // console.warn('onStreamNotify', info)
    });
    RTC.on("onWebSocketNotify", function (info) {
        // console.warn('onWebSocketNotify', info)
    });
    RTC.on("onUserDefinedWebRTCEventNotice", function (info) {
        // console.error( 'onUserDefinedWebRTCEventNotice',info )
    });
    listDevices();
}

