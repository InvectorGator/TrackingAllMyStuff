
/**
 * Extracts a collection of allowed query parameters from a model representing a database entity.
 * @param createDBModel Factory method for instantiating a new DBModel.
 * @returns Array of parameters derived from the provided DBModel.
 */
export function codeToQueryParams<DBModel>(createDBModel: () => DBModel) {
    let instanceOfModel = createDBModel();
    
    let paramList = [];

    for (let key in instanceOfModel) {
        paramList.push(key);
    }

    return paramList;
}

export default codeToQueryParams 