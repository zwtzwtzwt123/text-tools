import { useState, useCallback, useMemo } from 'react'
import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
} from '../utils/caseConvert'

const CASE_TYPES = [
  { id: 'uppercase', label: '全大写', icon: '🔠', fn: (t) => t.toUpperCase() },
  { id: 'lowercase', label: '全小写', icon: '🔡', fn: (t) => t.toLowerCase() },
  { id: 'capitalize', label: '首字母大写', icon: '📝', fn: (t) => {
    if (!t) return ''
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
  }},
  { id: 'camel', label: '驼峰命名', icon: '🐫', fn: toCamelCase },
  { id: 'pascal', label: '帕斯卡命名', icon: '📛', fn: toPascalCase },
  { id: 'snake', label: '蛇形命名', icon: '🐍', fn: toSnakeCase },
  { id: 'kebab', label: '短横线命名', icon: '🍢', fn: toKebabCase },
  { id: 'constant', label: '常量命名', icon: '🔑', fn: toConstantCase },
]

function CaseConverter() {
  const [input, setInput] = useState('')

  const results = useMemo(() => {
    if (!input || input.trim() === '') return null
    return CASE_TYPES.map((type) => ({
      ...type,
      result: type.fn(input),
    }))
  }, [input])

  const handleCopyResult = useCallback((text) => {
    navigator.clipboard.writeText(text)
  }, [])

  return (
    <div className="space-y-4">
      {/* 输入区 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h2 className="text-base font-semibold text-gray-700 mb-3">📝 输入文本</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='输入英文句子或单词，例如 "hello world" 或 "helloWorld"...'
          className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-2">
          💡 支持空格、下划线、短横线、驼峰等多种输入格式自动识别
        </p>
      </div>

      {/* 结果区 */}
      {results ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">✨ 转换结果</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.map((item) => (
              <ResultItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                value={item.result}
                onCopy={() => handleCopyResult(item.result)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 text-center text-gray-400 text-sm py-12">
          在上方输入文本，查看8种命名风格转换结果
        </div>
      )}
    </div>
  )
}

function ResultItem({ icon, label, value, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    onCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-lg flex-shrink-0">{icon}</span>
        <div className="min-w-0">
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-sm font-mono text-gray-700 truncate">{value}</div>
        </div>
      </div>
      <span className={`text-xs flex-shrink-0 ml-2 transition-opacity ${copied ? 'text-green-500' : 'text-gray-300 group-hover:text-blue-400'}`}>
        {copied ? '已复制 ✓' : '复制'}
      </span>
    </div>
  )
}

export default CaseConverter