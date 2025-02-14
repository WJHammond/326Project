# Application Data

## Overview
 
### 1. User Info

- **Description**: We are going to have a user profile system so, we have to store user login data and other info
- **Attributes**:
   - **userId**: A unique ID that is unique and can be used to differentiate between people with the same names
   - **location**: user's location
   - **phoneNumber**: Storing  user's phone numbers
   - **trailHistory**: User's trail history
   - **rating**: User's rating for each of their trails
   - **comments**: User's comments on the trails they have been to
   - **trailDuration**: records user's time on the trail
   - **trailDistance**: records the total distance traveled
   - **trailDate**: when the user went on the trail
   - **emergencyContacts first name**: User's emergency contacts first name in case of emergency
   - **emergencyContacts last name**: User's emergency contacts last name in case of emergency
   - **emergencyContacts email**: User's emergency contacts first name in case of emergency
- **Data Source**: User-Input 

### 2. Trails

- **Description**: Contains all the trails that are in the United States.
- **Attributes**:
    - **trailName**: The Name of the Trail
    - **requirements**: Gear that is required for this Trail
    - **approximateDuration**: Average time it takes to complete the Trail
    - **generalTips**: Message that hikers should abide by for their safety
    - **currentWeather**: Shows the current weather of the current trail

- **Data Source**: Data from third-party APIs (google place API)

### Weather

- **Description**: Contains the weather forecast for trails in the United States
- **Attributes**:
    - **date**: the current date
    - **weather**: the weather at the current date
- **Data Source**: Data from third-party APIs (openWeather API)

## Relationships Between Data 
- **UserProfile to Trails**: one user can have many trails. To add on to the user's Trail history they must consult Trails
- **Trails to weather**: each trail has one weather forecast. To get recommendations for gear Trails consults Weather to see what is appropriate to bring on a trail with said forecast

## Data Source
 - UserProfile is mostly user-input, but trail history is to be input by the user from the trails which is a third-party API.
 - Trails is data that was taken from a third-party API (google place API)
 - Weather is data that was taken from a third-part API (openWeather API)
