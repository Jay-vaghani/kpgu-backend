const { sendEmail } = require("../utils/sendEmail");
const { google } = require("googleapis");

exports.AdmissionInquiry = async (req, res) => {
  const spreadsheetId = process.env.SPREADSHEET_ID;

  function formatDateIndianStyle(date) {
    const day = date.getDate().toString().padStart(2, "0"); // Get the day with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month with leading zero if needed
    const year = date.getFullYear(); // Get the full year
    const Hours = new Date().getHours().toString().padStart(2, "0"); //Get the Hours;
    const Minutes = new Date().getMinutes().toString().padStart(2, "0"); //Get the Minutes;
    const Seconds = new Date().getSeconds().toString().padStart(2, "0"); //Get the Seconds;

    return `${day}/${month}/${year}: ${Hours}:${Minutes}:${Seconds}`; // Return the date string in "d/m/yyyy" format with Hour Minutes And Seconds
  }

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  const formattedDate = formatDateIndianStyle(ISTTime);

  const auth = new google.auth.GoogleAuth({
    keyFile: "google-sheets-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance auth
  const client = await auth.getClient();

  // Instance of google sheets
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const {
    name,
    email,
    category,
    number,
    state,
    city,
    CourseAfterOption,
    CoursesAfterSelected,
  } = req.body;

  // Write vales in spreed sheets
  await googleSheets.spreadsheets.values
    .append({
      auth,
      spreadsheetId,
      range: "Admission Inquiry",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          [
            formattedDate,
            name.toUpperCase(),
            email.toLowerCase(),
            number,
            category.toUpperCase(),
            state.toUpperCase(),
            city.toUpperCase(),
            CourseAfterOption.toUpperCase(),
            CoursesAfterSelected.toUpperCase(),
          ],
        ],
      },
    })
    .then(async () => {
      try {
        await sendEmail({ ...req.body });
      } catch (error) {
        console.log(error);
      }
      return res.json({
        success: true,
        message: "Form Submitted Successfully",
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        error,
        message: "There Seems To be Some Problem Please Try Again Later",
      });
    });
};
