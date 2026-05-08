/**
 * 内置敏感词库
 * 包含常见营销敏感词、违规词
 * 用户可自行添加/删除（保存在localStorage）
 */

const DEFAULT_SENSITIVE_WORDS = [
  // 极限用语
  '最', '第一', '唯一', '独家', '首选', '顶级', '极致', '绝对',
  '全网首发', '全国第一', '销量第一', '排名第一', '第一品牌',
  '最好', '最佳', '最优', '最大', '最高', '最低', '最具',
  '国家级', '世界级', '最高级', '顶级', '极品', '终极',
  
  // 虚假宣传
  '永久', '万能', '特效', '神效', '100%', '百分百',
  '彻底', '完全', '根除', '永不', '绝不',
  
  // 诱导分享
  '转发', '分享到朋友圈', '集赞', '点赞', '截图',
  '不转不是中国人', '是中国人就转', '必须转',
  
  // 医疗夸张
  '治愈', '根治', '药到病除', '立竿见影', '无副作用',
  '纯天然', '祖传秘方', '一盒见效',
  
  // 金融诈骗
  '稳赚', '保本', '零风险', '高回报', '躺赚',
  '日赚', '月入过万', '年入百万', '一夜暴富',
  '内幕消息', '涨停', '翻倍',
  
  // 色情低俗
  '裸', '黄片', '色情', '成人', '激情',
  '约炮', '一夜情', '性爱',
  
  // 赌博
  '赌博', '赌场', '博彩', '彩票预测', '必中',
  '六合彩', '时时彩', '押注',
  
  // 枪支弹药
  '枪支', '弹药', '炸药', '炸弹', '雷管',
  '手枪', '步枪', '子弹',
  
  // 毒品
  '毒品', '吸毒', '大麻', '海洛因', '冰毒',
  '摇头丸', 'K粉',
  
  // 其他违规
  '翻墙', 'VPN推荐', '科学上网',
  '人肉搜索', '个人信息', '隐私泄露',
]

/**
 * 获取完整词库（内置 + 用户自定义）
 */
export function getSensitiveWords() {
  const stored = localStorage.getItem('custom_sensitive_words')
  let customWords = []
  if (stored) {
    try {
      customWords = JSON.parse(stored)
    } catch (e) {
      customWords = []
    }
  }
  return [...DEFAULT_SENSITIVE_WORDS, ...customWords]
}

/**
 * 检测文本中的敏感词
 * @param {string} text - 待检测文本
 * @returns {object} { hits: string[], count: number, html: string }
 */
export function detectSensitiveWords(text) {
  if (!text || text.trim() === '') {
    return { hits: [], count: 0, html: text }
  }

  const words = getSensitiveWords()
  const hits = []
  let resultHtml = text

  // 按词长度降序排列，避免短词误匹配（如"最"会匹配"最好"）
  const sortedWords = [...words].sort((a, b) => b.length - a.length)

  sortedWords.forEach((word) => {
    const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const matches = text.match(regex)
    
    if (matches) {
      // 去重添加到hits
      if (!hits.includes(word)) {
        hits.push(word)
      }
      
      // 高亮替换
      resultHtml = resultHtml.replace(
        regex,
        (match) => `<mark class="sensitive-highlight">${match}</mark>`
      )
    }
  })

  return {
    hits,
    count: hits.length,
    html: resultHtml,
  }
}

/**
 * 添加自定义敏感词
 * @param {string} word - 要添加的词
 */
export function addCustomWord(word) {
  if (!word || word.trim() === '') return
  
  const stored = localStorage.getItem('custom_sensitive_words')
  let customWords = []
  if (stored) {
    try {
      customWords = JSON.parse(stored)
    } catch (e) {
      customWords = []
    }
  }

  if (!customWords.includes(word.trim())) {
    customWords.push(word.trim())
    localStorage.setItem('custom_sensitive_words', JSON.stringify(customWords))
  }
}

/**
 * 删除自定义敏感词
 * @param {string} word - 要删除的词
 */
export function removeCustomWord(word) {
  const stored = localStorage.getItem('custom_sensitive_words')
  if (!stored) return
  
  let customWords = []
  try {
    customWords = JSON.parse(stored)
  } catch (e) {
    customWords = []
  }

  const index = customWords.indexOf(word)
  if (index > -1) {
    customWords.splice(index, 1)
    localStorage.setItem('custom_sensitive_words', JSON.stringify(customWords))
  }
}

/**
 * 获取仅自定义的敏感词列表
 */
export function getCustomWords() {
  const stored = localStorage.getItem('custom_sensitive_words')
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch (e) {
    return []
  }
}

export { DEFAULT_SENSITIVE_WORDS }