
module.exports = {
	publicPath: '/teacher/',
	devServer: {
		open: true, //浏览器自动打开页面
		host: "0.0.0.0", //如果是真机测试，就使用这个IP
		port: 8081,
		https: false,
		hotOnly: false, //热更新（webpack已实现了，这里false即可）
		proxy: {
			'/api': {
				target: "http://localhost:8080/teacher",
				ws:true,
				changOrigin:true,
				pathRewrite:{
					'^/api':''
				}
			}
		}
	}
}
