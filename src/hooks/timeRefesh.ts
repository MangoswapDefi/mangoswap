import _ from 'lodash'
import { useState, useEffect } from 'react'
import { HEAD_MINE_END_TIME } from 'utils/config'
import Fresh, { FreshTimeObj } from 'utils/timeFresh'

const fresh = Fresh()
const useTimeRefesh_ = () => {
  const [time, setTime] = useState<FreshTimeObj>(null)

  useEffect(() => {
    fresh.add(
      HEAD_MINE_END_TIME,
      (v: FreshTimeObj) => {
        setTime(v)
      },
      _.identity
    )
    fresh.start()
    return () => {
      fresh.end()
    }
  }, [])

  return time
}

export default useTimeRefesh_
