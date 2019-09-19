import sketch from 'sketch'
import {getPreference, savePreference} from './index'

sketch.UI.getInputFromUser(
  "Sync your awesome ipsums from your Google 💩",
  {
    description: 'Get collaborative! First publish on the Web 👉 File > Publish on the Web 👈',
    numberOfLines: 3,
    initialValue: alreadySync()
  },
  (err, value) => {
    var google = validateURL()
    if (err || value.indexOf(google) == -1) {
      return sketch.UI.alert('Houston, there\'s a problem 🙄', 'Please, try again.')
    } else {
        var ID = getID(value)
        savePreference('spreadsheetID', ID)
        sketch.UI.message('The ipsums are on the track! 🔥')
        console.log(getPreference('spreadsheetID'))
    }
  }
)

function getID(input) {

  var splitURL = input.split('/')
  var ID = splitURL[5]
  return ID

}

function alreadySync() {

  var ID = getPreference('spreadsheetID')
  var google = validateURL()
  var url = 'https://docs.google.com/spreadsheets/d/'+ ID

  if (ID = null || url.indexOf(google) == -1) {
    return
  } else {
    return url
  }

}

function validateURL() {

  var standardURL = 'https://docs.google.com/'
  var splitURL = standardURL.split('/')
  var getGoogle = splitURL[2]
  return getGoogle

}
