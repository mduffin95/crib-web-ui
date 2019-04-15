import { cribReq } from '../utils'
import { userService } from './user'
import { Property } from '../store/properties/types'

export const propertiesService = {
  find: () => {
    const config = {
      method: 'post',
      url: '/properties/find',
      data: {
        limit: 1000,
        order_by: [
          ['firstVisibleDate', -1],
          ['price.amount', 1]
        ]
      }
    }
    return cribReq(config)
      .then(response => { return response.data })
      .catch(handle401)
  },
  toWork: (property: Property) => {
    const config = {
      method: 'get',
      url: '/properties/to_work',
      params: {
        prop_id: property.id,
        mode: 'transit'
      }
    }
    return cribReq(config)
      .then(response => { return response.data })
      .catch(handle401)
  },
  rasterMap: () => {
    const config = {
      method: 'get',
      url: '/directions/raster_map'
    }
    return cribReq(config)
      .then(response => { return response.data })
      .catch(handle401)
  },
  toWorkDurations: (colormap: string, maxDuration: number) => {
    const config = {
      method: 'get',
      url: '/directions/to_work_durations',
      params: {
        colormap: colormap,
        maxDuration: maxDuration
      }
    }
    return cribReq(config)
      .then(response => { return response.data })
      .catch(handle401)
  },
  colormaps: () => {
    const config ={
      method: 'get',
      url: '/directions/colormaps'
    }
    return cribReq(config)
      .then(response => { return response.data })
      .catch(handle401)
  }
}

function handle401 (error: any) {
  if (error.response && error.response.status === 401) {
    console.log('logout')
    userService.logout()
    location.reload(true)
  }
  return Promise.reject(error)
}
