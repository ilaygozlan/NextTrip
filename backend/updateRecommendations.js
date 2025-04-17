exports.handler = async () => {
  // Simulate a scheduled update of user recommendations
  console.log("Running recommendation engine...");
  return { statusCode: 200, body: "Recommendations updated." };
};
