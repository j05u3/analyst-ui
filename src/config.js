const config = {
  name: 'Open Traffic Analyst UI',
  mapzen: {
    apiKey: 'mapzen-YFrX5jt'
  },
  map: {
    center: [0, 120],
    zoom: 3
  },
  osmlrTileUrl: 'https://osmlr-tiles.s3.amazonaws.com/v1.1/geojson/',
  dataGeojson: 'https://s3.amazonaws.com/referencetiles-prod/coverage_map.geojson',
  historicSpeedTileUrl: 'https://speedtiles-prod.s3-accelerate.amazonaws.com/',
  nextSegmentTileUrl: 'https://speedtiles-prod.s3-accelerate.amazonaws.com/',
  refSpeedTileUrl: 'https://referencetiles-prod.s3-accelerate.amazonaws.com/',
  valhallaHost: 'routing-prod.opentraffic.io'
}

export default config
