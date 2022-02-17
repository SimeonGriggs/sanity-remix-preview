import imageUrlBuilder from '@sanity/image-url'
import {PortableText as PortableTextComponent} from '@portabletext/react'

import {config} from './config'

export const urlFor = (source) => imageUrlBuilder(config).image(source)

export function PortableText(props) {
  return <PortableTextComponent {...props} />
}
