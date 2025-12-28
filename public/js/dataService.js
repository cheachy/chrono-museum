// Data Service - Handles fetching era data from server or local data.js
const DataService = {
  useServerData: false, // Set to true to use server instead of data.js

  // Fetch era data (defaults to local data.js)
  fetchEraData: async function(eraKey) {
    // DEFAULT: Use local data.js first (more reliable)
    const dbSource = window.DB || (typeof DB !== 'undefined' ? DB : null);
    
    if (dbSource && dbSource[eraKey]) {
      // If useServerData is false (default), use local data
      if (!this.useServerData) {
        console.log("✅ Using LOCAL data.js for era:", eraKey);
        const localData = { id: eraKey, ...dbSource[eraKey] };
        console.log("Local data:", localData);
        return localData;
      }
    } else {
      console.error("❌ Local data not available for era:", eraKey);
    }
    
    // Only try server if useServerData is true
    if (this.useServerData) {
      console.log("🌐 Attempting to fetch from server for era:", eraKey);
      try {
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 2000)
        );
        
        // Calls http://localhost:3000/api/eras/prehistory
        const fetchPromise = fetch(`/api/eras/${eraKey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        console.log("✅ Server data loaded successfully");
        return data;
      } catch (error) {
        console.warn("⚠️ Server Error:", error.message);
        // Fallback to local DB data if server fails
        if (dbSource && dbSource[eraKey]) {
          console.log("🔄 Falling back to local data.js for era:", eraKey);
          return { id: eraKey, ...dbSource[eraKey] };
        }
      }
    }
    
    // Final fallback - return local data if available
    if (dbSource && dbSource[eraKey]) {
      console.log("✅ Using local data.js (final fallback) for era:", eraKey);
      return { id: eraKey, ...dbSource[eraKey] };
    }
    
    console.error("❌ No data available for era:", eraKey);
    return null;
  }
};

