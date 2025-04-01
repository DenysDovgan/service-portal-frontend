export const useLayoutState = () => {
  return useState('layout-state', () => ({
    heading: ''
  }))
}
