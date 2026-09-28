import DefaultTheme from 'vitepress/theme'
import './custom.css'
import AdSlot from './components/AdSlot.vue'
import ToolCard from './components/ToolCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AdSlot', AdSlot)
    app.component('ToolCard', ToolCard)
  },
}
