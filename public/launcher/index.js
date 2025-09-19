(function (win, doc, callback) {
  'use strict';
  callback = callback || function () {};
  function detach() {
    if (doc.addEventListener) {
      doc.removeEventListener('DOMContentLoaded', completed);
    } else {
      doc.detachEvent('onreadystatechange', completed);
    }
  }
  function completed() {
    if (doc.addEventListener || event.type === 'load' || doc.readyState === 'complete') {
      detach();
      callback(window);
    }
  }
  function init() {
    if (doc.addEventListener) {
      doc.addEventListener('DOMContentLoaded', completed);
    } else {
      doc.attachEvent('onreadystatechange', completed);
    }
  }
  init();
})(window, document, function (win) {
  (function () {
    window.DDP = window.DDP || {};
    const DDP = window.DDP;

    DDP.setting = DDP.setting || {};
    DDP.setting = {
      id:'ddp-chatbot',
      el:null,
      chatEl:null,
      isLoaded: false,
      isShow:false,
      devEndpoint:(()=>{
        try {
          const s = document.currentScript || document.getElementById('ddp-chatbot-loader');
          if(s && s.dataset && s.dataset.endpoint){
            return s.dataset.endpoint;
          }
        }catch(e){}
        return 'http://localhost:3000';
      })(),
      apiKey:null,
    };

    DDP.launcher = DDP.launcher || {};
    DDP.launcher = (() => {
      const init = () => {
        [
          setStyle,
          setLauncher,
          setReceiveMessage
        ].forEach((fnc) => {
          fnc.init();
        });
      };

      const setStyle = {
        init:() => {
          setStyle.styles();
        },
        styles:() => {
          const chatStyle = document.createElement('style');
          chatStyle.innerHTML = `
            #ddp-chatbot {
              position:fixed;
              z-dinex:9999992;
              right:60px;
              bottom:60px;
            }

            .ddp-chatbot-wrapper {
              position:relative;
            }

            .ddp-chatbot {
              --button-background: #29c363;
              --button-color: #fff;
              --button-shadow: rgba(0, 86, 161, 0.4);
              --button-shine-left: #00fd66;
              --button-shine-right: #05dcf3;
              --button-glow-start: #b000e8;
              --button-glow-end: #009ffd;

              position:absolute;
              left:50%;
              top:50%;
              width:0px;
              height:0px;
              transform:translate(-50%, -50%);
              border-radius: 9999px;
              box-shadow: 0 4px 20px var(--button-shadow);
              transition: box-shadow 0.5s ease-in-out;
              opacity:0;
              cursor:pointer;
            }

            .ddp-chatbot.open {
              animation: open ease-in-out 0.5s forwards;
              animation-delay:0.3s;
            }

            .ddp-chatbot.close {
              animation: close ease-in-out 0.3s forwards;
            }

            .ddp-chatbot:after {
              content:"";
              position:absolute;
              z-index:0;
              top:50%;
              left:50%;
              transform:translate(-50%, -50%);
              width:100%;
              height:100%;
              border-radius:99999px;
              filter:blur(4px);
              background: linear-gradient(90deg, var(--button-shine-left), var(--button-shine-right));
              opacity:0;
            }

            .ddp-chatbot:hover {
              box-shadow: 0 12px 24px var(--button-shadow);
            }

            .ddp-chatbot:hover .chatbot-icon-txt{
              opacity:0;
            }

            .ddp-chatbot:hover .chatbot-icon-bg {
              width:80%;
              height:80%;
            }

            .ddp-chatbot:hover .icon-deco-inner {
              opacity:1;
            }

            .ddp-chatbot:hover .icon-deco-inner > div {
              animation-play-state: running;
            }

            .ddp-chatbot:hover:after {
              animation: expand ease-in-out 1.5s infinite;
            }

            .ddp-chatbot .ddp-chatbot-inner {
              position:relative;
              width:100%;
              height:100%;
            }

            .ddp-chatbot .chatbot-icon {
              position:relative;
              z-index:1;
              width:100%;
              height:100%;
            }

            .ddp-chatbot .chatbot-icon .chatbot-icon-inner {
              position:relative;
              width:100%;
              height:100%;
            }

            .ddp-chatbot .chatbot-icon-deco {
              position:absolute;
              z-index:12;
              width:100%;
              height:100%;
            }

            .ddp-chatbot .icon-deco-inner {
              position:relative;
              width:100%;
              height:100%;
              opacity:0;
              transition:opacity 0.3s ease-in-out;
            }

            .icon-deco-inner > div {
              position:absolute;
              top:50%;
              left:50%;
              width:6px;
              height:6px;
              transform:translate(-50%, -50%);
              border-radius:50%;
              background:var(--button-background);
              animation:dot 1s ease-in-out infinite;
              animation-play-state: paused;
            }

            .icon-deco-inner > div:nth-child(1) {
              left:calc(50% - 10px);
              animation-delay:0.2s;
            }

            .icon-deco-inner > div:nth-child(2) {
              left:calc(50% - 1px);
               animation-delay:0.4s;
            }

            .icon-deco-inner > div:nth-child(3) {
              left:calc(50% + 8px);
               animation-delay:0.6s;
            }

            .ddp-chatbot .chatbot-icon-txt {
              position:relative;
              z-index:10;
              transition:opacity 0.3s ease-in-out;
            }

            .ddp-chatbot .chatbot-icon-bg {
              position:absolute;
              z-index:1;
              top:50%;
              left:50%;
              width:100%;
              height:100%;
              transform:translate(-50%, -50%);
              transition:width 0.3s ease-in-out, height 0.3s ease-in-out;
            }

            .ddp-chatbot .chatbot-icon img{
              display:block;
              width:100%;
              height:100%;
            }

            .ddp-chatbot .chatbot-gradient {
              position:absolute;
              z-index:0;
              top:0;
              left:0;
              width:100%;
              height:100%;
              border-radius: 9999px;
              overflow:hidden;
            }

            .ddp-chatbot .chatbot-gradient:before, .ddp-chatbot .chatbot-gradient:after {
              content: "";
              position:absolute;
              top:0;
              left:0;
              transform:translate(-50%, -50%);
            }

            .ddp-chatbot .chatbot-gradient:after {
              z-index:1;
              width:calc(100%-4px);
              height:calc(100%-4px);
              transition-property: all;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 150ms;
              transition-duration: 1000ms;
            }

            .ddp-chatbot .chatbot-gradient:before {
              z-index:0;
              top:50%;
              width:150%;
              height:150%;
              background: linear-gradient(90deg, var(--button-shine-left), var(--button-shine-right));
              animation: rotate linear 3s infinite;
              transform: scale(1.05) translateY(-50%) rotate(0deg) translateZ(0);
            }

            .ddp-chatbot:hover .chatbot-gradient:before {
               animation: rotate linear 1s infinite;
            }

            @keyframes open {
              from {
                width:0px;
                height:0px;
                opacity:0;
              }

              70% {
                width:60px;
                height:60px;
              }

              90% {
                width:50px;
                height:50px;
              }

              100% {
                width:56px;
                height:56px;
                opacity:1;
              }
            }

            @keyframes close {
              from {
                width:56px;
                height:56px;
                opacity:1;
              }

              100% {
                width:0px;
                height:0px;
                opacity:0;
              }
            }

            @keyframes rotate {
              to {
                transform: scale(1.05) translateY(-50%) rotate(360deg) translateZ(0);
              }
            }

            @keyframes dot {
              from {
                width:6px;
                height:6px;
              }

              60% {
                width:1px;
                height:1px;
              }

              to {
                width:6px;
                height:6px;
              }
            }

            @keyframes expand {
              from {
                width: 60%;
                height: 60%;
                opacity: 1;
              }
              to {
                width: 200%;
                height: 200%;
                opacity: 0;
              }
            }


            #ddp-chatbot-iframe {
              position:fixed;
              z-index:9999991;
              bottom:-640px;
              right:40px;
              width:430px;
              height:600px;
              border:none;
              border-radius:10px;
              overflow:hidden;
              background-color:#FFFFFF;
              box-shadow: 0 4px 20px rgba(0, 86, 161, 0.4);
              transition:bottom 0.3s ease-in-out;
            }

             #ddp-chatbot-iframe.show {
              bottom:40px;
              transition-delay:0.3s;
             }
          `
          document.body.appendChild(chatStyle);
        }
      }

      const setLauncher = {
        init: async () => {
          await setLauncher.getApiKey();
          try {
            const response = await fetch(`${DDP.setting.devEndpoint}/api/verify`, {
              method:'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify({
                host:window.location.href,
                key:DDP.setting.apiKey
              })
            }).then(async (res)=>{
              if(res.status === 200) {
                const data = await res.json();
                console.log(data.message);
                setLauncher.create();
                setLauncher.click();
              }else {
                console.log('verify error', res)
              }
            })
          }catch(error) {
            console.log('verify error', error)
          }
        },
        create:() => {
          const launcherEl = document.createElement("div");
          const launcherTemp = `
            <div class='ddp-chatbot-wrapper'>
              <div class='ddp-chatbot'>
                <div class='ddp-chatbot-inner'>
                  <div class='chatbot-icon'>
                    <div class='chatbot-icon-inner'>
                      <div class='chatbot-icon-deco'>
                        <div class='icon-deco-inner'>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                      <div class='chatbot-icon-txt'>
                        <img src='${DDP.setting.devEndpoint}/assets/img/chatbot-icon-02.png' />
                      </div>
                      <div class='chatbot-icon-bg'>
                        <img src='${DDP.setting.devEndpoint}/assets/img/chatbot-icon-01.png' />
                      </div>
                    </div>
                  </div>
                  <div class='chatbot-gradient'></div>
                </div>
              </div>
            </div>
          `

          launcherEl.id = DDP.setting.id;
          launcherEl.innerHTML = launcherTemp;
          document.body.appendChild(launcherEl);

          DDP.setting.el = document.querySelector('.ddp-chatbot');

          setTimeout(() => {
            DDP.setting.el.classList.add('open');
          }, 500);
        },
        getApiKey: async () => {

          const getKeyfromSrc = (url) => {
            const queryString = url.split('?')[1];
            if (!queryString) {
                return {};
            }

            const params = queryString.split('&').reduce((acc, param) => {
                const [key, value] = param.split('=');
                acc = decodeURIComponent(value);
                return acc;
            }, []);

            return params;
          }

          const scripts = document.querySelector('#ddp-chatbot-loader');
          const key = getKeyfromSrc(scripts.src);
          DDP.setting.apiKey = key;
        },
        click:() => {
          setTimeout(() => {
            DDP.setting.el.addEventListener('click', () => {
              setLauncher.open();
            });
          }, 500)
        },
        open:() => {
          DDP.setting.el.classList.remove('open');
          DDP.setting.el.classList.add('close');

          if(!DDP.setting.isLoaded) {
            setIframe.init();
            setTimeout(() => {
              setIframe.show();
            }, 200);
          }else {
            setIframe.show();
          }
        },
        close:() => {
          DDP.setting.el.classList.remove('close');
          DDP.setting.el.classList.add('open');
        }
      };

      const setIframe = {
        init:() => {
          setIframe.create();
          setIframe.sendMessageToChild();
        },
        create:() => {
          const chatEl = document.createElement('iframe');
          chatEl.id = 'ddp-chatbot-iframe';
          chatEl.src = `${DDP.setting.devEndpoint}?api=${DDP.setting.apiKey}`;
          document.body.appendChild(chatEl);
          DDP.setting.chatEl = document.querySelector('#ddp-chatbot-iframe');
          DDP.setting.isLoaded = true;
        },
        sendMessageToChild:()=>{
          const frame = document.getElementById('ddp-chatbot-iframe');
          setTimeout(()=>{
            frame.contentWindow.postMessage(DDP.setting.apiKey, DDP.setting.devEndpoint);
          }, 1000)
        },
        show:() => {
          DDP.setting.chatEl.classList.add('show');
        },
        hide:() => {
          DDP.setting.chatEl.classList.remove('show');
          setLauncher.close();
        }
      }

      const setReceiveMessage = {
        init:()=> {
          function receiveMessage(event){
            const data = JSON.stringify(event.data);
            if(!data) return;

            // TODO: Better handling...
            if(data.includes('chatbotMsg')){
              setIframe.hide();
            }
          }

          window.addEventListener("message", receiveMessage, false);
        }
      }

      return {
        init: init,
      };
    })();

    setTimeout(() => {
      // ! SetTimeout for Local Dev, Wait for render virtual DOM
      DDP.launcher.init();
    }, 500);
  })();
});
