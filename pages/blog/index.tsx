import React, {useEffect, useMemo, useState} from 'react'
import { useRouter } from 'next/router'
import { BlogCategoryData } from '../../mock/BlogCategoryData'
import { IMockCategory } from '../../types/types'
import { TabItem } from '../../components/_explore_collections'
import { Swiper, SwiperSlide } from 'swiper/react'
import ArrowBtn from '../../components/buttons/ArrowBtn'
import { Navigation, Pagination } from 'swiper'
import BlogCarouselCard from '../../components/_blog/BlogCarouselCard'
import { getAllBlogs } from '../../api/blog'
import 'swiper/css'
import "swiper/css/pagination";
import moment from 'moment'

const Blog = () => {
  const router = useRouter()
  const [tab, setTab] = useState<string>('all')
  const _category = useMemo(() => router.query.category as string || '', [router])
  const [blogs, setBlogs] = useState<any[]>([])

  useEffect(() => {
    const getBlogs = async () => {
      const result = await getAllBlogs()
      if (!result?.data?.error && result?.data?.data) {
        setBlogs(result.data.data)
      } else {
        console.log(result?.data?.error)
      }
    }

    getBlogs()
  }, [])

  useEffect(() => {
    if (_category) {
      setTab(_category)
    } else {
      setTab('all')
    }
  }, [_category])

  const selectCaregory = async (_category: string) => {
    if (_category === 'all') {
      router.push({ pathname: '/blog' })
    } else {
      router.push({
        pathname: `/blog`,
        query: {
          category: _category,
        },
      })
    }
  }

  const blogDetail = (slug: string) => {
    router.push({
      pathname: `/blog/articles/${slug}`
    })
  }

  return (
    <section className='flex flex-row justify-center bg-[url(/images/blog_banner.webp)] bg-no-repeat bg-cover min-h-[100vh] mt-[77px] pb-10'>
      <div className='max-w-[1250px] w-full'>
        <div className='flex flex-row justify-around items-center h-[53px] bg-white rounded-[15px] mt-11 px-10'>
          {BlogCategoryData.length > 0 && BlogCategoryData.map((category: IMockCategory, index: number) => (
            <TabItem key={index} className='text-black' onClick={selectCaregory} selected={tab === category.value} category={category} />
          ))}
        </div>
        <div className='relative flex-col justify-start items-center max-w-[1250px] w-full'>
          {/* carousel */}
          <div className='flex justify-center items-center mt-2'>
            <div className='relative'>
              <ArrowBtn direction={`left`} className='absolute top-[43%] left-[11px] sm:left-[-30px] z-[2] custom-blog-page-swiper-prev-button' />
              <div className='max-w-[1250px] w-full'>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={4}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  className='blogSwiper'
                  navigation={{
                    prevEl: '.custom-blog-page-swiper-prev-button',
                    nextEl: '.custom-blog-page-swiper-next-button',
                  }}
                  speed={2000}
                  modules={[Navigation, Pagination]}
                  pagination={{
                    clickable: true,
                  }}
                >
                  {blogs.length > 0 && blogs.map((blog: any, index: number) => (
                    <SwiperSlide key={index}>
                      <BlogCarouselCard blog={blog} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <ArrowBtn direction={`right`} className='absolute top-[43%] right-[11px] sm:right-[-30px] z-[2] custom-blog-page-swiper-next-button' />
            </div>
          </div>
          {/* blogs */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[62px]'>
            {blogs.length > 0 && blogs.map((blog: any, index: number) => (
              <div key={index} onClick={() => blogDetail(blog?.slug || '')} className='w-full rounded-[15px] bg-white shadow-[0px_4px_19px_rgba(60,19,97,0.11)] cursor-pointer'>
                <picture>
                  <img
                    src={blog?.image}
                    alt='blog image'
                    className='w-full h-[231px] rounded-t-[15px] object-cover'
                  />
                </picture>
                <div className='flex flex-col pt-7 px-10 pb-[41px]'>
                  <div className='flex flex-row'>
                    <button className='flex flex-row justify-center items-center w-[108px] h-[26px] bg-purple-lighter rounded-[5px]'>
                      <h4 className='font-poppins-400 text-[13px] text-white leading-[98.3%]'>
                        {blog?.category?.name || ''}
                      </h4>
                    </button>
                  </div>
                  <h4 className='font-poppins-600 text-base text-purple-light leading-6 mt-4'>
                    {blog?.description || ''}
                  </h4>
                  <h4 className='font-poppins-400 text-sm text-black leading-[98.3%] mt-4'>
                    {moment(blog?.createdAt || '').format('MMMM DD, YYYY')} | {`By ${blog?.creator?.username || ''}`}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog
