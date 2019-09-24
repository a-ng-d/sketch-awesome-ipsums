import sketch from 'sketch'
import {getPreference, getValues, sortedData, getIpsum} from './index'
import {text, document,selectedLayers, selectedCount, canvasView, selectedArtboard, selectedPage, pluginCache} from './index'

var ID = getPreference('spreadsheetID')

function createIpsum() {

  var datas = getValues(ID, 1)
  var awesomeIpsum = getIpsum(datas)
  var origin = canvasView.viewCenterInAbsoluteCoordinatesForViewPort(canvasView.viewPort())
  var newText = new text({
    parent: selectedPage,
    text: awesomeIpsum[1],
    name: 'New ipsum',
    style: {
      alignment: 0,
      borders: [],
    },
    frame: {
      width: 400,
    },
    fixedWidth: 2
  })

  newText.frame.x = Math.floor((origin.x) - (newText.frame.width / 2))
  newText.frame.y = Math.floor((origin.y) - (newText.frame.height / 2))

}

if(ID !== 'empty') {
  createIpsum()
} else {
  sketch.UI.alert('Synchronize first your ipsums', 'Link your Google 💩 via the Sync. menu')
}
