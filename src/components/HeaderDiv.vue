<template>
  <div>
    {{ msg }}
    <input v-model="newItems" @keyup.enter="add">
    <input v-model="newItems2">
    <ul>
      <li v-for="tod in todo" :key="tod.id">
        <h1>{{tod.text}}</h1>
      </li>
    </ul>
    <h1>{{ special }}</h1>
    <ul>
      <li :title="newItems" v-for="item in items" :key="item.id">
        <a v-if="item.is_hidden" :href="baidu">{{ reversedMessage }}</a>
        <button  @click="change(item)" :class="{hidden:item.is_hidden}">{{ item.msg }}</button>
      </li>
    </ul>
  </div>
</template>
<style>
  .hidden {
    color: coral;
  }
</style>
<script>
import LocalStorage from '../js/localStorage'
import axios from 'axios'
import _ from 'lodash'
LocalStorage.key = 'div'

export default {
  name: 'header-div',
  props: ['special', 'todo'],
  data () {
    return {
      msg: '商城后台',
      newItems: '',
      newItems2: '',
      items: LocalStorage.get(),
      baidu: 'www.baidu.com'
    }
  },
  created () {
    console.log('created 钩子可以用来在一个实例被创建之后执行代码')
  },
  computed: {
    reversedMessage () {
      return this.msg.split('').reverse().join('')
    }
  },
  watch: {
    items: {
      handler: function (items) {
        LocalStorage.set(items)
      },
      // 如果 `question` 发生改变，这个函数就会运行
      question: function (newQuestion, oldQuestion) {
        this.answer = 'Waiting for you to stop typing...'
        this.getAnswer()
      }
    },
    newItems2: function () {
      this.msg = 'Waiting for you to stop typing...'
      this.getAnswer()
    }
  },
  methods: {
    change: function (item) {
      item.msg++
      item.is_hidden = !item.is_hidden
      this.$emit('changeTitle', item.msg)
    },
    add: function () {
      if (!this.newItems) {
        alert('error')
        return false
      }
      this.items.push({
        'is_hidden': true,
        'msg': this.newItems,
        'id': this.items.length + 1
      })
      this.newItems = ''
    },
    getAnswer: _.debounce(
      function () {
        if (this.newItems2.indexOf('?') === -1) {
          this.msg = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.msg = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.msg = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.msg = 'Error! Could not reach the API. ' + error
          })
      },
      // 这是我们为判定用户停止输入等待的毫秒数
      500
    )
  }
}
</script>
