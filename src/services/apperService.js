const CANVAS_ID = "b136133272e94b3a99a5a910862af5b7";

export const getApperClient = () => {
  try {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient(CANVAS_ID);
  } catch (error) {
    console.error("Error initializing ApperClient:", error);
    throw new Error("Failed to initialize Apper Client");
  }
};

// Generic fetch records with pagination and filtering
export const fetchRecords = async (tableName, options = {}) => {
  try {
    const apperClient = getApperClient();
    const { fields, filters, pagingInfo, orderBy } = options;
    
    const params = {
      fields: fields || [],
      pagingInfo: pagingInfo || { limit: 100, offset: 0 },
      orderBy: orderBy || [{ field: "CreatedOn", direction: "desc" }]
    };
    
    if (filters && filters.length > 0) {
      params.filter = { logicalOperator: "and", conditions: filters };
    }
    
    const response = await apperClient.fetchRecords(tableName, params);
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${tableName} records:`, error);
    throw error;
  }
};

// Create a new record
export const createRecord = async (tableName, recordData) => {
  try {
    const apperClient = getApperClient();
    const params = { record: recordData };
    const response = await apperClient.createRecord(tableName, params);
    return response.data;
  } catch (error) {
    console.error(`Error creating ${tableName} record:`, error);
    throw error;
  }
};

// Update an existing record
export const updateRecord = async (tableName, recordId, recordData) => {
  try {
    const apperClient = getApperClient();
    const params = { record: recordData };
    const response = await apperClient.updateRecord(tableName, recordId, params);
    return response.data;
  } catch (error) {
    console.error(`Error updating ${tableName} record:`, error);
    throw error;
  }
};

// Delete a record
export const deleteRecord = async (tableName, recordId) => {
  try {
    const apperClient = getApperClient();
    const response = await apperClient.deleteRecord(tableName, recordId);
    return response.data;
  } catch (error) {
    console.error(`Error deleting ${tableName} record:`, error);
    throw error;
  }
};

// Get a single record by ID
export const getRecordById = async (tableName, recordId, fields = []) => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: fields,
      filter: {
        logicalOperator: "and",
        conditions: [{ field: "Id", operator: "eq", value: recordId }]
      }
    };
    
    const response = await apperClient.fetchRecords(tableName, params);
    return response.data && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(`Error fetching ${tableName} record by ID:`, error);
    throw error;
  }
};