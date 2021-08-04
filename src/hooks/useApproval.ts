import { useCallback, useState } from 'react'

export const useApproval = (onPresentApprove: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onPresentApprove])

  return { handleApprove, requestedApproval }
}

export default useApproval
