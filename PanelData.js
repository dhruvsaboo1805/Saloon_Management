import booking from "./src/assets/booking.png";
import tot_booking from "./src/assets/booking2.png";
import sales from "./src/assets/sales.png";
import week_sales from "./src/assets/sales2.png";

const PanelData = [
    {
        id : "1",
        heading: "Today Booking",
        img : booking,
        panelinfo : 70,
    },
    {
        id : "2",
        heading: "Week Booking",
        img : tot_booking,
        panelinfo : 90,
    },
    {
        id : "3",
        heading: "Total Customer",
        img : sales,
        panelinfo : 100,
    },
    {
        id : "4",
        heading: "New Customer",
        img : week_sales,
        panelinfo : 120,
    }
]

export default PanelData;