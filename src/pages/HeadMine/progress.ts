export default function getProgress (currentValue: string, defaultCurrentValue: string, totalValue: string) {
  return currentValue !== defaultCurrentValue && totalValue === '0'
    ? 0
    : parseFloat(currentValue) / parseFloat(totalValue) * 100
}