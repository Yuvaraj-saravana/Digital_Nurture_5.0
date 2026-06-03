// main.js - JS logic for filtering, search, and form submission
console.log("Community portal script is ready.");

/* 
Quick note on modern JS frameworks like React/Vue:
In vanilla JS, we have to do document.querySelector and createElement manually to update the page.
If we used React or Vue, the UI would update automatically when the data changes (reactive state).
This makes vanilla JS fine for simple pages, but frameworks are way better for scaling up.
*/

// Creating a basic class to represent our event structure
class Event {
    constructor(id, title, category, date, location, seatsLeft = 10) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.date = date;
        this.location = location;
        this.seatsLeft = seatsLeft; // Default seats is 10 if not provided
    }
}

// Prototype function to check if tickets are still available
Event.prototype.checkAvailability = function() {
    if (this.seatsLeft > 0) {
        return true;
    } else {
        return false;
    }
};

// Local database of events
const eventsArray = [];

function addEvent(eventObj) {
    eventsArray.push(eventObj);
}

// Add some sample events to start with
addEvent(new Event(1, "Beginner Watercolor Workshop", "Art", "2026-06-15", "Room A, Community Center", 8));
addEvent(new Event(2, "Neighborhood Cleanup & Picnic", "Volunteer", "2026-06-20", "Central Park Main Gates", 15));
addEvent(new Event(3, "Cooking Healthy on a Budget", "Education", "2026-06-25", "Kitchen Annex", 0)); // Sold out event
addEvent(new Event(4, "Outdoor Movie Night: Toy Story", "Social", "2026-07-02", "Central Park Lawn", 30));
addEvent(new Event(5, "Digital Literacy for Seniors", "Education", "2026-07-10", "Computer Lab Room 102", 5));

// Closure function to keep track of registrations without using global variables
function makeRegistrationCounter() {
    let count = 0; // Private count variable
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}
const regCounter = makeRegistrationCounter();

// Simple callback filter function
function filterEventsCustom(events, filterCallback) {
    return events.filter(filterCallback);
}

// Category filter handler
function filterEventsByCategory(category) {
    let filteredEvents;
    if (category === "All") {
        filteredEvents = eventsArray;
    } else {
        // Use custom callback to do the filtering
        filteredEvents = filterEventsCustom(eventsArray, function(eventItem) {
            return eventItem.category === category;
        });
    }
    
    // Render the matching cards
    renderEventCards(filteredEvents);
}

// Register user for event logic
function registerUser(eventId) {
    const eventObj = eventsArray.find(ev => ev.id === eventId);
    
    if (eventObj) {
        if (eventObj.checkAvailability()) {
            eventObj.seatsLeft--; // Reduce available seats by 1
            
            const totalReg = regCounter.increment(); // Update registration count
            
            alert(`Success! You have registered for: ${eventObj.title}\nTotal registrations registered: ${totalReg}`);
            
            // Update counter message on screen
            const counterDisplay = document.getElementById("counterDisplay");
            if (counterDisplay) {
                counterDisplay.innerText = `Total registrations submitted during this session: ${totalReg}`;
            }
            
            // Re-render event cards to show new seat counts
            renderEventCards(eventsArray);
        } else {
            alert(`Sorry, the event "${eventObj.title}" is already sold out!`);
        }
    } else {
        console.error("Event ID not found in database.");
    }
}

// Render cards dynamically using DOM manipulation
function renderEventCards(eventsToDisplay) {
    const container = document.querySelector("#eventsContainer");
    if (!container) return;
    
    container.innerHTML = ""; // Clear existing cards
    
    // Quick debug check to see what titles are being loaded
    const titlesList = eventsToDisplay.map(e => e.title);
    console.log("Displaying titles: ", titlesList);

    // Build cards for each event
    eventsToDisplay.forEach(event => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "event-card";
        
        const isAvailable = event.checkAvailability();
        const availabilityText = isAvailable ? `${event.seatsLeft} seats left` : "SOLD OUT";
        const availabilityClass = isAvailable ? "available" : "sold-out";
        
        // Dynamic HTML card structure
        cardDiv.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Status:</strong> <span class="highlight ${availabilityClass}">${availabilityText}</span></p>
        `;
        
        // Add register button only if there are seats left
        if (isAvailable) {
            const regBtn = document.createElement("button");
            regBtn.className = "btn";
            regBtn.innerText = "Register";
            regBtn.style.marginTop = "10px";
            
            regBtn.onclick = function() {
                registerUser(event.id);
            };
            
            cardDiv.appendChild(regBtn);
        }
        
        container.appendChild(cardDiv);
    });
}

// Fill form dropdown menu with active events
function populateFormDropdown() {
    const selectElem = document.querySelector("#regEvent");
    if (!selectElem) return;
    
    selectElem.innerHTML = `<option value="">-- Choose an Event --</option>`;
    
    eventsArray.forEach(event => {
        const opt = document.createElement("option");
        opt.value = event.id;
        opt.innerText = `${event.title} (${event.category})`;
        selectElem.appendChild(opt);
    });
}

// Basic Promise to check if user entered "spam" or "admin" as name
function checkNameSpamPromise(name) {
    return new Promise((resolve, reject) => {
        const normalized = name.toLowerCase();
        if (normalized === "spam" || normalized === "admin") {
            reject("This name is flagged as spam. Please enter a valid name.");
        } else {
            resolve("Name is clear.");
        }
    });
}

// Async registration submission handler
async function processRegistrationSubmission(registrationData) {
    const statusDiv = document.getElementById("formStatus");
    statusDiv.style.color = "#4f46e5";
    statusDiv.innerText = "Validating entry with server simulation...";

    try {
        // Run the spam check promise
        const spamCheckResult = await checkNameSpamPromise(registrationData.fullName);
        console.log(`Spam check status: ${spamCheckResult}`);
        
        statusDiv.innerText = "Submitting registration payload...";
        
        // Simulating 1.5s network lag
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Fetch to post data to a dummy API
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify(registrationData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });
        
        if (!response.ok) {
            throw new Error("Server responded with a connection error.");
        }
        
        const data = await response.json();
        console.log("Server response:", data);
        
        // Show success status
        statusDiv.style.color = "#16a34a";
        statusDiv.innerText = `Registration successful! Mock Server ID: ${data.id}`;
        
        // Trigger registration update locally
        registerUser(parseInt(registrationData.eventId));
        
        // Clear input fields
        document.getElementById("regForm").reset();
        
    } catch (error) {
        statusDiv.style.color = "#ef4444";
        statusDiv.innerText = `Error: ${error.message || error}`;
    }
}

// Run setup when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
    // Render initial page elements
    renderEventCards(eventsArray);
    populateFormDropdown();
    
    // Log structural properties using Object.entries
    if (eventsArray.length > 0) {
        console.log("Checking object properties:");
        for (const [key, value] of Object.entries(eventsArray[0])) {
            console.log(`Property -> Key: ${key}, Value: ${value}`);
        }
    }

    // Category filter drop-down handler
    const filterSelect = document.querySelector("#categoryFilter");
    if (filterSelect) {
        filterSelect.onchange = function(e) {
            filterEventsByCategory(e.target.value);
        };
    }

    // Search bar keydown event with a tiny debounce delay
    const searchInput = document.querySelector("#searchInput");
    if (searchInput) {
        searchInput.onkeydown = function(e) {
            setTimeout(() => {
                const queryText = searchInput.value.toLowerCase();
                const matchedEvents = eventsArray.filter(eventObj => {
                    return eventObj.title.toLowerCase().includes(queryText);
                });
                renderEventCards(matchedEvents);
            }, 50);
        };
    }

    // Handle form validation and submission
    const regForm = document.getElementById("regForm");
    if (regForm) {
        regForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Stop page reload
            
            const formElements = regForm.elements;
            const fullName = formElements["fullName"].value.trim();
            const emailAddress = formElements["emailAddress"].value.trim();
            const eventId = formElements["selectedEvent"].value;
            
            let hasErrors = false;
            
            // Name check
            const nameError = document.getElementById("nameError");
            if (fullName === "") {
                nameError.innerText = "Full Name is required.";
                hasErrors = true;
            } else {
                nameError.innerText = "";
            }
            
            // Email check using regex pattern
            const emailError = document.getElementById("emailError");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailAddress === "") {
                emailError.innerText = "Email address is required.";
                hasErrors = true;
            } else if (!emailRegex.test(emailAddress)) {
                emailError.innerText = "Please enter a valid email format.";
                hasErrors = true;
            } else {
                emailError.innerText = "";
            }
            
            // Event check
            const eventError = document.getElementById("eventError");
            if (eventId === "") {
                eventError.innerText = "Please choose a community event.";
                hasErrors = true;
            } else {
                eventError.innerText = "";
            }
            
            if (hasErrors) {
                console.log("Validation check failed.");
                return;
            }
            
            // Bundle data using spread operator
            const basicData = { fullName, emailAddress };
            const registrationData = { ...basicData, eventId, timestamp: new Date().toISOString() };
            
            // Send payload to simulated server
            processRegistrationSubmission(registrationData);
        });
    }

    // jQuery click handlers to toggle hidden boxes and show differences
    
    // Visibility toggle (takes layout space)
    $("#btnToggleVis").click(function() {
        const box = $("#visBox");
        if (box.css("visibility") === "hidden") {
            box.css("visibility", "visible").hide().fadeIn(400);
        } else {
            box.fadeOut(400, function() {
                box.css("visibility", "hidden").show();
            });
        }
    });

    // Display toggle (does not take layout space)
    $("#btnToggleDisp").click(function() {
        const box = $("#dispBox");
        if (box.is(":visible")) {
            box.fadeOut(300);
        } else {
            box.fadeIn(300);
        }
    });
});
