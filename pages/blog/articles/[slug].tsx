import React, { useMemo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getBlogWithSlug } from '../../../api/blog'
import { abbreviation } from '../../../utils/utils'
import moment from 'moment'

const BlogArticle = () => {
  const router = useRouter()
  const slug = useMemo(() => (router.query.slug as string) || '', [router])
  const [blog, setBlog] = useState<any>({})

  useEffect(() => {
    const getBlog = async () => {
      const result = await getBlogWithSlug(slug)
      if (!result?.data?.error && result?.data?.data) {
        setBlog(result.data.data)        
      } else {
        console.log(result?.data?.error)
      }
    }
    if (slug) {
      getBlog()
    }
  }, [slug])
  
  return (
    <section className='flex flex-row justify-center bg-[url(/images/blog_banner.webp)] bg-no-repeat bg-cover min-h-[100vh] mt-[77px] pb-10'>
      <div className='max-w-[1250px] w-full bg-white rounded-[15px] px-[77px] py-[65px] mt-[107px]'>
        {/* image, title, creator, category, descriptioin */}
        <div className='flex flex-row'>
          <picture className='w-[486px] mr-[45px]'>
            <img
              src={blog?.image || ''}
              alt='blog image'
              className='w-full h-[316px] rounded-[5px] object-cover'
            />
          </picture>
          <div className='flex flex-col w-[calc(100%-486px)] pt-[10px]'>
            {/* breadcrumbs */}
            <div className='inline'>
              <h4 className='inline font-poppins-400 text-sm text-purple leading-[146.8%] cursor-pointer'>
                blog &nbsp;&#62;
              </h4>
              <h4 className='inline font-poppins-400 text-sm text-purple leading-[146.8%] cursor-pointer'>
                &nbsp; {blog?.category?.name || ''} &#62;
              </h4>
              <h4 className='inline font-poppins-400 text-sm text-purple leading-[146.8%] cursor-pointer'>
                &nbsp; {blog?.title || ''}
              </h4>
            </div>
            {/* category, tags */}
            <div className='flex flex-row mt-4'>
              <button className='flex flex-row justify-center items-center w-[145px] h-[37px] bg-purple-lighter rounded-[5px]'>
                <h4 className='font-poppins-400 text-[15px] text-white leading-[98.3%]'>
                  {blog?.category?.name || ''}
                </h4>
              </button>
            </div>
            {/* title */}
            <h2 className='font-poppins-700 text-[32px] text-purple leading-[104.3%] mt-[25px]'>
              {abbreviation(blog?.title || '', 30)}
            </h2>
            {/* date, creator */}
            <h4 className='font-poppins-400 text-[15px] text-black-lighter leading-[98.3%] mt-[18px]'>
              {moment(blog?.createdAt || '').format('MMMM DD, YYYY')} | {`By ${blog?.creator?.username || ''}`}
            </h4>
            {/* description */}
            <h4 className='font-poppins-400 text-base text-black leading-[146.8%] mt-[15px]'>
              {abbreviation(blog?.description || '', 200)}
            </h4>
          </div>
        </div>
        {/* content */}
        <div className='mt-10'>
          <div dangerouslySetInnerHTML={{__html: blog?.content || '', }} />
        </div>
      </div>
    </section>
  )
}

export default BlogArticle
