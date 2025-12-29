const DataService = {
  useServerData: true, 

  fetchEraData: async function(eraKey) {    
    try {
      // Create a timeout promise (3 seconds)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 3000)
      );
      
      // Call the server
      const fetchPromise = fetch(`/api/eras/${eraKey}`);
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      console.log("Server data loaded successfully from MongoDB");
      return data;

    } catch (error) {
      console.error("Server Error:", error.message);
      return null; 
    }
  }
};