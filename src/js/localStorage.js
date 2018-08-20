export default {
  key: '',
  set (items) {
    window.localStorage.setItem(this.key, JSON.stringify(items))
  },
  get () {
    return JSON.parse(window.localStorage.getItem(this.key)) || []
  }
}
