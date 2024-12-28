const  review = require('../model/reviewmodel')




const userReviewController = {
  review: async (req, res) => {
    try {
      console.log(" create review...");

      const {  restaurantName, rating, comment } = req.body;

      console.log(req.body)
      // Validate input
      if ( !restaurantName || !rating || !comment) {
        return res.status(400).json({  message: "All fields are required." });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5." });
      }

      // Create and save the review
      const newReview = new review({
        
         restaurantName,
        rating,
        comment,
        
      });

      await newReview.save();

      res.status(201).json({ success: true, review: newReview });
    } catch (error) {
      console.error("Error uploading review:", error);
      res.status(500).json({ success: false, error: "Error uploading review." });
    }
  },
   allreview : async (req,res)=>{
      try
      {
      console.log("all review");
      const allreview = await review.find()
  
      res.status(200).json(allreview)
  
      }
     catch (error) {
        res.status(400).json({error:error.message})   
    }
 
},

 deleteReview: async(req,res)=>{
      try {
     console.log("delete review");
     
        const {id} = req.params
    console.log(id);
    
        const deleteReview = await review.findByIdAndDelete(id)
    
        res.status(200).json({
          message:"delete sucessfully "
    
          })
        
      } catch(err)
      
      {
            res.status(400).json({err:err.message })
      }
        
    

       
        
      },
       updateReview : async(req,res)=>{
      
          try {
              console.log(" updateReview");
          
           const {id} =req.params
           console.log(id);
      
           
           const {  restaurantName, rating, comment } = req.body;
      
           const updateReview = await review.findById(id)
      
           if(!updateReview){
              return res.status(404).json({ message: 'updateReview not found' });
           }
           if(restaurantName, rating, comment){
            updateReview.restaurantName=  restaurantName
            updateReview.rating=  rating
            updateReview.comment= comment 
      
      
          
          //  
      
           await updateReview.save();
      
           res.status(200).json({message:" reservation updateReview successfully"})
              
          } 
        }
          catch (error) {
              res.status(400).json({error:error.message})
          }

}
        }
      
module.exports = userReviewController;
