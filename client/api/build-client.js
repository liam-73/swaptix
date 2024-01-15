import axios from 'axios'

const buildClient = ({ req }) => {
  const baseURL =
    typeof window === 'undefined'
      ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
      : '/'

  return axios.create({
    baseURL,
    headers: req.headers,
  })
}

export default buildClient
