/**
 * 获取完整文本统计信息
 * @param {string} text - 输入文本
 * @returns {object} 统计结果
 */
export function getTextStats(text) {
  if (!text || text.trim() === '') {
    return {
      chineseChars: 0,
      englishWords: 0,
      totalChars: 0,
      byteLength: 0,
      readingTime: 0,
      lineCount: 0,
    }
  }

  // 中文字符数（包括中文标点）
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length

  // 英文单词数
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length

  // 总字符数（包括空格和换行）
  const totalChars = text.length

  // 字节数（UTF-8编码）
  const byteLength = new Blob([text]).size

  // 预估阅读时长（中文按200字/分钟，英文按200词/分钟）
  const readingMinutes = Math.max(1, Math.ceil((chineseChars + englishWords) / 200))
  const readingTime = readingMinutes

  // 行数
  const lineCount = text.split('\n').length

  return {
    chineseChars,
    englishWords,
    totalChars,
    byteLength,
    readingTime,
    lineCount,
  }
}