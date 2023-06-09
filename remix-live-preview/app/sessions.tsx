// ./app/sessions.tsx

import {createCookieSessionStorage} from '@remix-run/node'

const {getSession, commitSession, destroySession} = createCookieSessionStorage({
  cookie: {
    name: '__session',
    sameSite: 'lax',
    secrets: ["s3cret1"],
  },
})

export {getSession, commitSession, destroySession}