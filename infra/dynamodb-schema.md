# DynamoDB Schema

## Table: Users
- userId (PK)
- email
- visitedCountries (List)
- preferences (Map)

## Table: Ratings
- ratingId (PK)
- userId
- countryId
- score
- tags
- tip

## Table: Recommendations
- userId (PK)
- recommendedCountries (List)
