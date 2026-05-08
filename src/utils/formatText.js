/**
 * 中英文之间自动加空格
 * 规则：中文后跟英文/数字时加空格，英文/数字后跟中文时加空格
 */
export function addSpacing(text) {
  if (!text) return ''
  return text
    // 中文后接英文/数字 → 加空格
    .replace(/([\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef])([a-zA-Z0-9])/g, '$1 $2')
    // 英文/数字后接中文 → 加空格
    .replace(/([a-zA-Z0-9])([\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef])/g, '$1 $2')
}

/**
 * 全角符号转半角
 */
export function toHalfWidth(text) {
  if (!text) return ''
  // 全角字符范围：FF00-FFEF，偏移65248转为半角
  return text.replace(/[\uff00-\uffef]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 65248)
  })
}

/**
 * 半角符号转全角
 */
export function toFullWidth(text) {
  if (!text) return ''
  return text.replace(/[\x21-\x7e]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) + 65248)
  })
}

/**
 * 删除多余空行（将连续空行变为单个空行）
 */
export function removeExtraBlankLines(text) {
  if (!text) return ''
  return text.replace(/\n\s*\n\s*\n/g, '\n\n')
}

/**
 * 为每段添加两个全角空格缩进
 */
export function addIndent(text) {
  if (!text) return ''
  return text
    .split('\n')
    .map((line) => {
      // 如果行不为空，且不是已经缩进的
      if (line.trim() !== '' && !line.startsWith('　　')) {
        return '　　' + line.trim()
      }
      return line
    })
    .join('\n')
}

/**
 * 删除行首行尾空格
 */
export function trimLines(text) {
  if (!text) return ''
  return text
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
}