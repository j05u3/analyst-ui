import { CLEAR_BARCHART, ADD_SEGMENTS_TO_BARCHART } from '../actions'

export function clearBarchart () {
  return {
    type: CLEAR_BARCHART
  }
}

export function setBarchartData (speedsArray, diffsArray, countArray) {
  let meanSpeedArray
  let percentDiffArray
  if (countArray && diffsArray) {
    meanSpeedArray = speedsArray.map((value, index, matrix) => {
      let count = countArray.get(index)
      if (count && count > 0) {
        return (value / count)
      } else {
        return 0
      }
    })
    percentDiffArray = diffsArray.map((value, index, matrix) => {
      let count = countArray.get(index)
      if (count && count > 0) {
        return (value / count)
      } else {
        return 0
      }
    })
  } else {
    meanSpeedArray = speedsArray
    percentDiffArray = diffsArray
  }

  let hoursForCrossFilter = []
  let hoursForDiffCrossFilter = []
  meanSpeedArray.forEach((speed, index) => {
    hoursForCrossFilter.push({
      'dayOfWeek': index[0] + 1,
      'hourOfDay': index[1] + 1,
      'value': speed
    })
  })
  percentDiffArray.forEach((diff, index) => {
    hoursForDiffCrossFilter.push({
      'dayOfWeek': index[0] + 1,
      'hourOfDay': index[1] + 1,
      'value': diff
    })
  })
  return {
    type: ADD_SEGMENTS_TO_BARCHART,
    speedsBinnedByHour: hoursForCrossFilter,
    percentDiffsBinnedByHour: hoursForDiffCrossFilter
  }
}

export function setBarchartPercentDiffs (diffsArray, countArray) {
  let percentDiffArray
  if (countArray) {
    percentDiffArray = diffsArray.map((value, index, matrix) => {
      let count = countArray.get(index)
      if (count && count > 0) {
        return (value / count)
      } else {
        return 0
      }
    })
  } else {
    percentDiffArray = diffsArray
  }
  let hoursForCrossFilter = []
  percentDiffArray.forEach((percentDiff, index) => {
    hoursForCrossFilter.push({
      'dayOfWeek': index[0] + 1,
      'hourOfDay': index[1] + 1,
      'percentDiffThisHour': percentDiff
    })
  })
  return {
    type: ADD_SEGMENTS_TO_BARCHART,
    percentDiffsBinnedByHour: hoursForCrossFilter
  }
}
