import { useState, useCallback } from 'react'
import { getTextStats } from '../utils/textStats'

const PLATFORMS = [
  { id: 'none', label: '通用', limit: null },
  { id: 'weibo', label: '微博', limit: 280, unit: '字' },
  { id: 'xiaohongshu', label: '小红书', limit: 1000, unit: '字' },
  { id: 'gzh', label: '公众号', limit: null, desc: '摘要建议2000字' },
]

function WordCounter() {
  const [text, setText] = useState('')
  const [platform, setPlatform] = useState('none')

  const stats = getTextStats(text)
  const currentPlatform = PLATFORMS.find((p) => p.id === platform)

  const handleClear = useCallback(() => {
    setText('')
  }, [])

  const handlePasteSample = useCallback(() => {
    setText(
      '欢迎使用文案帮字数统计工具！\n\n' +
        '这是一段示例文本，方便你快速体验功能。\n' +
        'The quick brown fox jumps over the lazy dog.\n\n' +
        '中英文混合排版测试：Hello你好世界123ABC。\n\n' +
        '你可以：\n' +
        '1. 直接在上方输入文字\n' +
        '2. 粘贴你的文案到输入框\n' +
        '3. 点击下方平台按钮切换字数限制提示\n\n' +
        '本工具完全在浏览器本地运行，你的文本不会上传到任何服务器。'
    )
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：输入区 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-700">📝 输入文本</h2>
          <div className="flex gap-2">
            <button
              onClick={handlePasteSample}
              className="text-xs text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
            >
              📋 示例文本
            </button>
            <button
              onClick={handleClear}
              className="text-xs text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded transition-colors"
              disabled={!text}
            >
              🗑 清空
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入或粘贴文本..."
          className="flex-1 w-full border border-gray-200 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-h-[300px]"
        />
      </div>

      {/* 右侧：统计结果 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
        <h2 className="text-base font-semibold text-gray-700 mb-3">📊 统计结果</h2>

        {/* 平台切换按钮 */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                platform === p.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* 平台限制提示 */}
        {currentPlatform?.limit && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              stats.totalChars > currentPlatform.limit
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-green-50 text-green-600 border border-green-200'
            }`}
          >
            {currentPlatform.label}限制 {currentPlatform.limit} 字 ·
            {stats.totalChars > currentPlatform.limit ? (
              <span>
                已超出 <strong>{stats.totalChars - currentPlatform.limit}</strong> 字
              </span>
            ) : (
              <span>
                剩余 <strong>{currentPlatform.limit - stats.totalChars}</strong> 字
              </span>
            )}
          </div>
        )}

        {/* 统计项 */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <StatItem label="中文字数" value={stats.chineseChars} />
          <StatItem label="英文单词数" value={stats.englishWords} />
          <StatItem label="总字符数" value={stats.totalChars} />
          <StatItem label="字节数" value={stats.byteLength} />
          <StatItem label="预估阅读时长" value={`${stats.readingTime} 分钟`} />
          <StatItem label="行数" value={stats.lineCount} />
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 text-center">
          💡 所有计算均在浏览器本地完成
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}

export default WordCounter