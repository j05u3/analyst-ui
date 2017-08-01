import L from 'leaflet'
import config from './config'
import store from './store'
import { recenterMap, setLocation } from './store/actions/map'
import { setDate } from './store/actions/date'
import { addWaypoint } from './store/actions/route'
import { updateScene } from './store/actions/tangram'
import { setBounds } from './store/actions/viewBounds'
import { setRegionAnalysisMode, setRouteAnalysisMode } from './store/actions/app'
import { initUrlUpdate } from './app/update-url'
import { getInitialTangramScene } from './app/tangram-scene'
import { getQueryStringObject, updateURL } from './lib/url-state'

// Initialize application based on url query string params
export function initApp (queryString = window.location.search) {
  // Parse URL to get all params
  const object = getQueryStringObject(queryString)
  const date = {
    startDate: Number(object.startDate) || null,
    endDate: Number(object.endDate) || null
  }
  const mapView = {
    lat: Number(object.lat) || config.map.center[0],
    lng: Number(object.lng) || config.map.center[1],
    zoom: Number(object.zoom) || config.map.zoom
  }
  const coordinates = [mapView.lat, mapView.lng]
  const label = object.label || ''

  // If no query string, just bare URL, update URL
  if (queryString.length === 0) {
    updateURL(mapView)
  }
  // Initializing lat/lng and zoom
  store.dispatch(recenterMap(coordinates, mapView.zoom))
  // Initializing map search bar
  store.dispatch(setLocation(coordinates, label))
  // Initializing dates
  store.dispatch(setDate(date.startDate, date.endDate))

  // Initializing markers and route, or view bounds.
  // Existence of markers will override existence of bounds.
  if (object.waypoints) {
    initRoute(object.waypoints)
  } else if (object.rw && object.rs && object.re && object.rn) {
    // All bounds must be present to be valid, otherwise it's discarded.
    initBounds(object.rw, object.rs, object.re, object.rn)
  }

  // Initialize Tangram scene file
  store.dispatch(updateScene(getInitialTangramScene()))

  // Listen for updates to store, which updates the URL
  initUrlUpdate()
}

function initRoute (value) {
  // Split the string into array of latlng points
  const waypoints = value.split(',')
  for (var i = 0; i < waypoints.length; i++) {
    // Get the lat and lng for each waypoint
    const latlng = waypoints[i].split('/')
    // Initialize to leaflet latLng
    const point = L.latLng(
      Number(latlng[0]),
      Number(latlng[1])
    )
    // Add waypoint to route
    store.dispatch(addWaypoint(point))
  }
  store.dispatch(setRouteAnalysisMode())
}

function initBounds (west, south, east, north) {
  store.dispatch(setBounds({ north, south, east, west }))
  store.dispatch(setRegionAnalysisMode())
}
