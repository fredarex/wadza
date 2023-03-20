import React, { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  BrowseByCategory,
  CreatorLeaderboard,
  FeaturedTabs,
  Referral,
  WadzaIntroduction
} from '../components/_home'
import {
  DreamersSpotlightCarousel,
  NotableCollectionsCarousel,
  ProductsCarousel
} from '../components/carousels'
import { setReferredCode } from '../redux/features/userSlice'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const referralCode = useMemo(() => router.query.ref as string || '', [router])

  useEffect(() => {
    if (referralCode) {
      dispatch(setReferredCode(referralCode))
    }
  }, [referralCode, dispatch])

  return (
    <div>
      {/* Products list carousel */}
      <ProductsCarousel />
      
      {/* Referral program */}
      <Referral />
      
      {/* Featured tabs */}
      <FeaturedTabs />

      {/* Browse by category */}
      <BrowseByCategory />
      
      {/* Notable collections carousel */}
      <NotableCollectionsCarousel />
      
      {/* Creator leaderboard */}
      <CreatorLeaderboard />
      
      {/* Dreamer sportlight */}
      <DreamersSpotlightCarousel />
      
      {/* New to NFTs */}
      <WadzaIntroduction />
    </div>
  )
}
