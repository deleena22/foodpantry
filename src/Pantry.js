import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Box, Modal } from "@mui/material";

function Pantry() {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipePopupOpen, setRecipePopupOpen] = useState(false);

  // Add Ingredient Handlers
  const handleAddOpen = () => setAddPopupOpen(true);
  const handleAddClose = () => setAddPopupOpen(false);
  const handleAddSubmit = () => {
    if (inputValue.trim()) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
    handleAddClose();
  };

  // Delete Ingredient Handlers
  const handleDeleteOpen = () => setDeletePopupOpen(true);
  const handleDeleteClose = () => setDeletePopupOpen(false);
  const handleDelete = (ingredientToDelete) => {
    setIngredients(ingredients.filter((ingredient) => ingredient !== ingredientToDelete));
    handleDeleteClose();
  };

  // Generate Recipe using Cohere API
  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      alert("Add some ingredients to generate a recipe!");
      return;
    }

    setLoading(true);
    setRecipe(""); // Clear any previous recipe

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/generate", 
        {
          model: "command-xlarge",
          //original query: `Create a recipe using most if not all of the following ingredients: ${ingredients.join(", ")}. Provide detailed steps.`, 
          prompt: `Create a recipe using the following ingredients: ${ingredients.join(", ")}. Provide detailed steps. 
          Can say no recipe possible for just these ingredients if not possible and then provide another recipe instead.`,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer f5OKOV5efzY0vIlLDJtH82TVBBbhHVFhM6mCIwls`,
            "Content-Type": "application/json",
          },
        }
      );

      const recipeText = response.data.generations[0]?.text.trim();
      setRecipe(recipeText || "No recipe generated.");
      setRecipePopupOpen(true); // Open the recipe popup modal

    } catch (error) {
      console.error("Error generating recipe:", error.response || error.message);
      alert("Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Recipe Modal Close Handler
  const handleRecipeClose = () => setRecipePopupOpen(false);

  return (
    <Box display="flex" height="100vh">
      {/* Fridge Section */}
      <Box
        flex={0.7}
        bgcolor="#E7D4AB" //old color: "#E7D4AB" #c0876c
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >

      {/* Title */}
      <Typography
      variant="h2"
      sx={{
        position: "absolute",
        top: "50%", // Center the text vertically
        left: "5%", // Adjust horizontal positioning near the fridge
        transform: "translateY(-50%) rotate(-90deg)", // Rotate without horizontal centering
        color: "#87614E",
        fontFamily: "'Sour Gummy', sans-serif",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Subtle shadow for readability
      }}
      >
        Pantry Pal
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${ingredients.length === 0 ? '/Untitled_Artwork.png' : '/filledfridge.png'})`, // Conditional background image
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        />
      </Box>

      {/* Pantry Section */}
      <Box
        flex={0.3}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        bgcolor= "#E7D4AB" //old color: "#c0876c""#E7D4AB"
        padding={2}
      >
        
        {/* Add Ingredient Button */}
        <Button
          variant="contained"
          onClick={handleAddOpen}
          style={{
            backgroundColor: "#C6E7AD",
            color: "#9FBA8B",
            marginBottom: 24,
            width: "80%",
            height: 60,
            fontSize: "1.5rem",
            fontFamily: "'Sour Gummy', sans-serif",
          }}
        >
          Add Ingredient
        </Button>

        {/* Add Ingredient Modal */}
        <Modal open={addPopupOpen} onClose={handleAddClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" style={{ fontFamily: "'Sour Gummy', sans-serif" }}>
              Add Ingredient
            </Typography>
            <TextField
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              label="Ingredient"
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                style: { fontFamily: "'Sour Gummy', sans-serif" },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSubmit}
              style={{ width: "100%", height: 50, fontFamily: "'Sour Gummy', sans-serif" }}
            >
              Submit
            </Button>
          </Box>
        </Modal>

        {/* Delete Ingredient Button */}
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteOpen}
          style={{
            backgroundColor: "#FFC9C5",
            color: "#CFA5A5",
            marginBottom: 24,
            width: "80%",
            height: 60,
            fontSize: "1.5rem",
            fontFamily: "'Sour Gummy', sans-serif",
          }}
        >
          Delete Ingredient
        </Button>

        {/* Delete Ingredient Modal */}
        <Modal open={deletePopupOpen} onClose={handleDeleteClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" style={{ fontFamily: "'Sour Gummy', sans-serif" }}>
              Delete Ingredient
            </Typography>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography style={{ fontFamily: "'Sour Gummy', sans-serif" }}>{ingredient}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(ingredient)}
                    style={{ height: 40, fontFamily: "'Sour Gummy', sans-serif" }}
                  >
                    Delete
                  </Button>
                </Box>
              ))
            ) : (
              <Typography style={{ fontFamily: "'Sour Gummy', sans-serif" }}>
                Your fridge is empty!
              </Typography>
            )}
          </Box>
        </Modal>

        {/* Generate Recipe Button */}
        <Button
          variant="contained"
          color="info"
          onClick={handleGenerateRecipe}
          style={{
            backgroundColor: "#D7E2E8",
            color: "#A2ADB3",
            width: "80%",
            height: 60,
            fontSize: "1.5rem",
            fontFamily: "'Sour Gummy', sans-serif",
          }}
        >
          {loading ? "Generating..." : "Generate Recipe"}
        </Button>

        {/* Cat GIF */}
        <Box mt={3} style={{ width: "80%", textAlign: "center" }}>
          <img
            src="https://media.giphy.com/media/wLNZM3YcdZ640bSk4j/giphy.gif"
            alt="Cat GIF"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Box>
      </Box>

      {/* Recipe Modal */}
      <Modal open={recipePopupOpen} onClose={handleRecipeClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "1000px",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" style={{ fontFamily: "'Sour Gummy', sans-serif" }}>
            Recipe
          </Typography>
          <Typography style={{ whiteSpace: "pre-wrap", fontFamily: "'Sour Gummy', sans-serif" }}>
            {recipe}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRecipeClose}
            style={{ marginTop: 20, fontFamily: "'Sour Gummy', sans-serif" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default Pantry;
