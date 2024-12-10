const axios = require("axios");

async function testAPI() {
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate", // Cohere API endpoint for generation
      {
        model: "command-xlarge", // Use the chat-optimized model
        prompt: "Say hello!", // Your input prompt
        max_tokens: 10, // Maximum number of tokens to generate
        temperature: 0.5, // Controls randomness of the output
      },
      {
        headers: {
          "Authorization": `Bearer f5OKOV5efzY0vIlLDJtH82TVBBbhHVFhM6mCIwls`, // Replace with your Cohere API key
          "Content-Type": "application/json", // Make sure the content type is set to JSON
        },
      }
    );
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

testAPI();
