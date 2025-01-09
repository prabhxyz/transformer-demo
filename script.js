/* 
  This script handles the translation logic:
  1. Takes the English text input from the user.
  2. Uses the Google Translate API to translate English -> German.
  3. Uses the Google Translate API to translate German -> English.
  4. Displays the original English, German, and final English results.
*/

/* Global constant containing the Google Translate API endpoint */
const GOOGLE_TRANSLATE_ENDPOINT = "https://translation.googleapis.com/language/translate/v2";

/* This function is the main entry point for handling the translation steps. */
async function handleTranslation() {
  const englishInput = document.getElementById("inputText").value.trim();
  
  if (!englishInput) {
    alert("Please enter a sentence in English.");
    return;
  }
  
  // Display the original English sentence
  document.getElementById("englishOutput").textContent = englishInput;

  try {
    // Step 1: Translate English -> German
    const germanTranslation = await translateText(englishInput, "en", "de");
    document.getElementById("germanOutput").textContent = germanTranslation;

    // Step 2: Translate German -> English
    const englishAgainTranslation = await translateText(germanTranslation, "de", "en");
    document.getElementById("englishAgainOutput").textContent = englishAgainTranslation;
  } catch (error) {
    console.error("Translation error:", error);
    alert("An error occurred during translation. Check console for details.");
  }
}

/* 
  This helper function calls the Google Translate API.
  It sends a POST request with the text, source language, and target language.
  It returns the translated text as a Promise.
*/
async function translateText(text, sourceLang, targetLang) {
  const apiKey = "YOUR_GOOGLE_TRANSLATE_API_KEY"; // Replace with a valid API key
  const url = `${GOOGLE_TRANSLATE_ENDPOINT}?key=${apiKey}`;
  
  const requestBody = {
    q: text,
    source: sourceLang,
    target: targetLang,
    format: "text"
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const result = await response.json();
  const translatedText = result.data.translations[0].translatedText;
  return translatedText;
}

/* 
  Attaches the translation function to the "Translate" button.
  When the button is clicked, the text is translated accordingly. 
*/
window.addEventListener("DOMContentLoaded", () => {
  const translateButton = document.getElementById("translateBtn");
  translateButton.addEventListener("click", handleTranslation);
});
