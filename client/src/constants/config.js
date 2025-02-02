// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title:"Loading...",
        message: "Data is being loading, please wait..."
    },
    success: {
        title:"Success",
        message: "Data is loaded successfully!"
    },
    responseFailure: {
        title:"Error",
        message: "An error occurred while fetching response from the server. Please try again!"
    },
    requestFailure: {
        title:"Error",
        message: "An error occurred while parsing request."
    },
    networkError: {
        title:"Error",
        message: "Unable to connect with the server. Please check your network connection."
    }
}

// API service calls
export const SERVICE_URLS = {
    userSignup: {url:'/signup',method:'POST'},
    userLogin: {url:'/login',method:'POST'},
}