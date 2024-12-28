const app = require('../app')
const reservation = require('../model/Reservationmodel')
const restaurant = require("../model/restaurantmodel")

const reservationcontroller ={
   
    reservationCreate : async(req,res)=>{
      try {
        
        
      // console.log("welcome to reservation");
      
      const {bookingDate,bookingTime,partySize,
        } =req.body
   

   if( !bookingDate || !bookingTime ||!partySize){
     res.status(400).json({message :"reservation not successfully"})
   }


   const newReservation =new reservation({
       bookingDate,bookingTime,partySize,   restaurantName,location,tableNumber
   })
   console.log(
       newReservation);
   
   await  newReservation.save()
   res.status(200).json({message:"reservation successfully"})
      } catch (error) {
        res.status(400).json({error:error.message})
      }

},

 checkAvailability : async (req,res) => {


    try {
    const {id} = req.params
    console.log(id);
    

      
    console.log("welcome to reservation page");
     const { bookingDate,bookingTime, partySize} = req.body


       // Parse and validate booking date
    const currentDate = new Date().setHours(0, 0, 0, 0); // Today's date with time set to 00:00
    const parsedBookingDate = new Date(bookingDate);

    if (parsedBookingDate < currentDate) {
      return res.status(400).json({ message: "Cannot book a table for a past date." });
    }
    

        const restaurants = await restaurant.findById(id);
        // console.log("restaurantName:", restaurantName);
        console.log("restaurants:", restaurants);

      
        if( !restaurants   ){
            return  res.status(400).json({message: "Restaurant not found"  })
        }

        const availableTable = await restaurants.tables.find(
          (table) => table.status === "available" && table.capacity >= partySize
         
        );

        console.log(availableTable);
        
  
    
        if (!availableTable) {
          return res.status(400).json({ error: "No available tables for the party size" });
        }
        

        availableTable.status = "reserved";
        // availableTable.reservedBy = userId; // Optionally store userId
    availableTable.bookingDate = bookingDate;
    availableTable.bookingTime = bookingTime;

    const newReservation = await new reservation({
      restaurantName: restaurants.restaurantName,
      bookingDate,bookingTime,partySize
  })
  console.log(
      newReservation);
      
  
  await  newReservation.save()

    await restaurants.save();

    req.io.emit("tableUpbookingDate", { tableId: availableTable._id, status: "reserved", bookingDate,
      bookingTime, });

    // Respond with success
     res.status(200).json({
      message: "Table reserved successfully",
      table: availableTable,
    });

       



       

       
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }




  },

  
  allreservation : async (req,res)=>{
    try
    {
    console.log("all reservation");
    const allreservationdata = await reservation.find()

    res.status(200).json( allreservationdata)

    }
   catch (error) {
      res.status(400).json({error:error.message})   
  }
  },
 


  updateReservation : async(req,res)=>{

    try {
        console.log("upbookingDate");
    
     const {id} =req.params
     console.log(id);

     
     const {bookingDate,bookingTime,partySize}=req.body

     const upbookingDateReservation = await reservation.findById(id)

     if(!upbookingDateReservation){
        return res.status(404).json({ message: 'Reservation not found' });
     }
     if(bookingDate,bookingTime,partySize){
        upbookingDateReservation.bookingDate=  bookingDate
        upbookingDateReservation.bookingTime= await bookingTime
     upbookingDateReservation.partySize=  await partySize
     }


    
    //  

     await upbookingDateReservation.save();

     res.status(200).json({message:" reservation upbookingDate successfully"})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
},
    deleteReservation :async (req,res)=>{
       try {
        console.log("delete");

        const {id}= req.params

        console.log(id);
        
         const deleteReservation = await reservation.findByIdAndDelete(id)

         if(!deleteReservation){
            res.status(400).json({message:"reservation not found"})
         }
    
         res.status(200).json({message:"reservation delete successfully"})
    
       } catch (error) {
        
        res.status(400).json({error:error.message})
    }
        
     
}





}

module.exports = reservationcontroller