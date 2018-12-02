import moment from 'moment'

function dateToString (date) {
  var dateSeconds = parseInt('' + parseInt(date, 10) + '000')
  if (dateSeconds) {
    return moment(dateSeconds).format('DD / MM / YYYY, HH:MM:SS')
    // return moment(dateSeconds).startOf('hour').fromNow()
  }

  return ''
}

function getNow () {
  return String(Date.now() / 1000)
}

function reverse (array) {
  return array.slice().reverse()
}

// burada siparişleri geldiği tarihlere göre sıralamak istedim tekrar bakmak gerek
function sortdate (array) {
  array.sort(function (o1, o2) {
    return o1.yeniSiparisZaman - o2.yeniSiparisZaman
  })
}

export { dateToString, reverse, sortdate, getNow }
