import uuidv4 from 'uuid/v4';


/**
 * Returns unique id
 * @returns {string} uuidv4 Unique id
 */

function generate_unique_id() {

    return uuidv4();

}


export default { generate_unique_id };