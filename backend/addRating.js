exports.handler = async (event) => {
  const { userId, countryId, rating, tags, tip } = JSON.parse(event.body);
  // Simulate saving to database (DynamoDB)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Rating submitted successfully." }),
  };
};
