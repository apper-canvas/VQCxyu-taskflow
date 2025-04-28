import { getApperClient } from './apperService';

// Tracking SDK load status
let isSDKLoaded = false;
let sdkLoadPromise = null;

// Function to check if the SDK is available
export const checkSDKLoaded = () => {
  return window.ApperSDK && window.ApperSDK.ApperClient && window.ApperSDK.ApperUI;
};

// Function to load SDK and return a promise
export const loadSDK = () => {
  if (isSDKLoaded) {
    return Promise.resolve(true);
  }
  
  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }
  
  sdkLoadPromise = new Promise((resolve, reject) => {
    // Check if SDK is already loaded
    if (checkSDKLoaded()) {
      isSDKLoaded = true;
      return resolve(true);
    }
    
    // Check every 100ms for up to 10 seconds
    let attempts = 0;
    const maxAttempts = 100;
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (checkSDKLoaded()) {
        clearInterval(checkInterval);
        isSDKLoaded = true;
        resolve(true);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        reject(new Error("Apper SDK failed to load after 10 seconds"));
      }
    }, 100);
  });
  
  return sdkLoadPromise;
};

// Setup auth UI with proper SDK loading check
export const setupAuthUI = (targetId, view, onSuccess, onError) => {
  return loadSDK()
    .then(() => {
      const apperClient = getApperClient();
      const { ApperUI } = window.ApperSDK;
      
      ApperUI.setup(apperClient, {
        target: targetId,
        clientId: "b136133272e94b3a99a5a910862af5b7",
        hide: [],
        view: view,
        onSuccess: onSuccess,
        onError: onError
      });
      
      ApperUI.showLogin(targetId);
      return true;
    })
    .catch((error) => {
      console.error("Error setting up authentication:", error);
      throw error;
    });
};

// Clean up auth UI
export const cleanupAuthUI = () => {
  if (isSDKLoaded) {
    try {
      const { ApperUI } = window.ApperSDK;
      ApperUI.logout();
    } catch (error) {
      console.error("Error cleaning up auth UI:", error);
    }
  }
};

// Logout function
export const logout = () => {
  if (isSDKLoaded) {
    try {
      const { ApperUI } = window.ApperSDK;
      ApperUI.logout();
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  }
  return false;
};