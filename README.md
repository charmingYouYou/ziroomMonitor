# ziroomMonitor
自如待释放房源监控-微信Server酱通知

使用方法
1. 按需配置config.js文件里的内容
2. 执行如下命令
```javascript
    npm i
    node index.js
```

tips: linux下运行chrome需安装相关依赖库
```javascript
    #依赖库
    yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

    #字体
    yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
