/**
 * @swagger
 * definitions:
 *   Patch:
 *     type: object
 *     required:
 *       - json_object
 *       - json_patch
 *       - token
 *     properties:
 *       json_object:
 *         type: object
 *       json_patch:
 *         type: array
 *       token:
 *         type: string
 *   Image:
 *     type: object
 *     required:
 *       - image_url
 *       - token
 *     properties:
 *       image_url:
 *         type: string
 *       token:
 *         type: string
 *   NewUser:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 */
/**
 * @swagger
 * /user/authenticate:
 *   post:
 *     description: Returns authenticates and returns JWT 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description:  Authentication successful
 *       401:
 *         description:  Authentication failed
 * /admin/json-patch:
 *   post:
 *     description: Returns json-patch 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: patch
 *         description: Patch object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Patch'
 *     responses:
 *       200:
 *         description:  Patch status

 * /admin/create-thumbnail:
 *   post:
 *     description: Returns resized image
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Image
 *         description: Image object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Image'
 *     responses:
 *       200:
 *         description:  Resize status

 */

function swagger_config() {

    return {
        swaggerDefinition: {
            info: {
                title: 'SocialCops', // Title (required)
                version: '1.0.0', // Version (required)
            },
        },
        apis: ['./utils/swagger.js'], // Path to the API docs
    }

}

export default { swagger_config };