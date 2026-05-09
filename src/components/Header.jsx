function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✍️</span>
          <h1 className="text-xl font-bold text-gray-800">文案帮</h1>
          <span className="hidden sm:inline text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
            自媒体文字工具箱
          </span>
        </div>
        <a
  href="https://wj.qq.com/s2/26614170/c064/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
>
  💬 反馈建议
</a>
      </div>
    </header>
  )
}

export default Header