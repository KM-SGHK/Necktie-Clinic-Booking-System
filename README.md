# 1. Deliverable

Please click on [Necktie](https://km-necktie-project.herokuapp.com/)

# 2. UI/UX Flow

<img src="https://res.cloudinary.com/dpaehurgb/image/upload/v1655869514/202206-Business_Logic_Flow.drawio_ltjw22.png" alt="UI/UX Flow" style="height: 700px; width:700px; margin-bottom: 15px"/>

# 3. Architecture

<img src="https://res.cloudinary.com/dpaehurgb/image/upload/v1655871224/React_Components_1_ceayu2.png" alt="UI/UX Flow" style="height: 400px; width:700px; margin-bottom: 15px"/>

# 4. Key Packages

|   Packages	|   Pros	|   Cons	|
|---	|---	|---	|
|   `Redux`	|   Scalable state management	|   Relatively complex syntax	|
|   `Material UI`	|   Features cover a lot of frontend use-cases. `Data-grid` is particularly useful for presenting data	|   	|
|   `React Calendar`	|  Easy to extract selected date data 	|   Not as easy to screen out dates as `React-datetime`	| 
|   `React-Toastify`	|  Notifications are more lively than those from Snackbar of Material Design	|  	| 

# 5. Design Rationale

|  Rationale	|   Note	|
|---	|---	|
|   Minimalism	|   Neat UI/UX Flow	|
|   Easy to use	|   Both scheduled and new bookings UI are put on the same page, for easy tracking	| 

# 6. Feature Summary

|   Page	|   Section	|   Feature(s)	|
|---	|---	|---	|
|   Landing	|   n/a	|   * easy login through entering client name	|
|   Booking	|   New Appointments	|   * access to doctors' profile <br/> * overview doctors' locations & working days <br/> * select doctors' available timeslots for booking <br/> * past dates & booked timeslots are disabled <br/> * doctors' names are sorted in ascending alphabetical order	|
|   Booking	|  Scheduled Bookings 	|   * overview scheduled bookings details <br/> * cancel selected booking <br/> * only confirmed bookings linked to the logged-in client are shown <br/> * bookings are sorted in ascending date order <br/> * users can manually sort all columns	| 

# 7. Selected Testing Cases

#### NOTE: `Cypress` can be the testing tool

* Enter user name `Ink Lee`
* At `Scheduled Bookings`, he should have got 9 Bookings (out of 37 `booking` records fetched from server side)
* At `New Appointments`, for example, for `Dr. Shum Chi Kin`, timeslot `2022-09-15 [12:30]` should have been disabled, since it's been booked by the client `Ink Lee` 
* At `New Appointments`, while selecting past dates on the calendar, a red notification would pop up telling the client not to do so. 
* For successful bookings and cancellation at `New Apppointments` & `Scheduled Bookings`, a green notification would pop up informing the client.

# 8. Future Enhancement

|  Area	|   Details	|
|---	|---	|
|   UI/UX	|   * layout adjustment when multiple table collapsed parts are unfolded <br/> * mobile responsiveness <br/> * proper log-in mechanism should be put in place	|
|   Logic	|   * limit the maximum number of bookings on the same doctor's schedule from the client, for the sake of fairness to other patients <br/> * non-booking-related unavailability data should be included in the api `GET/doctor` <br/> * client should be reminded in better manner on their forthcoming booking	|

# 9. Run the Repo locally

* `yarn install`
* `yarn start`
* Browse the app via `localhost:8080`



