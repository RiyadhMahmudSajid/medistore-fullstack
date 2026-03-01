type Ioption = {
    limit?: number | string,
    page?: number | string,

    skip?: number | string,
    sortby?: string 
    sortOrder?: string 

}

const pagination = (option: Ioption) => {
    const page: number = Number(option.page ?? 1)
    const limit: number = Number(option.limit ?? 10)

    const skip: number = (page - 1) * limit
    const sortby: string  = option.sortby || "price"
    const sortOrder: string  = option.sortOrder || 'asc'


    return {
        page, limit, skip, sortby, sortOrder
    }


};

export default pagination;

