"use strict"

//set the date displayed in the calander

var thisDay = new Date();

//write the calander to the elemnt with the ID calendar

document.getElementById("calendar").innerHTML = createCalendar(thisDay);

//function to generate the calendar table

function createCalendar(calDate) {
   var calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;

}

//function to write the calendar caption

function calCaption(calDate) {
   //monthName array contains the list of the month names
   var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   //Determine the current month of calDate
   var thisMonth = calDate.getMonth();
   //Determine the current year of calDate
   var thisYear = calDate.getFullYear();

   //Write the caption
   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";

}

//Function to wrtie a table row of weekday abbreviations
function calWeekdayRow() {
   //Array of weekday abbreviations
   var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI" , "SAT"];
   var rowHTML = "<tr>";

   //Loop through the dayName array
   for (var i = 0; i < dayName.length; i++){
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }

   rowHTML += "</tr>";
   return rowHTML;

}

//Function to calculate the number of days in the month
function daysInMonth(calDate) {
   //Array of the days in each month
   var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
   //Extract the four digit year and month value
   var thisYear = calDate.getFullYear();
   var thisMonth = calDate.getMonth();

   //Revise the days in February for leap years
   if (thisYear % 4 === 0) {
      if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) {
       dayCount[1] = 29;
      }
   }

   //Return the number of days for the current month
   return dayCount[thisMonth];
}

//Function to write table cells for each day of the month
function calDays(calDate) {
   //Determine the starting day of the month
   var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
   var weekDay = day.getDay(); //this shows day of week it falls on

   //Write blank cells preceding the starting day
   var htmlCode = "<tr>";
   for(var i = 0; i < weekDay; i++){
      htmlCode += "<td></td>";

   }

   //Write cells for each day of the month
   var totalDays = daysInMonth(calDate);
   //Stores current day in a new variable
   var highlightDay = calDate.getDate();

   for(var i = 1; i <= totalDays; i++){
      day.setDate(i);
      weekDay = day.getDay();
   //Check if the day of the week is now Sunday
      if(weekDay === 0) {
         htmlCode += "<tr>";
      }
      if(i === highlightDay){
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] + "</td>"; 
      }

      else{
         htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>"; 
   }
      //End the table row if we just wrote the cell for Saturday
      if (weekDay === 6) {
         htmlCode += "</tr>";
      }

   }

   return htmlCode;

}