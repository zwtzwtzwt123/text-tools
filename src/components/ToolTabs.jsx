function ToolTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm border border-gray-100 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default ToolTabs