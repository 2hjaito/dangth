'use client'

import { LocaleSwitcher } from 'davipress/runtime/i18n'
import config from '../davipress.config'

export default function LocaleSwitcherWidget() {
  return <LocaleSwitcher config={config} />
}