# techdegree-project-5
 Public API Request

This project focuses on fetching data from an api and dynamically displaying the content to the user.

Usage
This app fetchs data from randomuser.me api and returns fake user data. The data is converted to a JSON object which is then stored in an array. Content is extracted by iterating through the array object at each index and appends it to the DOM utilizing template literals. 

When an employee card is clicked, a modal is displayed which allows the user to move forward or backward through the employee gallery. This is done through a helper function which identifies which card has been selected, followed by a callback function to populate the modal.
