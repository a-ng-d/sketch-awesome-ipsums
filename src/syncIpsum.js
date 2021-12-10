import sketch from 'sketch';
import {getPreference, savePreference, pluginCache} from './index';
    } else {
export default function syncIpsum() {
  sketch.UI.getInputFromUser(
    "Sync. your awesome ipsums from your Google spreadsheet (1/2)",
    {
      description: 'First publish on the Web (File > Publish on the Web), then copy the URL and paste it below 👇',
      numberOfLines: 3,
      initialValue: getPreference('spreadsheetID') == null ? '' : `https://docs.google.com/spreadsheets/d/${getPreference('spreadsheetID')}`
    },
    (err, value) => {
      if (err) {
        return
      } else if (value.indexOf('https://docs.google.com') == -1 || value == undefined) {
        return sketch.UI.alert('Watch your URL!', 'Copy and paste the Google spreadsheet URL from your browser bar')
      } else {
        var ID = getID(value);
        savePreference('spreadsheetID', ID);
        sketch.UI.getInputFromUser(
          "Sync. your awesome ipsums from your Google spreadsheet (2/2)",
          {
            description: 'Type the name of the ipsums sheet (⚠️ case sensitive)',
            numberOfLines: 1,
            initialValue: getPreference('sheetName') == null ? '' : getPreference('sheetName')
          },
          (err, value) => {
            if (err) {
              return
            } else if (value == undefined) {
              return sketch.UI.alert('Cannot be empty!', 'Copy and paste the name of the sheet')
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

}
