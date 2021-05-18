import { Component, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../services/http/httpservice.service";

declare var $;

@Component({
  selector: "ngx-pubvideo",
  templateUrl: "./pubvideo.component.html",
  styleUrls: ["./pubvideo.component.scss"],
})
export class PubvideoComponent implements OnInit {
  constructor(private httpservice: HttpserviceService) {}

  ngOnInit(): void {}
  // 全局 hls_ob对象！
  hls_ob;
  ngAfterViewInit() {
    // this.get_url();
  }

  // 销毁组件
  ngOnDestroy() {
    this.hls_ob.destroy();
  }

  // 得到视屏url 测试
  get_url(cameraName) {
    console.error("得到视屏url 测试>>>>", cameraName);

    var url = "/api/v1/video",
      // 分页获取监控点资源
      params = {
        path: "/artemis/api/resource/v1/cameras",
        params: {
          pageNo: 1,
          pageSize: 1000,
        },
        headers: {},
      };
    // 获取监控点预览取流URL
    var params_url = {
      path: "/artemis/api/video/v1/cameras/previewURLs",
      params: {
        cameraIndexCode: "",
        streamType: 0,
        protocol: "hls",
        transmode: 1,
      },
      headers: {},
    };
    this.httpservice.post(url, params).subscribe((result) => {
      if (result["code"] === 1) {
        var list = result["message"]["data"]["list"];
        // 测试 cameraName = III研究总院试验主通道中看东4 的摄像头
        // console.error("分页获取监控点资源:list>>>>", list);
        var cameraIndexCode = ""; // cameraIndexCode 是不变的，变的是url
        list.forEach((item) => {
          if (item["cameraName"] === "III研究总院试验主通道中看东4") {
            cameraIndexCode = item["cameraIndexCode"];
            console.error(
              "分页获取监控点资源:cameraIndexCode>>>>",
              cameraIndexCode
            );
            params_url.params.cameraIndexCode = cameraIndexCode;
            this.httpservice.post(url, params_url).subscribe((res) => {
              if (res["code"] === 1) {
                var hls_url = res["message"]["data"]["url"];
                console.error("获取监控点预览取流URL:hls_url>>>>", hls_url);
                var url = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
                this.play_hls(hls_url);
                // this.play_hls(url);
              } else {
                // 请求视频失败
                alert("Err:\n" + JSON.stringify(res));
              }
            });
          }
        });
      } else {
        // 请求视频失败
        alert("Err:\n" + JSON.stringify(result));
      }
    });
  }

  // -------------------
  play_hls(url) {
    // @ts-ignore
    var $work_error = $(".work_error");
    $work_error.hide();
    var video = document.getElementById("video");
    // Hls.isSupported() 检查浏览器是否支持 兼容性！
    // @ts-ignore
    if (Hls.isSupported()) {
      // 在Hls 对象实例化时向hls.js 提供配置参数！
      var config = {
        // 如果设置为true，则在触发Hls.Events.MANIFEST_PARSED事件后, 将自动加载开始级别的播放列表和第一个片段
        autoStartLoad: true,

        // 如果是true，将在JS控制台上打开调试日志。
        debug: false,

        // 最大缓冲区长度(以秒为单位)，如果该值小于30s，则加载新的片段。
        maxBufferLength: 30,

        // 默认0.3 如果段的视频轨道比起音频轨道短，延长最终视频帧的持续时间以匹配音频轨道的持续时间，这有助于某些情况下继续播放，否则可能会卡住
        maxBufferHole: 0.1,

        // 有效延迟的边缘，如果设置为3，则将从片段N-3开始播放，N是实时播放列表的最后一个片段，减小此值可能会导致播放停顿
        // liveSyncDurationCount : 3,

        // 默认Infinity，设置10，则liveSyncDurationCount 每当要加载的下一个片段早于N-10时，播放器都将查找，其中N是实时播放列表的最后一个片段。
        // liveMaxLatencyDurationCount: 10,

        // 清单加载最大重试，默认1
        manifestLoadingMaxRetry: 0,

        // 最大缓冲区长度，600s，需要一个多小时的缓冲区来填充maxBufferSize
        maxMaxBufferLength: 600,

        // 最小缓冲区大小(以字节为单位)。如果大于60*1000*1000，测不会加载任何片段
        maxBufferSize: 20 * 1000 * 1000,

        // 如果预期播放媒体元素，且currentTime的移动时间不超过30s 则hls将尝试轻推播放头已恢复播放
        lowBufferWatchdogPeriod: 0.5,

        // 如果预期播放媒体元素，且currentTime的移动时间不超过30s 则hls将尝试轻推播放头已恢复播放
        highBufferWatchdogPeriod: 3,

        // 在hls引发致命 BUFF_STALLED_ERROR 之前，最大nb次重试
        nudgeMaxRetry: 2,

        // 默认值Infinity 无限，最小数量等于片段目标持续时间，以确保当前播放不会中断！
        liveBackBufferLength: 10,

        // 启用webWorker(如果可在浏览器上使用)进行TS解复用/MP4重复用，以提高性能并避免延迟/帧丢失！
        enableWorker: true,

        // 碎片加载超时，默认20000ms，如果加载持续时间超过此超时，则会触发超时回调。
        fragLoadingTimeOut: 5000,

        // 清单加载超时，默认10000ms，如果加载持续时间超过此超时，则会触发超时回调。
        manifestLoadingTimeOut: 2500,

        //水平加载超时，默认10000ms，如果加载持续时间超过此超时，则会触发超时回调。
        levelLoadingTimeOut: 5000,

        // 碎片加载重试延迟，默认1000ms
        // fragLoadingRetryDelay: 1000,

        // 显示加载重试延迟，默认1000ms
        // manifestLoadingRetryDelay: 1000,

        // 水平加载重试延迟，默认1000ms
        // levelLoadingRetryDelay: 1000,
      };

      // 实例化Hls对象，并将这个对象绑定到video元素
      // @ts-ignore
      // var hls = new Hls(config);
      this.hls_ob = new Hls(config);

      // 加载清单
      this.hls_ob.loadSource(url);

      // 绑定！
      this.hls_ob.attachMedia(video);

      // MANIFEST_PARSED事件是在MediaSource就绪好，有hls对象触发
      // @ts-ignore
      // @ts-ignore
      this.hls_ob.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log("video and hls.js are now bound together !");
        console.log("加载清单,发现 " + data.levels.length + " 质量等级");

        // muted 这是谷歌浏览器
        // @ts-ignore
        video.muted = true;
        // 通过video控制！ 视频是通过video element元素控制的，HTMLVideoElement 可以无法的控制事件！
        // @ts-ignore
        // video.play();
      });

      // 监听errors
      // @ts-ignore
      this.hls_ob.on(Hls.Events.ERROR, function (event, data) {
        // @ts-ignore
        var errorType = data.type;
        // @ts-ignore
        var errorDetails = data.details;
        // data.fatal为false 如果错误不是致命的，hls.js尝试恢复它，true 如果错误是致命的，则需要采取行动(尝试)恢复它。
        var errorFatal = data.fatal;

        if (errorFatal) {
          console.error("errorType>>>>>>>>>>>>", errorFatal);
          switch (errorDetails) {
            // @ts-ignore
            case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
              break;
            // FRAG_LOAD_ERROR 由于网络错误导致片段加载失败时引发
            // @ts-ignore
            case Hls.ErrorDetails.FRAG_LOAD_ERROR:
              console.log(
                "由于网络错误导致片段加载失败时引发",
                "errorFatal",
                errorFatal,
                "data.details",
                data.details
              );

              // muted 这是谷歌浏览器
              // @ts-ignore
              video.muted = true;
              // 下面是回复致命的网络和媒体错误的方法2  应该用来回复网络错误
              this.hls_ob.swapAudioCodec();
              this.hls_ob.recoverMediaError(); // 尝试恢复
              // @ts-ignore
              video.play();
              break;
            // @ts-ignore
            case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
              console.log(
                "当清单加载由于网络错误而失败时引发",
                "errorFatal",
                errorFatal,
                "data.details",
                data.details
              );

              // 下面是回复致命的网络和媒体错误的方法1  应该用来回复网络错误
              // hls.startLoad();
              // 下面是回复致命的网络和媒体错误的方法2  应该用来回复网络错误
              this.hls_ob.startLoad(); // 尝试恢复
              break;
            // buffer Nudge On Stall 缓冲器触碰失速
            // buffer Stalled Error缓冲停滞错误

            // @ts-ignore
            case Hls.ErrorDetails.INTERNAL_EXCEPTION:
              console.log(
                "hls 内部事件处理程序中发生异常时引发！",
                data.details
              );

              break;
            default:
              // 无法恢复
              console.log("无法恢复！！！！！！！！！！！！", data.details);
              this.hls_ob.swapAudioCodec();
              // @ts-ignore
              video.play();
              // hls.destroy();
              break;
          }

          // 类型
          switch (data.type) {
            // @ts-ignore网络相关的错误
            case Hls.ErrorTypes.NETWORK_ERROR:
              // try to recover network error
              console.error("网络相关的错误");

              // 提示视频加载报错--网络问题
              $work_error.show();
              this.hls_ob.startLoad();
              break;
            // @ts-ignore 媒体、视频相关的错误
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log("fatal media error encountered, try to recover");
              this.hls_ob.recoverMediaError();
              $work_error.hide();
              break;
            default:
              console.error("类型》》》》》》cannot recover");
              // cannot recover
              $work_error.hide();
              this.hls_ob.destroy();
              break;
          }

          // @ts-ignore
          this.hls_ob.swapAudioCodec();
        }
      });
    }
    // 在没有启动媒体源扩展(MSE)的平台上不支持hls.js.
    // 当浏览器内没有HLS支持时(使用`canPlayType`检查), 我们可以通过`src`属性直接向视频元素提供一个HLS清单(即.m3u8 URL).
    // 这是使用内置的支持纯视频元素, without using hls.js.
    // Note: 正常的做法是等待下面的`canplay`事件，但是在Safari上(你很可能在哪里找到内置的HLS支持)视频.src URL 必须在用户驱动上。
    // 白名单前的`canplay`事件将被发出; 当URL不在白名单上时，最后一个可以可靠侦听的视频事件是`loadedmetadata`.
    // @ts-ignore
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("1111111111111111111111111111111111111111111111111111111");
      // @ts-ignore
      video.src = url;
      // video.addEventListener('loadedmetadata', function() {
      video.addEventListener("canplay", function () {
        // @ts-ignore
        video.play();
      });
    }
  }
}

// 1 根据url 播放视频
// @ts-ignore
function play_hls(url) {
  // @ts-ignore
  var $work_error = $(".work_error");
  $work_error.hide();
  var video = document.getElementById("video");
  // Hls.isSupported() 检查浏览器是否支持 兼容性！
  // @ts-ignore
  if (Hls.isSupported()) {
    // 在Hls 对象实例化时向hls.js 提供配置参数！
    var config = {
      // 如果设置为true，则在触发Hls.Events.MANIFEST_PARSED事件后, 将自动加载开始级别的播放列表和第一个片段
      autoStartLoad: true,

      // 如果是true，将在JS控制台上打开调试日志。
      debug: false,

      // 最大缓冲区长度(以秒为单位)，如果该值小于30s，则加载新的片段。
      maxBufferLength: 30,

      // 默认0.3 如果段的视频轨道比起音频轨道短，延长最终视频帧的持续时间以匹配音频轨道的持续时间，这有助于某些情况下继续播放，否则可能会卡住
      maxBufferHole: 0.1,

      // 有效延迟的边缘，如果设置为3，则将从片段N-3开始播放，N是实时播放列表的最后一个片段，减小此值可能会导致播放停顿
      // liveSyncDurationCount : 3,

      // 默认Infinity，设置10，则liveSyncDurationCount 每当要加载的下一个片段早于N-10时，播放器都将查找，其中N是实时播放列表的最后一个片段。
      // liveMaxLatencyDurationCount: 10,

      // 清单加载最大重试，默认1
      manifestLoadingMaxRetry: 0,

      // 最大缓冲区长度，600s，需要一个多小时的缓冲区来填充maxBufferSize
      maxMaxBufferLength: 600,

      // 最小缓冲区大小(以字节为单位)。如果大于60*1000*1000，测不会加载任何片段
      maxBufferSize: 20 * 1000 * 1000,

      // 如果预期播放媒体元素，且currentTime的移动时间不超过30s 则hls将尝试轻推播放头已恢复播放
      lowBufferWatchdogPeriod: 0.5,

      // 如果预期播放媒体元素，且currentTime的移动时间不超过30s 则hls将尝试轻推播放头已恢复播放
      highBufferWatchdogPeriod: 3,

      // 在hls引发致命 BUFF_STALLED_ERROR 之前，最大nb次重试
      nudgeMaxRetry: 2,

      // 默认值Infinity 无限，最小数量等于片段目标持续时间，以确保当前播放不会中断！
      liveBackBufferLength: 10,

      // 启用webWorker(如果可在浏览器上使用)进行TS解复用/MP4重复用，以提高性能并避免延迟/帧丢失！
      enableWorker: true,

      // 碎片加载超时，默认20000ms，如果加载持续时间超过此超时，则会触发超时回调。
      fragLoadingTimeOut: 5000,

      // 清单加载超时，默认10000ms，如果加载持续时间超过此超时，则会触发超时回调。
      manifestLoadingTimeOut: 2500,

      //水平加载超时，默认10000ms，如果加载持续时间超过此超时，则会触发超时回调。
      levelLoadingTimeOut: 5000,

      // 碎片加载重试延迟，默认1000ms
      // fragLoadingRetryDelay: 1000,

      // 显示加载重试延迟，默认1000ms
      // manifestLoadingRetryDelay: 1000,

      // 水平加载重试延迟，默认1000ms
      // levelLoadingRetryDelay: 1000,
    };

    // 实例化Hls对象，并将这个对象绑定到video元素
    // @ts-ignore
    var hls = new Hls(config);

    // 加载清单
    hls.loadSource(url);

    // 绑定！
    hls.attachMedia(video);

    // MANIFEST_PARSED事件是在MediaSource就绪好，有hls对象触发
    // @ts-ignore
    // @ts-ignore
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log("video and hls.js are now bound together !");
      console.log("加载清单,发现 " + data.levels.length + " 质量等级");

      // muted 这是谷歌浏览器
      // @ts-ignore
      video.muted = true;
      // 通过video控制！ 视频是通过video element元素控制的，HTMLVideoElement 可以无法的控制事件！
      // @ts-ignore
      // video.play();
    });

    // 监听errors
    // @ts-ignore
    hls.on(Hls.Events.ERROR, function (event, data) {
      // @ts-ignore
      var errorType = data.type;
      // @ts-ignore
      var errorDetails = data.details;
      // data.fatal为false 如果错误不是致命的，hls.js尝试恢复它，true 如果错误是致命的，则需要采取行动(尝试)恢复它。
      var errorFatal = data.fatal;

      if (errorFatal) {
        console.error("errorType>>>>>>>>>>>>", errorFatal);
        switch (errorDetails) {
          // @ts-ignore
          case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
            break;
          // FRAG_LOAD_ERROR 由于网络错误导致片段加载失败时引发
          // @ts-ignore
          case Hls.ErrorDetails.FRAG_LOAD_ERROR:
            console.log(
              "由于网络错误导致片段加载失败时引发",
              "errorFatal",
              errorFatal,
              "data.details",
              data.details
            );

            // muted 这是谷歌浏览器
            // @ts-ignore
            video.muted = true;
            // 下面是回复致命的网络和媒体错误的方法2  应该用来回复网络错误
            hls.swapAudioCodec();
            hls.recoverMediaError(); // 尝试恢复
            // @ts-ignore
            video.play();
            break;
          // @ts-ignore
          case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
            console.log(
              "当清单加载由于网络错误而失败时引发",
              "errorFatal",
              errorFatal,
              "data.details",
              data.details
            );

            // 下面是回复致命的网络和媒体错误的方法1  应该用来回复网络错误
            // hls.startLoad();
            // 下面是回复致命的网络和媒体错误的方法2  应该用来回复网络错误
            hls.startLoad(); // 尝试恢复
            break;
          // buffer Nudge On Stall 缓冲器触碰失速
          // buffer Stalled Error缓冲停滞错误

          // @ts-ignore
          case Hls.ErrorDetails.INTERNAL_EXCEPTION:
            console.log("hls 内部事件处理程序中发生异常时引发！", data.details);

            break;
          default:
            // 无法恢复
            console.log("无法恢复！！！！！！！！！！！！", data.details);
            hls.swapAudioCodec();
            // @ts-ignore
            video.play();
            // hls.destroy();
            break;
        }

        // 类型
        switch (data.type) {
          // @ts-ignore网络相关的错误
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.error("网络相关的错误");

            // 提示视频加载报错--网络问题
            $work_error.show();
            hls.startLoad();
            break;
          // @ts-ignore 媒体、视频相关的错误
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log("fatal media error encountered, try to recover");
            hls.recoverMediaError();
            $work_error.hide();
            break;
          default:
            console.error("类型》》》》》》cannot recover");
            // cannot recover
            $work_error.hide();
            hls.destroy();
            break;
        }

        // @ts-ignore
        hls.swapAudioCodec();
      }
    });
  }
  // 在没有启动媒体源扩展(MSE)的平台上不支持hls.js.
  // 当浏览器内没有HLS支持时(使用`canPlayType`检查), 我们可以通过`src`属性直接向视频元素提供一个HLS清单(即.m3u8 URL).
  // 这是使用内置的支持纯视频元素, without using hls.js.
  // Note: 正常的做法是等待下面的`canplay`事件，但是在Safari上(你很可能在哪里找到内置的HLS支持)视频.src URL 必须在用户驱动上。
  // 白名单前的`canplay`事件将被发出; 当URL不在白名单上时，最后一个可以可靠侦听的视频事件是`loadedmetadata`.
  // @ts-ignore
  else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    console.log("1111111111111111111111111111111111111111111111111111111");
    // @ts-ignore
    video.src = url;
    // video.addEventListener('loadedmetadata', function() {
    video.addEventListener("canplay", function () {
      // @ts-ignore
      video.play();
    });
  }
}
