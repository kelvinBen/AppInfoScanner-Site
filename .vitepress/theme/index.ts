import DefaultTheme from 'vitepress/theme'
import './custom.css'
import AdSlot from './components/AdSlot.vue'
import ToolCard from './components/ToolCard.vue'
import ProgramDownloads from './components/ProgramDownloads.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AdSlot', AdSlot)
    app.component('ToolCard', ToolCard)
    app.component('ProgramDownloads', ProgramDownloads)
  },
}
