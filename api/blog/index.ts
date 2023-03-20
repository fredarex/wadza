import client from '../client'

const getToken = () => {
  const token =
    typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('@token')
      ? localStorage.getItem('@token')!
      : ''
  
  return token
}

export const getAllBlogs = () => {
  return client.get(`/blog/getAllBlogs`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export const getBlogWithSlug = (slug: string) => {
  return client.get(`/blog/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
