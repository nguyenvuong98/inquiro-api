export class BaseRepository {
  constructor(readonly model: any) {}

  async create(data = {}) {
    const response = await this.model.create(data);
    return response.toObject();
  }

  async find(query = {}) {
    return this.model.find(query);
  }

  async findOne(query = {}) {
    return this.model.findOne(query);
  }

  async updateOne(query = {}, data = {}, option = {}) {
    return this.model.updateOne(query, data, option);
  }

  async updateMany(query = {}, data = {}, option = {}) {
    return this.model.updateMany(query, data, option);
  }

  async deleteMany(query = {}) {
    return this.model.deleteMany(query);
  }

  async findPanigation(filter = {}, page = 1, pageSize = 10) {
    let pageC = page > 0 ? page : 1;
    let pageSizeC = pageSize > 0 ? pageSize : 20;
    const skip = (pageC - 1) * pageSizeC;
    console.log(skip)
  
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ _id: -1 }).skip(skip).limit(pageSizeC).exec(),
      this.model.countDocuments(filter),
    ]);
  
    return {
      data: items,
      pagination: {
        page: pageC,
        pageSize: pageSizeC,
        total,
        totalPages: Math.ceil(total / pageSizeC),
      },
    };
  }
}
