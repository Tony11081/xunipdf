# n8n博客自动化工作流使用指南

## 概述

这个n8n工作流可以自动从RSS源获取内容并创建博客文章到你的Sanity CMS中。工作流包含以下功能：

- 🔄 定时监控RSS源
- 📝 自动内容处理和格式化
- 🖼️ 自动获取相关配图
- 📚 创建Markdown格式博客文章
- 📧 成功/失败通知
- ⚡ 智能去重和筛选

## 安装步骤

### 1. 导入工作流

1. 打开n8n界面
2. 点击右上角的 "+" 按钮
3. 选择 "Import from file"
4. 上传 `n8n-blog-automation-workflow.json` 文件
5. 点击 "Import"

### 2. 配置环境变量

参考 `n8n-environment-variables.md` 文件配置所需的环境变量。

### 3. 自定义配置

#### 修改RSS源
在 "RSS源监控" 节点中更改URL：
```
https://feeds.feedburner.com/tech-news
```
替换为你想要监控的RSS源。

#### 调整触发频率
在 "定时触发器" 节点中修改执行频率：
- 当前设置：每6小时执行一次
- 可选项：每小时、每天、自定义cron表达式

#### 自定义内容筛选
在 "筛选新内容" 节点中调整时间范围：
- 当前设置：只处理6小时内的新内容
- 可根据需要调整时间窗口

## 工作流详解

### 节点功能说明

1. **开始** - 工作流入口点
2. **定时触发器** - 每6小时自动执行一次
3. **RSS源监控** - 获取RSS feed内容
4. **筛选新内容** - 过滤最近发布的内容
5. **内容处理** - 格式化和清理文本内容
6. **获取配图** - 从Unsplash获取相关图片
7. **处理图片** - 整合图片信息
8. **创建博客文章** - 通过Sanity API创建文章
9. **检查错误** - 错误检测和分支
10. **成功/错误通知** - 发送邮件通知

### 内容处理逻辑

工作流会自动：
- 清理HTML标签，转换为Markdown
- 生成SEO友好的URL slug
- 提取关键词和分类
- 估算阅读时间
- 设置默认情绪为"neutral"

## 自定义选项

### 1. 添加多个RSS源

复制 "RSS源监控" 节点，修改URL，然后使用 "Merge" 节点合并结果：

```json
{
  "name": "合并RSS源",
  "type": "n8n-nodes-base.merge",
  "parameters": {
    "mode": "append"
  }
}
```

### 2. 内容过滤规则

在 "内容处理" 节点中添加自定义过滤逻辑：

```javascript
// 过滤不需要的内容
if (title.includes('广告') || title.includes('推广')) {
  continue; // 跳过此条目
}

// 只处理特定分类
if (!data.categories.some(cat => ['tech', 'programming'].includes(cat))) {
  continue;
}
```

### 3. 图片来源配置

除了Unsplash，还可以配置其他图片源：

#### Pixabay API
```javascript
const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(title)}&image_type=photo&orientation=horizontal`;
```

#### 本地图片库
```javascript
// 使用预设的图片列表
const defaultImages = [
  'https://your-cdn.com/blog-image-1.jpg',
  'https://your-cdn.com/blog-image-2.jpg'
];
```

### 4. 分类映射

在 "内容处理" 节点中添加分类映射：

```javascript
const categoryMapping = {
  'technology': 'tech',
  'artificial intelligence': 'ai',
  'web development': 'webdev'
};

const mappedCategories = data.categories.map(cat => 
  categoryMapping[cat.toLowerCase()] || cat
);
```

## 监控和维护

### 查看执行历史
1. 在n8n界面中点击工作流名称
2. 查看 "Executions" 标签页
3. 检查成功/失败状态

### 常见问题排查

#### 1. RSS源无法访问
- 检查RSS URL是否有效
- 验证网络连接
- 确认RSS源是否需要认证

#### 2. Sanity API错误
- 验证API token权限
- 检查项目ID和数据集名称
- 确认Sanity schema与工作流匹配

#### 3. 图片获取失败
- 检查Unsplash API限额
- 验证API key有效性
- 考虑添加备用图片源

### 性能优化

1. **批处理** - 一次处理多篇文章
2. **去重** - 检查现有文章避免重复
3. **缓存** - 缓存图片和API响应
4. **限流** - 控制API请求频率

## 扩展功能

### 1. 社交媒体发布
添加节点自动发布到Twitter、LinkedIn等平台。

### 2. SEO优化
集成SEO检查工具，优化标题和描述。

### 3. 内容摘要
使用AI服务生成文章摘要。

### 4. 多语言支持
添加翻译服务支持多语言内容。

## 安全考虑

1. **API密钥管理** - 定期轮换密钥
2. **权限控制** - 使用最小必要权限
3. **内容审核** - 添加内容审核机制
4. **备份策略** - 定期备份配置和数据

## 故障恢复

如果工作流执行失败：

1. 检查错误日志
2. 验证所有环境变量
3. 测试各个API连接
4. 手动运行工作流进行调试

## 更新和维护

- 定期更新n8n版本
- 监控API变更和限制
- 优化工作流性能
- 备份工作流配置

## 支持

如果遇到问题：
1. 查看n8n官方文档
2. 检查Sanity CMS文档
3. 访问相关API服务文档
4. 在项目repo中创建issue