
import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
  state : {
    apiUrl:"http://localhost:8000/api",
    fileUrl:"http://localhost:8000",
    data:[],
    categoryData:[],
    SubCategoryData:[],
    ProductData:[],
    CP_ListingNumber:0,
    loding:true,
    isEmpty:false,
    isAuthentication:false,
    isLoading_cp:false
    
  },
  mutations: {

  },
  actions:{
    
  }
})



