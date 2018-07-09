const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: process.env.appId,

    // 微信小程序 App Secret
    appSecret: process.env.appSecret,

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    /**
     * faceid API参数配置
     *
     */
    // 测试
    // api_key: '2tBVbFksTRHg9H-Iov9tTMmj8xV8bsCa',
    // api_secret: 'FITDFow26yMWJICtj-pj5l2zhJFHCKJB',
    api_key: process.env.TFD_APP_MP_SERVER_API_KEY,
    api_secret: process.env.TFD_APP_MP_SERVER_API_SECRET,
    biz_no: Math.random().toString(32),
    token_random_number: '',
    token_video: '',
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'tfd-app-mp-server-dev-db',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '',
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
    wxMessageToken: 'abcdefgh'
};

module.exports = CONF;
