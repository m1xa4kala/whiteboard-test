export const useDebounce = (callback: () => void, delay: number) => {
  let timer: NodeJS.Timeout
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(callback, delay)
  }
}
