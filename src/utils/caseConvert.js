/**
 * 转换为驼峰命名 camelCase
 * 输入可以是空格、下划线、短横线分隔
 */
export function toCamelCase(text) {
  if (!text) return ''
  // 先统一用空格替换下划线和短横线
  const words = text.toLowerCase().split(/[\s_-]+/)
  return words
    .map((word, index) => {
      if (index === 0) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')
}

/**
 * 转换为帕斯卡命名 PascalCase
 */
export function toPascalCase(text) {
  if (!text) return ''
  const words = text.toLowerCase().split(/[\s_-]+/)
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * 转换为蛇形命名 snake_case
 */
export function toSnakeCase(text) {
  if (!text) return ''
  return text
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
    .replace(/^_/, '')
    .replace(/__+/g, '_')
}

/**
 * 转换为短横线命名 kebab-case
 */
export function toKebabCase(text) {
  if (!text) return ''
  return text
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/^-/, '')
    .replace(/--+/g, '-')
}

/**
 * 转换为常量命名 UPPER_SNAKE_CASE
 */
export function toConstantCase(text) {
  return toSnakeCase(text).toUpperCase()
}