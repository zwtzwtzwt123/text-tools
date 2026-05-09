import { useState, useEffect, useRef, useCallback } from 'react'
import { marked } from 'marked'
import THEMES, { DEFAULT_MARKDOWN } from '../utils/wechatThemes'

// 配置marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

const THEME_KEYS = Object.keys(THEMES)

function MdToWechat() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [activeTheme, setActiveTheme] = useState(THEME_KEYS[0])
  const [copied, setCopied] = useState(false)
  const [previewMode, setPreviewMode] = useState('split') // split | preview
  const previewRef = useRef(null)

  // 初始化示例内容
  useEffect(() => {
    setMarkdown(DEFAULT_MARKDOWN)
  }, [])

  // 渲染HTML
  const htmlContent = marked.parse(markdown)

  // 获取当前主题的CSS
  const themeCss = THEMES[activeTheme].css

  // 复制到剪贴板（保留格式）
  const handleCopy = useCallback(() => {
    if (!previewRef.current) return

    // 创建一个完整的HTML文档用于复制
    const fullHtml = `
      <div class="wechat-preview">
        ${htmlContent}
      </div>
      <style>${themeCss}</style>
    `

    // 使用Clipboard API复制富文本
    const blob = new Blob([fullHtml], { type: 'text/html' })
    const clipboardItem = new ClipboardItem({
      'text/html': blob,
      'text/plain': new Blob([previewRef.current.innerText], { type: 'text/plain' })
    })

    navigator.clipboard.write([clipboardItem]).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // 降级方案：复制纯文本
      navigator.clipboard.writeText(previewRef.current.innerText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    })
  }, [htmlContent, themeCss])

  const handleClear = () => {
    setMarkdown('')
  }

  const handleReset = () => {
    setMarkdown(DEFAULT_MARKDOWN)
    setActiveTheme(THEME_KEYS[0])
  }

  const handleInsertSample = () => {
    setMarkdown(DEFAULT_MARKDOWN)
  }

  return (
    <div className="space-y-4">
      {/* 顶部工具栏 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500 font-medium">主题：</span>
          {THEME_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTheme(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTheme === key
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-gray-300 inline-block"
                style={{ backgroundColor: THEMES[key].previewColor }}
              />
              {THEMES[key].name}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={previewMode}
            onChange={(e) => setPreviewMode(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-600"
          >
            <option value="split">分栏模式</option>
            <option value="preview">仅预览</option>
          </select>
          <button
            onClick={handleInsertSample}
            className="text-xs text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
          >
            📋 示例
          </button>
          <button
            onClick={handleClear}
            className="text-xs text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded transition-colors"
          >
            🗑 清空
          </button>
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded transition-colors"
          >
            🔄 重置
          </button>
        </div>
      </div>

      {/* 主编辑区 */}
      <div className={`grid ${previewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {/* 左侧：Markdown编辑区 */}
        {previewMode === 'split' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-700">📝 Markdown 编辑</h2>
              <span className="text-xs text-gray-400">支持标准Markdown语法</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="在此输入Markdown内容..."
              className="flex-1 w-full border border-gray-200 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-h-[450px] font-mono"
              spellCheck={false}
            />
          </div>
        )}

        {/* 右侧/全宽：预览区 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-700">👁️ 公众号预览</h2>
            <button
              onClick={handleCopy}
              className="text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 font-medium"
            >
              {copied ? '✅ 已复制' : '📋 复制到公众号'}
            </button>
          </div>

          {/* 手机框预览 */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[375px] lg:max-w-full border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
              {/* 模拟手机顶部 */}
              <div className="bg-gray-200 h-8 flex items-center justify-center border-b border-gray-300">
                <div className="w-16 h-4 bg-gray-300 rounded-full" />
              </div>
              {/* 内容区 */}
              <div
                ref={previewRef}
                className="wechat-preview min-h-[450px] max-h-[600px] overflow-y-auto"
                style={{ backgroundColor: THEMES[activeTheme].previewColor }}
              >
                <style>{themeCss}</style>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            💡 点击"复制到公众号"后，在公众号编辑器中直接粘贴即可保留格式
          </p>
        </div>
      </div>
    </div>
  )
}

export default MdToWechat