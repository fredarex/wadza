import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { CollectionPageType } from '../../types/types'
import CollectionEdit from '../../components/_collection/edit'
import CollectionPayouts from '../../components/_collection/payouts'

const CollectionEffect = () => {
  const router = useRouter()
  const params = useMemo(() => (router.query.params) as string[] || [], [router])
  const [page, setPage] = useState<CollectionPageType>('edit')
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    const getData = async () => {
      if (params.length >= 2) {
        const _slug = params[0] as string
        const _page = params[1] as CollectionPageType

        setSlug(_slug)
        setPage(_page)
      }
    }

    getData()
    // eslint-disable-next-line
  }, [params])

  return (
    <>
      {page === 'edit' && <CollectionEdit slug={slug} />}
      {page === 'payouts' && <CollectionPayouts slug={slug} />}
    </>
  )
}

export default CollectionEffect
