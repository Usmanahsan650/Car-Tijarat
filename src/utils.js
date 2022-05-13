export const Crouselitems= [
    {
      src:'./slide1.jpg',
      caption: 'Sell for best price in karachi using the competitive auction enviroment',
      header: 'Sell Your Car'
    },
    {
        src:'./slide2.jpg',
        caption: 'Paricipate in auctions and put your price without hassel of negotiatoin',
      header: 'Make Bids'
    },
    {
      src: './slide3.jpg',
      caption: 'Choose certifed used car certified by our mechanic',
      header: 'Certified Cars'
    }
  ];

export function timeConvert(date){ // convert 24 hours format to 12 hours
  var dt = new Date(date);

  var hours = dt.getHours(); // gives the value in 24 hours format
  var AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12) || 12;

  var finalTime = dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear() + " " + hours + ":" + dt.getMinutes() + ":" + dt.getSeconds() + " " + AmOrPm; 
  return finalTime;
}

export function compareDates(start, end){
  const dateToday = new Date();

  const startDate = new Date(start);
  const endDate = new Date(end);

  if(dateToday < startDate){
    //console.log(dateToday, startDate, "Not Started");
    //console.log("Time left: ", (startDate.getTime() - dateToday.getTime())/(1000*60*60*24));
    return -1; 
  }
  else if(dateToday > endDate){
    //console.log(dateToday, endDate, "Auction Ended");
    return 1;
  }
  else if(dateToday >= startDate && dateToday <= endDate){
    //console.log(dateToday, startDate, endDate, "In Progress");
    return 0;
  }
}