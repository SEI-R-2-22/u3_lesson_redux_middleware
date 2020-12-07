import Axios from 'axios'

const Client = Axios.create({ baseURL: 'http://localhost:3001/api' })

export default Client
