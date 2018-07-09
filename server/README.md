# 开发注意事项

## 环境变量

1. 将 `run.dist.sh` 复制为 `run.sh`
1. 在 `run.sh` 中填入相应的敏感信息
1. `./run.sh app.js` 运行服务器
1. `config.js` 会从环境变量中读取敏感信息配置
