import React from 'react'
import { ICommonProps } from '../../types/types'

interface IProps extends ICommonProps {
  blog: any
}

const BlogCard = (props: IProps) => {
  const { blog } = props
  
  return (
    <section>

    </section>
  )
}

export default BlogCard
