import Client from './'

export const GetDepartments = async () => {
  try {
    const res = await Client.get('/departments')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetDepartmentProducts = async (id) => {
  try {
    const res = await Client.get(`/departments/${id}`)
    return res.data.Products
  } catch (error) {
    throw error
  }
}
