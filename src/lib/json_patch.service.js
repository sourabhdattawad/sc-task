import jsonpatch from 'jsonpatch';


/**
 * Applies json patch on json doc.
 * @param {object} mydoc JSON doc
 * @param {object} thepatch JSON patch
 * @returns {object} JSON-patch if successfull
 */

function apply_patch(mydoc, thepatch) {
    //return patched object
    return jsonpatch.apply_patch(mydoc, thepatch);
}


export default { apply_patch };