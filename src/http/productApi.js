import { guestInstance, authInstance } from './index'

/*
 * Создание, обновление и удаление категории, получение списка всех категорий
 */
export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category)
    return data
}

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`)
    return data
}

export const fetchCategories = async (id) => {
    const { data } = await guestInstance.get('category/getall')
    return data
}

export const fetchCategory = async (id) => {
    const { data } = await guestInstance.get(`category/getone/${id}`)
    return data
}

export const createBrand = async (brand) => {
    const { data } = await authInstance.post('brand/create', brand)
    return data
}

export const updateBrand = async (id, brand) => {
    const { data } = await authInstance.put(`brand/update/${id}`, brand)
    return data
}

export const deleteBrand = async (id) => {
    const { data } = await authInstance.delete(`brand/delete/${id}`)
    return data
}

export const fetchBrands = async () => {
    const { data } = await guestInstance.get('brand/getall')
    return data
}

export const fetchBrand = async (id) => {
    const { data } = await guestInstance.get(`brand/getone/${id}`)
    return data
}
/*
 * Создание, обновление и удаление бренда, получение списка всех брендов
 */
export const createWinery = async (winery) => {
    const { data } = await authInstance.post('winery/create', winery)
    return data
}

export const updateWinery = async (id, winery) => {
    const { data } = await authInstance.put(`winery/update/${id}`, winery)
    return data
}

export const deleteWinery = async (id) => {
    const { data } = await authInstance.delete(`winery/delete/${id}`)
    return data
}

export const fetchWineries = async () => {
    const { data } = await guestInstance.get('winery/getall')
    return data
}

export const fetchWinery = async (id) => {
    const { data } = await guestInstance.get(`winery/getone/${id}`)
    return data
}

/*
 * Создание, обновление и удаление года, получение списка всех годов
 */
export const createYear = async (year) => {
    const { data } = await authInstance.post('year/create', year)
    return data
}

export const updateYear = async (id, year) => {
    const { data } = await authInstance.put(`year/update/${id}`, year)
    return data
}

export const deleteYear = async (id) => {
    const { data } = await authInstance.delete(`year/delete/${id}`)
    return data
}

export const fetchYears = async () => {
    const { data } = await guestInstance.get('year/getall')
    return data
}

export const fetchYear = async (id) => {
    const { data } = await guestInstance.get(`year/getone/${id}`)
    return data
}

/*
 * Создание, обновление и удаление товара, получение списка всех товаров
 */
export const createProduct = async (product) => {
    const { data } = await authInstance.post('product/create', product)
    return data
}

export const updateProduct = async (id, product) => {
    const { data } = await authInstance.put(`product/update/${id}`, product)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await authInstance.delete(`product/delete/${id}`)
    return data
}

export const fetchAllProducts = async (categoryId = null, wineryId = null, yearId = null,  page = 1, limit = 450) => {
    let url = 'product/getall'
    // фильтрация товаров по категории и/или бренду
    if (categoryId) url = url + '/categoryId/' + categoryId
    if (wineryId) url = url + '/wineryId/' + wineryId
    if (yearId) url = url + '/yearId/' + yearId
    const { data } = await guestInstance.get(
        url,
        {params: { // GET-параметры для постраничной навигации
            page, limit
        }
    })
    return data
}

export const fetchPromoProducts = async (brandId = null) => {
    let url = 'product/getall'
    if (brandId) url = url + '/brandId/' + brandId
    const { data } = await guestInstance.get(
        url,
        {params: {
            brandId: {
                $gt: 0
            }
        }
    }
        )
    return data
}



export const fetchOneProduct = async (id) => {
    const { data } = await guestInstance.get(`product/getone/${id}`)
    return data
}

export const fetchSearch = async (searchTerm) => {
    const { data } = await guestInstance.get(`product/getall/searchTerm?searchTerm=${searchTerm}`);
    return data;
  };
export const fetchProdRating = async (id) => {
    const { data } = await guestInstance.get(`rating/product/${id}`)
    return data
}

/*
 * Создание, обновление и удаление характеристик товара
 */
export const createProperty = async (productId, property) => {
    const { data } = await authInstance.post(`product/${productId}/property/create`, property)
    return data
}

export const updateProperty = async (productId, id, property) => {
    const { data } = await authInstance.put(`product/${productId}/property/update/${id}`, property)
    return data
}

export const deleteProperty = async (productId, id) => {
    const { data } = await authInstance.delete(`product/${productId}/property/delete/${id}`)
    return data
}

export const createEvent = async (event) => {
    const { data } = await authInstance.post('event/create', event)
    return data
}

export const updateEvent = async (id, event) => {
    const { data } = await authInstance.put(`event/update/${id}`, event)
    return data
}

export const deleteEvent = async (id) => {
    const { data } = await authInstance.delete(`event/delete/${id}`)
    return data
}

export const fetchAllEvents = async () => {
    const { data } = await guestInstance.get('event/getall')
    return data
}

export const fetchOneEvent = async (id) => {
    const { data } = await guestInstance.get(`event/getone/${id}`)
    return data
}

export const createBanner = async (banner) => {
    const { data } = await authInstance.post('banner/create', banner)
    return data
}

export const updateBanner = async (id, banner) => {
    const { data } = await authInstance.put(`banner/update/${id}`, banner)
    return data
}
export const deleteBanner = async (id) => {
    const { data } = await authInstance.delete(`banner/delete/${id}`)
    return data
}

export const fetchAllBanners = async () => {
    const { data } = await guestInstance.get('banner/getall')
    return data
}

export const fetchOneBanner = async (id) => {
    const { data } = await guestInstance.get(`banner/getone/${id}`)
    return data
}


export const createProject = async (project) => {
    const { data } = await authInstance.post('project/create', project)
    return data
}

export const fetchAllProjects = async () => {
    const { data } = await guestInstance.get('project/getall')
    return data
}
