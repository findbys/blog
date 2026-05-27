import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import HomeHero from './components/HomeHero.vue'
import SkillSection from './components/SkillSection.vue'
import BlogList from './components/BlogList.vue'
import TechBadge from './components/TechBadge.vue'
import './styles/vars.css'
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomeHero', HomeHero)
    app.component('SkillSection', SkillSection)
    app.component('BlogList', BlogList)
    app.component('TechBadge', TechBadge)
  }
} satisfies Theme
