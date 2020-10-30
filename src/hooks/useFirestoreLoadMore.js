import { useState, useEffect, useCallback } from 'react'
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

// From https://github.com/CSFrequency/react-firebase-hooks/issues/13
const useFirestoreLoadMore = queryFn => {
  const [query, setQuery] = useState(null)
  const [last, setLast] = useState(null)
  const [data, setData] = useState([])

  const [qData, loading, error] = useCollectionOnce(query)

  useEffect(() => {
    setData([])
    setQuery(queryFn())
  }, [queryFn])

  useEffect(() => {
    if (qData && qData.query.isEqual(query)) {
      setLast(qData.docs[qData.docs.length - 1])
      setData([...data, ...qData.docs])
    }
  }, [qData])

  const more = useCallback(() => {
    setQuery(queryFn().startAfter(last))
  }, [queryFn, setQuery, last])

  // reset everything to the beginning
  const again = () => {
    setLast(null)
    setData([])
    setQuery(queryFn())
  }

  return [[data, loading, error], more, again]
}

export default useFirestoreLoadMore
