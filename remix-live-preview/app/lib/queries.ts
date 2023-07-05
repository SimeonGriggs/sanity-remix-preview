export const postsQuery = `*[_type == "post" && defined(slug.current)]`

export const postQuery = `*[_type == "post" && slug.current == $slug][0]`