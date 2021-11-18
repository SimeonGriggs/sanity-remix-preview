const localUrl = `http://localhost:3000`
const remoteUrl = `https://your-deployed-website.com`
const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl

export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current

  if (!slug) {
    throw new Error(`Document has no slug, cannot preview`)
  }

  const url = new URL(baseUrl)
  url.pathname = slug
  url.searchParams.set(`preview`, `asdf-1234`)

  return url.toString()
}
