'use client'

import { useState } from 'react'
import { Live2DWidget } from 'next-live2d'
import { getPluginOptions } from 'davipress/runtime/plugins'
import config from '../davipress.config'

type Live2DOptions = { models?: string[]; width?: number; height?: number }

const options = getPluginOptions(config, 'live2d') as Live2DOptions
const models = options.models?.length ? options.models : ['histoire']

export default function Live2DWidgets() {
  const [model] = useState(() => models[Math.floor(Math.random() * models.length)]!)

  return (
    <Live2DWidget
      key={model}
      modelName={model}
      position="left"
      width={options.width ?? 200}
      height={options.height ?? 300}
      showOnMobile={false}
    />
  )
}