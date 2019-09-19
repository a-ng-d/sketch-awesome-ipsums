import sketch from 'sketch'

export let
  text = require('sketch/dom').Text,
  document = sketch.getSelectedDocument(),
  selectedLayers = document.selectedLayers,
  selectedCount = selectedLayers.length,
  canvasView = context.document.contentDrawView(),
  selectedArtboard = document.selectedPage.layers[0],
  selectedPage = document.selectedPage


export function getPreference(key) {

  var pluginCache = 'com.involtag.sketch.awesome-ipsums'

  var userDefaults = NSUserDefaults.standardUserDefaults();
  return userDefaults.dictionaryForKey(pluginCache).objectForKey(key);

}

export function savePreference(key, value) {

  var pluginCache = 'com.involtag.sketch.awesome-ipsums'

  var userDefaults = NSUserDefaults.standardUserDefaults();
  if (!userDefaults.dictionaryForKey(pluginCache)) {
      var preferences = NSMutableDictionary.alloc().init();
  } else {
      var preferences = NSMutableDictionary.dictionaryWithDictionary(userDefaults.dictionaryForKey(pluginCache));
  }
  preferences.setObject_forKey(value, key);
  userDefaults.setObject_forKey(preferences, pluginCache);
  userDefaults.synchronize();

}

export function getValues(gsheet, sheet) {

  var url = 'https://spreadsheets.google.com/feeds/list/' + gsheet + '/' + sheet + '/public/values?alt=json'

  var request = NSMutableURLRequest.new()
  request.setHTTPMethod('GET')
  request.setURL(NSURL.URLWithString(url))

  var error = NSError.new()
  var responseCode = null
  var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responseCode, error)

  var dataString = NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding)

  try {
    var data = JSON.parse(dataString)
    return sortedData(data)
  } catch(e) {
    UI.alert('Your spreadsheet must be public.', 'Have you read before pasting the link? 😑')
    return null
  }

}

export function sortedData(data) {

  var values = {}
  data.feed.entry.forEach(function(entry) {
    Object.keys(entry).filter(function(key) {
      return key.indexOf('gsx$') == 0
    }).forEach(function(key) {
      var newKey = key.substring(4)
      if (!(values.hasOwnProperty(newKey))) {
        values[newKey] = []
      }

      var newValue = entry[key]['$t']
      if (newValue) {
        var ipsum = values[newKey]
        ipsum.push(newValue)
      }
    })
  })
  return values

}

export function getIpsum(datas) {

  var data, size, fcolumn, scolumn, names, ipsums, name, ipsum, duo
  data = Object.keys(datas)

  fcolumn = data[0]
  scolumn = data[1]
  names = datas[fcolumn]
  ipsums = datas[scolumn]
  size = names.length
  const randomizer = Math.floor((Math.random() * size))

  name = names[randomizer]
  ipsum = ipsums[randomizer]

  duo = []
  duo.push(name)
  duo.push(ipsum)

  return duo

}
