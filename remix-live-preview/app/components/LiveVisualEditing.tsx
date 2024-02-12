import { VisualEditing } from '@sanity/visual-editing/remix'

import { client } from "~/sanity/client";
import { useLiveMode } from '~/sanity/loader';

export default function LiveVisualEditing() {
  useLiveMode({ client })

  return <VisualEditing />
}