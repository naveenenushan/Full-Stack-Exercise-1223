import express from 'express';
import { checkHealth } from '../controllers/healthController';
import  HealthResponse  from '../interfaces/HealthResponse';
const health = express.Router();


/**
 * @swagger
 * /health:
 *      get:
 *          summary: Send the text to the server
 *          tags:
 *              - ExampleEndpoints
 *          description: Send a message to the server and get a response added to the original text.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
health.get<{}, HealthResponse>('/health', checkHealth);

export default health;


