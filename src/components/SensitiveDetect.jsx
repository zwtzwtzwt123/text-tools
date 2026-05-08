import { useState, useCallback } from 'react'
import {
  detectSensitiveWords,
  addCustomWord,
  removeCustomWord,
  getCustomWords,
} from '../utils/sensitiveWords'

function SensitiveDetect() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [newWord, setNewWord] = useState('')
  const [customWords, setCustomWords] = useState(getCustomWords())
  const [showCustomPanel, setShowCustomPanel] = useState(false)

  const handleDetect = useCallback(() => {
    if (!input.trim()) return
    const detectionResult = detectSensitiveWords(input)
    setResult(detectionResult)
  }, [input])

  const handleClear = () => {
    setInput('')
    setResult(null)
  }

  const handleAddWord = () => {
    if (!newWord.trim()) return
    addCustomWord(newWord.trim())
    setNewWord('')
    setCustomWords(getCustomWords())
    // 重新检测
    if (input.trim()) {
      setResult(detectSensitiveWords(input))
    }
  }

  const handleRemoveWord = (word) => {
    removeCustomWord(word)
    setCustomWords(getCustomWords())
    // 重新检测
    if (input.trim()) {
      setResult(detectSensitiveWords(input))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddWord()
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 左侧：输入区 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-700">📝 输入需要检测的文本</h2>
          <button
            onClick={handleClear}
            className="text-xs text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded transition-colors"
          >
            🗑 清空
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="在此粘贴文案，点击下方按钮检测敏感词..."
          className="flex-1 w-full border border-gray-200 rounded-lg p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent min-h-[300px] mb-4"
        />
        <button
          onClick={handleDetect}
          disabled={!input.trim()}
          className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          🔍 检测敏感词
        </button>
      </div>

      {/* 右侧：结果区 */}
      <div className="space-y-4">
        {/* 检测结果 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            📊 检测结果
            {result && (
              <span className={`ml-2 text-sm font-normal ${result.count > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {result.count > 0 ? `发现 ${result.count} 个敏感词` : '✅ 未发现敏感词'}
              </span>
            )}
          </h2>

          {result ? (
            <>
              {/* 命中的敏感词列表 */}
              {result.hits.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-2">命中敏感词：</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.hits.map((word, index) => (
                      <span
                        key={index}
                        className="inline-block px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 高亮显示文本 */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-h-[250px] overflow-y-auto">
                {result.count > 0 ? (
                  <div
                    className="text-sm leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: result.html }}
                  />
                ) : (
                  <p className="text-sm text-gray-500">未发现敏感词，文案安全 👍</p>
                )}
              </div>
              <style>{`
                .sensitive-highlight {
                  background: #ff6b6b;
                  color: white;
                  padding: 1px 3px;
                  border-radius: 2px;
                  font-weight: 500;
                }
              `}</style>
            </>
          ) : (
            <div className="text-sm text-gray-400 text-center py-12">
              在左侧输入文本，点击"检测敏感词"按钮查看结果
            </div>
          )}
        </div>

        {/* 自定义词库管理 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <button
            onClick={() => setShowCustomPanel(!showCustomPanel)}
            className="flex items-center justify-between w-full text-base font-semibold text-gray-700"
          >
            ⚙️ 自定义敏感词库
            <span className="text-sm text-gray-400">{showCustomPanel ? '收起 ▲' : '展开 ▼'}</span>
          </button>

          {showCustomPanel && (
            <div className="mt-3 space-y-3">
              {/* 添加新词 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入要添加的敏感词..."
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <button
                  onClick={handleAddWord}
                  disabled={!newWord.trim()}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  ➕ 添加
                </button>
              </div>

              {/* 已添加的自定义词 */}
              {customWords.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">已添加的自定义词（{customWords.length}个）：</p>
                  <div className="flex flex-wrap gap-1.5">
                    {customWords.map((word, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-200 rounded-full text-xs"
                      >
                        {word}
                        <button
                          onClick={() => handleRemoveWord(word)}
                          className="ml-1 text-orange-400 hover:text-orange-600 font-bold"
                          title="删除"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {customWords.length === 0 && (
                <p className="text-xs text-gray-400">暂无自定义敏感词，在上方添加</p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                💡 自定义敏感词会保存在浏览器中，不会上传到服务器
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SensitiveDetect