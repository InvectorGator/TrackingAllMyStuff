/**
 * TODO: This is a proof-of-concept file and will be moved / replaced.
 * TODO: Separation of entity-level model and views to be sent from API to front-end.
 */


/**
 * Model of expected Location information from the database.
 */
export class LocationModel {
    id: number;
    name: string;
    parentLocationId?: number;

    constructor(id: number, name: string, parentId?: number) {
        this.id = id;
        this.name = name;
        this.parentLocationId = parentId;
    }
}

/**
 * Factory function to instantiate a Location model from provided data.
 * @param id Id of the Location.
 * @param name Identifying name of the Location.
 * @param parentId Id of the Location in which this Location is contained, if any.
 * @returns Location model containing the provided data.
 */
export function createLocationModel(id: number, name: string, parentId?: number): LocationModel {
    return new LocationModel(id, name, parentId);
}

/**
 * Factory function to instantiate an empty Location model.
 * @returns Empty Location model.
 */
export function createEmptyLocationModel(): LocationModel {
    return new LocationModel(-1, "");
}
