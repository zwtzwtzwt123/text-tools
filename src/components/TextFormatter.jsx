import { useState, useCallback } from 'react'
import {
  addSpacing,
  toHalfWidth,
  toFullWidth,
  removeExtraBlankLines,
  addIndent,
  trimLines,
} from '../utils/formatText'

const TOOLS = [
  {
    id: 'spacing',
    label: '中英文加空格',
    icon: '🔤',
    desc: '在中文与英文/数字之间自动添加空格，提升排版美感',
    action: addSpacing,
  },
  {
    id: 'tohalf',
    label: '全角转半角',
    icon: '📐',
    desc: '将全角字母数字转为半角（如Ａ→A）',
    action: toHalfWidth,
  },
  {
    id: 'tofull',
    label: '半角转全角',
    icon: '📏',
    desc: '将半角字母数字转为全角（如A→Ａ）',
    action: toFullWidth,
  },
  {
    id: 'blanklines',
    label: '删除多余空行',
    icon: '📄',
    desc: '将连续2个以上空行合并为1个',
    action: removeExtraBlankLines,
  },
  {
    id: 'indent',
    label: '段落首行缩进',
    icon: '↘️',
    desc: '在每段开头添加两个全角空格',
    action: addIndent,
  },
  {
    id: 'trim',
    label: '删除行首尾空格',
    icon: '✂️',
    desc: '清除每一行开头和末尾的多余空格',
    action: trimLines,
  },
]

function TextFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [lastAction, setLastAction] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleApply = useCallback((toolId, actionFn) => {
    const result = actionFn(input)
    setOutput(result)
    setLastAction(toolId)
  }, [input])

  const handleCopy = useCallback(() => {
    if (!output) return
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [output])

  const handleOverride = useCallback(() => {
    setInput(output)
    setOutput('')
    setLastAction(null)
  }, [output])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：输入 + 工具按钮 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
        <h2 className="text-base font-semibold text-gray-700 mb-3">📝 输入文本</h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此输入或粘贴文本..."
          className="flex-1 w-full border border-gray-200 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-h-[200px] mb-4"
        />

        <div>
          <p className="text-xs text-gray-400 mb-2">选择处理方式：</p>
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleApply(tool.id, tool.action)}
                disabled={!input}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                  lastAction === tool.id
                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <span className="block text-sm mb-0.5">{tool.icon} {tool.label}</span>
                <span className="text-gray-400 leading-tight">{tool.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧：输出结果 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-700">✨ 处理结果</h2>
          {output && (
            <div className="flex gap-2">
              <button
                onClick={handleOverride}
                className="text-xs text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
              >
                ⬅️ 覆盖到输入框
              </button>
              <button
                onClick={handleCopy}
                className="text-xs text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded transition-colors"
              >
                {copied ? '✅ 已复制' : '📋 复制结果'}
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[200px]">
          {output ? (
            <pre className="text-sm whitespace-pre-wrap font-sans text-gray-700">{output}</pre>
          ) : (
            <p className="text-sm text-gray-400 flex items-center justify-center h-full">
              点击左侧工具按钮查看处理结果
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextFormatter