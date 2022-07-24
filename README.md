# API Docs

## How to use the Plant API:
- There are **3** methods that are implemented with this API:
    - ### **GET** on the endpoint `/plants` (returns info about the plants)
        - What it returns:  
            A JSON object containing all plant info in the database, along with a 201 HTTP status.
            ```json
            [
                {
                    "id": "a randomly generated ID from Mongo",
                    "name": "the biological name of the plant",
                    "image": "plant image from Google"
                }
                // and more of these
            ]
            ```

    - ### **GET** on the endpoint `/plant/:id` (returns info about a specific plant)
        - What it returns:  
            A JSON object containing the ID and the randomly generated JWT for an existing user, along with a secondary token and a 201 HTTP status.
            ```json
            {
                "_id": "a randomly generated ID from Mongo",
                "name": "the biological name of the plant",
                "image": "plant image from Google"
            }
            // directly from Mongo
            ```

    - ### **POST** on the endpoint `/water/:id` (sends a request to activate a water pump for a plant)
        - The plant ID should be parseable from the URL (using `req.params`).
        - What it returns:  
            A 201 HTTP status upon success.

## TODO: Things to add to the API:
- User account API