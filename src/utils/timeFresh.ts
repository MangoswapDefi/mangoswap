type init = (endDateVal: number, cb: (v: FreshTimeObj) => void, setReVal: setReVal) => void
type start = () => void
interface FreshTimeValue {
  d: number;
  h: number;
  m: number;
  s: number;
}
type setReVal = (time: FreshTimeValue) => string
export interface FreshTimeObj {
  state: boolean;
  val: FreshTimeValue
}
const Fresh = (callBacks = []) => {
  let len: number
  let sh:  NodeJS.Timeout
  const _fresh = (
    endtime: number,
    cb: (res: FreshTimeObj) => void,
    setReVal: setReVal,
    dateIndex: number,
  ) => {
    // start end date
    const date = +new Date()
    const leftsecond = parseInt(((endtime - date) / 1000).toString())
      // funcs
    const isStop = Boolean(leftsecond > 0)
    const result = state => val => ({ state, val })
    // vars
    let dataObj: FreshTimeValue = { d: 0, h: 0, m: 0, s: 0, }

    // default result val format
    if (!setReVal)
      setReVal = ({ d, h, m, s }) => `${d}d${h}h${m}m${s}s`
    //  computed date
    dataObj = {
      d: parseInt((leftsecond / 3600 / 24).toString()),
      h: parseInt(((leftsecond / 3600) % 24).toString()),
      m: parseInt(((leftsecond / 60) % 60).toString()),
      s: parseInt((leftsecond % 60).toString()),
    }
    // set result
    const re: FreshTimeObj = isStop
      ? result(true)
        (setReVal(dataObj))
      : result(false)
        ("end")
    // stop
    if (!isStop) {
      callBacks.splice(dateIndex, 1)
    }
    // cb
    cb(re)
  }

  // export
  const init: init = (endDateVal, cb, setReVal) => {
    callBacks.push([endDateVal, cb, setReVal])
  }

  // export
  const start: start = () => {
    const palyInterval = () => {
      if (callBacks.length === 0) {
        clearInterval(sh)
        return
      }
      callBacks.forEach((params, index) => {
        params[len || params.length] = index
        // @ts-ignore
        _fresh(...params)
      })
    }
    palyInterval()
    // definition Interval
    sh = setInterval(palyInterval, 1000)
  }
  const end = () => {
    clearInterval(sh)
  }
  return {
    add: init,
    start,
    end
  }
}


export default Fresh