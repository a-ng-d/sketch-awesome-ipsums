import sketch from 'sketch'

export let
  text = require('sketch/dom').Text,
  document = sketch.getSelectedDocument(),
  selectedLayers = document.selectedLayers,
  selectedCount = selectedLayers.length,
  canvasView = context.document.contentDrawView(),
  selectedArtboard = document.selectedPage.layers[0],
  selectedPage = document.selectedPage,
  pluginIdentifier = 'plugin.sketch.awesome-ipsums';


export function getPreference(key) {

  var userDefaults = NSUserDefaults.standardUserDefaults();
  if (!userDefaults.dictionaryForKey(pluginIdentifier)) {
    var defaultPreferences = NSMutableDictionary.alloc().init();
    defaultPreferences.setObject_forKey('empty', key);

    userDefaults.setObject_forKey(defaultPreferences, pluginIdentifier);
    userDefaults.synchronize()
  };
  return userDefaults.dictionaryForKey(pluginIdentifier).objectForKey(key) == null ? '' : userDefaults.dictionaryForKey(pluginIdentifier).objectForKey(key)

};

export function savePreference(key, value) {

  var userDefaults = NSUserDefaults.standardUserDefaults();
  if (!userDefaults.dictionaryForKey(pluginIdentifier)) {
    var preferences = NSMutableDictionary.alloc().init()
  } else {
    var preferences = NSMutableDictionary.dictionaryWithDictionary(userDefaults.dictionaryForKey(pluginIdentifier))
  };
  preferences.setObject_forKey(value, key);
  userDefaults.setObject_forKey(preferences, pluginIdentifier);
  userDefaults.synchronize();

};

export function getValues(gsheet, sheet) {

  var url = `https://opensheet.vercel.app/${gsheet}/${sheet.replace(/\s/g, '%20')}`;

  var request = NSMutableURLRequest.new();
  request.setHTTPMethod('GET');
  request.setURL(NSURL.URLWithString(url));

  var error = NSError.new();
  var responseCode = null;
  var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responseCode, error);

  var dataString = NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding);

  try {
    return JSON.parse(dataString)
  } catch(e) {
    sketch.UI.alert('Your spreadsheet must be public.', 'Have you read before pasting the link? 😑');
    return null
  };

};

export function getIpsum(datas) {

  let size, randomIpsum, name, ipsum, duo;

  size = datas.length;
  randomIpsum = datas[Math.floor((Math.random() * size))];

  name = randomIpsum[Object.keys(randomIpsum)[0]];
  ipsum = randomIpsum[Object.keys(randomIpsum)[1]];

  duo = [];
  duo.push(name);
  duo.push(ipsum);
  return duo

}
