import { IfoStatus } from "config/constants/types"

const getStatusValue = (status: IfoStatus) => {
  return status === 'coming_soon' ? 'Coming Soon' :
    status === 'live' ? 'Live' :
      status === 'finished' ? 'Finished' :
        ''
}
export default getStatusValue