import sketch from 'sketch';
import {getPreference, savePreference, pluginCache} from './index';
    } else {
export default function syncIpsum() {
  sketch.UI.getInputFromUser(
    "Sync. your awesome ipsums from your Google spreadsheet (1/2)",
    {
      description: 'First publish on the Web (File > Publish on the Web), then copy the URL and paste it below 👇',
      numberOfLines: 3,
      initialValue: alreadySync()
    },
    (err, value) => {
      var google = validateURL();
      if (err || value.indexOf(google) == -1) {
        return sketch.UI.alert('Houston, there\'s a problem 😓', 'Please, try again.')
      } else {
        var ID = getID(value);
        savePreference('spreadsheetID', ID);
        sketch.UI.getInputFromUser(
          "Sync. your awesome ipsums from your Google spreadsheet (2/2)",
          {
            description: 'Type the name of the ipsums sheet (⚠️ case sensitive)',
            numberOfLines: 1,
            initialValue: getPreference('sheetName')
          },
          (err, value) => {
            if (err) {
              return sketch.UI.alert('Houston, there\'s a problem 😓', 'Please, try again.')
            } else {
              savePreference('sheetName', value);
              sketch.UI.message('The ipsums are on the track! 🔥')
            }
          }
        )
      }
    }
  )
}

function getID(input) {

  var splitURL = input.split('/');
  var ID = splitURL[5];
  return ID

};

function alreadySync() {

  var ID = getPreference('spreadsheetID');
  var google = validateURL();
  var url = 'https://docs.google.com/spreadsheets/d/'+ ID;

  if (ID == 'empty' || url.indexOf(google) == -1) {
    return
  } else {
    return url
  }

}

function validateURL() {

  var standardURL = 'https://docs.google.com/';
  var splitURL = standardURL.split('/');
  var getGoogle = splitURL[2];
  return getGoogle

}
