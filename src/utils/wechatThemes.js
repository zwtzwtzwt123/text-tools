/**
 * 公众号主题样式定义
 * 每个主题包含名称、预览色、CSS样式对象
 */
const THEMES = {
  default: {
    name: '默认白',
    previewColor: '#ffffff',
    css: `
      .wechat-preview { 
        background: #ffffff; 
        color: #333333; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        padding: 20px; 
        line-height: 1.8; 
        font-size: 15px; 
        max-width: 100%; 
        word-wrap: break-word; 
      }
      .wechat-preview h1, .wechat-preview h2, .wechat-preview h3 { 
        font-weight: 700; 
        margin: 1.2em 0 0.6em; 
        line-height: 1.4; 
      }
      .wechat-preview h1 { font-size: 1.6em; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
      .wechat-preview h2 { font-size: 1.4em; border-bottom: 1px solid #eee; padding-bottom: 0.2em; }
      .wechat-preview h3 { font-size: 1.2em; }
      .wechat-preview p { margin: 0.8em 0; }
      .wechat-preview ul, .wechat-preview ol { padding-left: 2em; margin: 0.8em 0; }
      .wechat-preview li { margin: 0.3em 0; }
      .wechat-preview code { 
        background: #f5f5f5; 
        padding: 2px 6px; 
        border-radius: 3px; 
        font-size: 0.9em; 
        color: #d14; 
        font-family: "Courier New", monospace; 
      }
      .wechat-preview pre { 
        background: #f5f5f5; 
        padding: 15px; 
        border-radius: 6px; 
        overflow-x: auto; 
        margin: 1em 0; 
        font-size: 13px; 
        line-height: 1.6; 
      }
      .wechat-preview pre code { 
        background: none; 
        padding: 0; 
        color: #333; 
      }
      .wechat-preview blockquote { 
        border-left: 4px solid #1890ff; 
        padding: 10px 15px; 
        margin: 1em 0; 
        background: #f0f7ff; 
        color: #555; 
        font-style: italic; 
      }
      .wechat-preview a { color: #1890ff; text-decoration: none; }
      .wechat-preview img { max-width: 100%; border-radius: 4px; margin: 0.5em 0; }
      .wechat-preview table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 1em 0; 
        font-size: 14px; 
      }
      .wechat-preview th, .wechat-preview td { 
        border: 1px solid #ddd; 
        padding: 10px 12px; 
        text-align: left; 
      }
      .wechat-preview th { background: #f7f7f7; font-weight: 600; }
      .wechat-preview hr { border: none; border-top: 1px solid #eee; margin: 2em 0; }
      .wechat-preview strong { color: #222; }
    `
  },
  night: {
    name: '暗夜模式',
    previewColor: '#1a1a2e',
    css: `
      .wechat-preview { 
        background: #1a1a2e; 
        color: #e0e0e0; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        padding: 20px; 
        line-height: 1.8; 
        font-size: 15px; 
        max-width: 100%; 
        word-wrap: break-word; 
      }
      .wechat-preview h1, .wechat-preview h2, .wechat-preview h3 { 
        font-weight: 700; 
        margin: 1.2em 0 0.6em; 
        line-height: 1.4; 
        color: #ffffff; 
      }
      .wechat-preview h1 { font-size: 1.6em; border-bottom: 2px solid #333; padding-bottom: 0.3em; }
      .wechat-preview h2 { font-size: 1.4em; border-bottom: 1px solid #333; padding-bottom: 0.2em; }
      .wechat-preview h3 { font-size: 1.2em; }
      .wechat-preview p { margin: 0.8em 0; }
      .wechat-preview ul, .wechat-preview ol { padding-left: 2em; margin: 0.8em 0; }
      .wechat-preview li { margin: 0.3em 0; }
      .wechat-preview code { 
        background: #2a2a3e; 
        padding: 2px 6px; 
        border-radius: 3px; 
        font-size: 0.9em; 
        color: #ff8c00; 
        font-family: "Courier New", monospace; 
      }
      .wechat-preview pre { 
        background: #2a2a3e; 
        padding: 15px; 
        border-radius: 6px; 
        overflow-x: auto; 
        margin: 1em 0; 
        font-size: 13px; 
        line-height: 1.6; 
      }
      .wechat-preview pre code { 
        background: none; 
        padding: 0; 
        color: #e0e0e0; 
      }
      .wechat-preview blockquote { 
        border-left: 4px solid #ff8c00; 
        padding: 10px 15px; 
        margin: 1em 0; 
        background: #252535; 
        color: #bbb; 
        font-style: italic; 
      }
      .wechat-preview a { color: #ff8c00; text-decoration: none; }
      .wechat-preview img { max-width: 100%; border-radius: 4px; margin: 0.5em 0; }
      .wechat-preview table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 1em 0; 
        font-size: 14px; 
      }
      .wechat-preview th, .wechat-preview td { 
        border: 1px solid #444; 
        padding: 10px 12px; 
        text-align: left; 
      }
      .wechat-preview th { background: #2a2a3e; font-weight: 600; }
      .wechat-preview hr { border: none; border-top: 1px solid #333; margin: 2em 0; }
      .wechat-preview strong { color: #fff; }
    `
  },
  warm: {
    name: '暖色文艺',
    previewColor: '#fdf6ec',
    css: `
      .wechat-preview { 
        background: #fdf6ec; 
        color: #5a4a3a; 
        font-family: "Noto Serif SC", "STSong", "SimSun", Georgia, serif;
        padding: 20px; 
        line-height: 2; 
        font-size: 16px; 
        max-width: 100%; 
        word-wrap: break-word; 
      }
      .wechat-preview h1, .wechat-preview h2, .wechat-preview h3 { 
        font-weight: 700; 
        margin: 1.5em 0 0.8em; 
        line-height: 1.4; 
        color: #3d2b1f; 
      }
      .wechat-preview h1 { font-size: 1.6em; text-align: center; border-bottom: 2px solid #d4c5b0; padding-bottom: 0.5em; }
      .wechat-preview h2 { font-size: 1.4em; border-left: 4px solid #c9a96e; padding-left: 12px; }
      .wechat-preview h3 { font-size: 1.2em; color: #8b6914; }
      .wechat-preview p { margin: 1em 0; text-indent: 2em; }
      .wechat-preview ul, .wechat-preview ol { padding-left: 2em; margin: 0.8em 0; }
      .wechat-preview li { margin: 0.5em 0; }
      .wechat-preview code { 
        background: #f0e6d3; 
        padding: 2px 8px; 
        border-radius: 3px; 
        font-size: 0.9em; 
        color: #8b4513; 
        font-family: "Courier New", monospace; 
      }
      .wechat-preview pre { 
        background: #f5ecd7; 
        padding: 15px; 
        border-radius: 6px; 
        border: 1px solid #e8d5b7;
        overflow-x: auto; 
        margin: 1em 0; 
        font-size: 13px; 
        line-height: 1.6; 
      }
      .wechat-preview pre code { 
        background: none; 
        padding: 0; 
        color: #5a4a3a; 
      }
      .wechat-preview blockquote { 
        border-left: 4px solid #c9a96e; 
        padding: 15px 20px; 
        margin: 1.5em 0; 
        background: #faf3e6; 
        color: #6b5b4a; 
        font-style: italic; 
        border-radius: 0 6px 6px 0;
      }
      .wechat-preview a { color: #8b6914; text-decoration: underline; }
      .wechat-preview img { max-width: 100%; border-radius: 8px; margin: 1em 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      .wechat-preview table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 1em 0; 
        font-size: 14px; 
      }
      .wechat-preview th, .wechat-preview td { 
        border: 1px solid #d4c5b0; 
        padding: 10px 12px; 
        text-align: left; 
      }
      .wechat-preview th { background: #f0e6d3; font-weight: 600; }
      .wechat-preview hr { border: none; border-top: 1px dashed #d4c5b0; margin: 2em 0; }
      .wechat-preview strong { color: #3d2b1f; }
    `
  },
  business: {
    name: '商务简约',
    previewColor: '#f8fafc',
    css: `
      .wechat-preview { 
        background: #f8fafc; 
        color: #334155; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        padding: 24px; 
        line-height: 1.9; 
        font-size: 15px; 
        max-width: 100%; 
        word-wrap: break-word; 
      }
      .wechat-preview h1, .wechat-preview h2, .wechat-preview h3 { 
        font-weight: 600; 
        margin: 1.2em 0 0.6em; 
        line-height: 1.3; 
        color: #0f172a; 
      }
      .wechat-preview h1 { font-size: 1.5em; padding-bottom: 0.5em; position: relative; }
      .wechat-preview h1::after { content: ''; display: block; width: 60px; height: 3px; background: #3b82f6; margin-top: 8px; }
      .wechat-preview h2 { font-size: 1.3em; padding: 0 0 0 14px; border-left: 3px solid #3b82f6; }
      .wechat-preview h3 { font-size: 1.15em; color: #475569; }
      .wechat-preview p { margin: 0.8em 0; }
      .wechat-preview ul, .wechat-preview ol { padding-left: 1.8em; margin: 0.8em 0; }
      .wechat-preview li { margin: 0.4em 0; }
      .wechat-preview code { 
        background: #f1f5f9; 
        padding: 2px 8px; 
        border-radius: 4px; 
        font-size: 0.88em; 
        color: #dc2626; 
        font-family: "SF Mono", "Courier New", monospace; 
      }
      .wechat-preview pre { 
        background: #1e293b; 
        padding: 16px; 
        border-radius: 8px; 
        overflow-x: auto; 
        margin: 1em 0; 
        font-size: 13px; 
        line-height: 1.7; 
      }
      .wechat-preview pre code { 
        background: none; 
        padding: 0; 
        color: #e2e8f0; 
      }
      .wechat-preview blockquote { 
        border-left: 4px solid #3b82f6; 
        padding: 12px 16px; 
        margin: 1em 0; 
        background: #f0f6ff; 
        color: #475569; 
        border-radius: 0 6px 6px 0;
      }
      .wechat-preview a { color: #3b82f6; text-decoration: none; border-bottom: 1px solid transparent; }
      .wechat-preview a:hover { border-bottom-color: #3b82f6; }
      .wechat-preview img { max-width: 100%; border-radius: 6px; margin: 0.5em 0; }
      .wechat-preview table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 1em 0; 
        font-size: 14px; 
        border-radius: 8px; 
        overflow: hidden;
      }
      .wechat-preview th, .wechat-preview td { 
        border: 1px solid #e2e8f0; 
        padding: 12px 14px; 
        text-align: left; 
      }
      .wechat-preview th { background: #f1f5f9; font-weight: 600; color: #0f172a; }
      .wechat-preview hr { border: none; border-top: 1px solid #e2e8f0; margin: 2em 0; }
      .wechat-preview strong { color: #0f172a; font-weight: 600; }
    `
  },
  fresh: {
    name: '清新绿意',
    previewColor: '#f0fdf4',
    css: `
      .wechat-preview { 
        background: #f0fdf4; 
        color: #374151; 
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
        padding: 20px; 
        line-height: 1.9; 
        font-size: 15px; 
        max-width: 100%; 
        word-wrap: break-word; 
      }
      .wechat-preview h1, .wechat-preview h2, .wechat-preview h3 { 
        font-weight: 700; 
        margin: 1.2em 0 0.6em; 
        line-height: 1.3; 
        color: #065f46; 
      }
      .wechat-preview h1 { font-size: 1.6em; text-align: center; color: #059669; }
      .wechat-preview h2 { font-size: 1.3em; background: linear-gradient(to right, #d1fae5, transparent); padding: 6px 12px; border-radius: 4px; }
      .wechat-preview h3 { font-size: 1.15em; }
      .wechat-preview p { margin: 0.8em 0; }
      .wechat-preview ul, .wechat-preview ol { padding-left: 2em; margin: 0.8em 0; }
      .wechat-preview li { margin: 0.3em 0; }
      .wechat-preview li::marker { color: #10b981; }
      .wechat-preview code { 
        background: #d1fae5; 
        padding: 2px 8px; 
        border-radius: 4px; 
        font-size: 0.9em; 
        color: #065f46; 
        font-family: "Courier New", monospace; 
      }
      .wechat-preview pre { 
        background: #ecfdf5; 
        padding: 15px; 
        border-radius: 8px; 
        border: 1px solid #a7f3d0;
        overflow-x: auto; 
        margin: 1em 0; 
        font-size: 13px; 
        line-height: 1.7; 
      }
      .wechat-preview pre code { 
        background: none; 
        padding: 0; 
        color: #374151; 
      }
      .wechat-preview blockquote { 
        border-left: 4px solid #10b981; 
        padding: 12px 16px; 
        margin: 1em 0; 
        background: #ecfdf5; 
        color: #065f46; 
        border-radius: 0 6px 6px 0;
      }
      .wechat-preview a { color: #059669; text-decoration: underline; }
      .wechat-preview img { max-width: 100%; border-radius: 8px; margin: 0.5em 0; }
      .wechat-preview table { 
        border-collapse: collapse; 
        width: 100%; 
        margin: 1em 0; 
        font-size: 14px; 
      }
      .wechat-preview th, .wechat-preview td { 
        border: 1px solid #a7f3d0; 
        padding: 10px 12px; 
        text-align: left; 
      }
      .wechat-preview th { background: #d1fae5; font-weight: 600; }
      .wechat-preview hr { border: none; border-top: 1px solid #a7f3d0; margin: 2em 0; }
      .wechat-preview strong { color: #065f46; }
    `
  }
}

// 默认Markdown示例
export const DEFAULT_MARKDOWN = `# 欢迎使用文案帮 · MD转公众号

## ✨ 功能介绍

这是一款**专为自媒体人**打造的 Markdown 转换工具。

### 核心优势
- 🚀 **实时预览**：左边编写，右边即时看到公众号效果
- 🎨 **多套主题**：5套精美样式，一键切换
- 📋 **一键复制**：复制后直接粘贴到公众号编辑器，**格式完美保留**

---

## 📝 支持语法

| 语法 | 说明 |
|------|------|
| \`# 标题\` | 一级标题 |
| \`**加粗**\` | **加粗文字** |
| \`*斜体*\` | *斜体文字* |
| \`- 列表\` | 无序列表 |
| \`[链接](url)\` | [超链接](https://example.com) |

> 💡 提示：公众号不支持 Markdown，但用本工具转换后，格式可以完美保留。

---

## 🎯 使用步骤

1. 在左侧输入或粘贴 Markdown 内容
2. 选择喜欢的主题样式
3. 点击 **"复制到公众号"** 按钮
4. 打开公众号编辑器，\`Ctrl+V\` 粘贴
5. 完成！

---

> 祝你排版愉快！如有建议欢迎反馈 ✍️
`

export default THEMES