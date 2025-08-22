# n8n博客自动化工作流环境变量配置

## 必需的环境变量

在n8n中配置以下环境变量以使工作流正常运行：

### Sanity CMS配置
```bash
# Sanity项目ID和数据集
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_TOKEN=your-sanity-token

# Sanity API URL (基于项目ID构建)
SANITY_PROJECT_URL=https://your-project-id.api.sanity.io
```

### Unsplash API配置 (用于获取配图)
```bash
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

### 邮件通知配置
```bash
# SMTP配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 获取所需凭据

### 1. Sanity CMS Token
1. 登录 [Sanity.io](https://sanity.io/)
2. 进入你的项目控制台
3. 导航到 API → Tokens
4. 创建新token，权限设置为 "Editor" 或 "Admin"
5. 复制生成的token

### 2. Unsplash Access Key
1. 注册 [Unsplash Developer](https://unsplash.com/developers)
2. 创建新应用
3. 获取 Access Key
4. 注意：免费账户每小时限制50次请求

### 3. SMTP邮件配置
对于Gmail：
1. 启用两步验证
2. 生成应用专用密码
3. 使用应用密码作为SMTP_PASSWORD

## n8n中的配置方法

### 方法1：环境变量
在n8n的 `.env` 文件中添加：
```bash
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_TOKEN=your-sanity-token
SANITY_PROJECT_URL=https://your-project-id.api.sanity.io
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
```

### 方法2：n8n变量
在n8n界面中：
1. 设置 → Variables
2. 添加每个变量
3. 工作流中使用 `{{ $vars.VARIABLE_NAME }}`

### 方法3：Credentials
在n8n界面中：
1. Credentials → Add Credential
2. 选择相应的凭据类型
3. 配置认证信息

## 安全建议

1. **不要在工作流文件中硬编码敏感信息**
2. **定期轮换API密钥**
3. **为生产环境使用只读或最小权限的token**
4. **启用n8n的安全功能（如果可用）**
5. **备份重要的配置信息**

## 测试配置

运行工作流前，确保：
1. 所有环境变量都已正确设置
2. Sanity CMS可以访问
3. Unsplash API工作正常
4. 邮件服务器连接正常