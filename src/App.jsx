import { useState } from 'react'
import Header from './components/Header'
import ToolTabs from './components/ToolTabs'
import WordCounter from './components/WordCounter'

const TABS = [
  { id: 'wordcount', label: '字数统计' },
  { id: 'format', label: '排版美化' },
  { id: 'md2wechat', label: 'MD转公众号' },
  { id: 'caseconvert', label: '大小写转换' },
  { id: 'sensitive', label: '敏感词检测' },
]

function App() {
  const [activeTab, setActiveTab] = useState('wordcount')

  const renderTool = () => {
    switch (activeTab) {
      case 'wordcount':
        return <WordCounter />
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-400 text-lg">
            🚧 该功能即将上线，敬请期待
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <ToolTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-4">
          {renderTool()}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-400 text-sm border-t border-gray-100 mt-12">
        <p>TextTools · 自媒体人文字处理工具箱 · 所有数据均在本地处理，不会上传</p>
      </footer>
    </div>
  )
}

export default App