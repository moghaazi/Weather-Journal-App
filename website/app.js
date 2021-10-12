/* Global Variables */
let apiKey = "a74fcf20b8b5e4f895298e6625856363&units=imperial&"; // API Key
let date = document.getElementById("date"); // Date
let temp = document.getElementById("temp"); // Temp
let feelings = document.getElementById("content"); // Content
let generate = document.getElementById("generate"); // Generate

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Generat btn
generate.addEventListener("click", (e) => {
  // Prevent Default
  e.preventDefault();

  let zipCode = document.getElementById("zip").value; // Zip Code
  let feelings = document.getElementById("feelings").value; // Feelings

  try {
    if (!zipCode) {
      // Alert msg
      alert("Enter a zip code");
    } else {
      // URL
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;

      // Add data
      getData(url).then((data = {}) => {
        postData("/addData", {
          date: newDate,
          temp: data.main.temp,
          feelings: feelings,
        }).then(updateUI());
      });
    }
  } catch (error) {
    // Error
    console.log(`error: ${error}`);
  }
});

// GET Web API Data
async function getData(url) {
  // Error
  try {
    // Fetch data
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    // Error
    console.log(`error: ${error}`);
  }
}

// Post Data
async function postData(url = "", data = {}) {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    // New data
    const data = await res.json();
    return data;
  } catch (error) {
    // Error
    console.log(`error: ${error}`);
  }
}

// Update UI Data
async function updateUI() {
  // Get all
  const req = await fetch("/all");

  try {
    const projectData = await req.json();

    // Update Data
    date.innerHTML = `<img src="./Assets/calendar.png">${projectData.date}`;
    temp.innerHTML = `<img src="./Assets/rain.png">${projectData.temp}`;
    feelings.innerHTML = `<img src="./Assets/emotion.png">${projectData.feelings}`;
  } catch (error) {
    // Error
    console.log(`error: ${error}`);
  }
}
