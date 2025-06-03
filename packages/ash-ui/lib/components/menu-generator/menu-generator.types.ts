export interface IMGLink {
  label?: string
  icon?: string
  to?: string
}

export interface IMGExecuteFetch {
  label?: string
  icon?: string
  request?: string
  single: boolean
  showResponse: boolean
}

export type TMGMenuItemContent = IMGLink & IMGExecuteFetch

export interface IMGMenuItem {
  type: 'link' | 'fetch'
  content: TMGMenuItemContent
}
