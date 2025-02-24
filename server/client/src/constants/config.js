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
// This is api endpoints and request methods
// need service calls {url: '/',method:'post/get/delete/patch/put', params:true/false,query:true/false}
export const SERVICE_URLS = {
    userLogin: {url:'/login',method:'POST'},
    userSignup: {url:'/signup',method:'POST'},
    uploadFile: {url:'/file/upload',method:'POST'},
    createPost: {url:'/create',method:'POST'},
    getAllPosts: {url:'/all-posts',method:'GET',params:true},
    getPostById: {url:'/show-blog',method:'GET',query:true},
    updatePost: {url:'/update-post',method:'PUT',query:true},
    deletePost: {url:'/delete-post',method:'DELETE',query:true},
    getAllComments: {url:'/all-comments',method:'GET',query:true},
    addNewComment: {url:'/new-comment',method:'POST'},
    deleteComment: {url:'/delete-comment',method:'DELETE',query:true}
}