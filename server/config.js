const CONF = {

    serverHost:'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',

    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi

    //如下内容方访问如上注释的网址，，如下开始

    qcloudAppId: '',

    qcloudSecretId: '',

    qcloudSecretKey: '',

    //，，如下结束



    networkTimeout: 30000,

    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxf3e5b599233c3763',

    // 微信小程序 App Secret
    appSecret: 'dae43926175c3a70dc2cb80cb67c3518',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3307,
        user: 'root',
        db: 'cAuth',
        pass: '123',//连接本地mysql的root密码 当连接腾讯云时候是自己的微信小程序的appid
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'weixinmsgtoken'
}

module.exports = CONF
