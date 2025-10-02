# BusSiM - Bus Simulation System 🚌

A comprehensive REST API for managing bus operations, routes, stops, and real-time bus tracking. Built with Node.js, Express, and MongoDB, this system simulates a complete bus transportation network with dynamic location updates and trip management.

# Student Information

- **Student Id** - YR4COBSCCOMP232P-016

## 🌟 Features

- **Real-time Bus Tracking**: Dynamic location updates based on scheduled trips
- **Route Management**: Complete route system with stops and distances
- **Trip Scheduling**: Automated trip generation and status tracking
- **Bus Fleet Management**: CRUD operations for bus fleet
- **Data Validation**: Comprehensive input validation using Joi
- **Auto-seeding**: Automatic data population on startup
- **Location Simulation**: Realistic bus movement simulation

## 🏗️ Architecture

### Core Models

- **Bus**: Fleet management with registration, operator, route, and location data
- **Route**: Transportation routes with origin, destination, stops, and distance
- **Stop**: Bus stops with GPS coordinates
- **Trip**: Scheduled trips with departure/arrival times and status tracking

### API Endpoints

#### Buses (`/api/buses`)

- `GET /` - Get all buses (with optional route filter)
- `GET /:id` - Get bus by ID
- `POST /` - Create new bus
- `PUT /:id` - Update bus
- `DELETE /:id` - Delete bus

#### Routes (`/api/routes`)

- `GET /` - Get all routes
- `GET /:id` - Get route by ID
- `POST /` - Create new route
- `PUT /:id` - Update route
- `DELETE /:id` - Delete route

#### Stops (`/api/stops`)

- `GET /` - Get all stops
- `GET /:id` - Get stop by ID
- `POST /` - Create new stop
- `PUT /:id` - Update stop
- `DELETE /:id` - Delete stop

#### Trips (`/api/trips`)

- `GET /` - Get all trips
- `GET /:id` - Get trip by ID
- `POST /` - Create new trip
- `PUT /:id` - Update trip
- `DELETE /:id` - Delete trip

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BusSiM
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/bussim
   PORT=3000
   ```

4. **Start the application**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   node index.js
   ```

The server will start on `http://localhost:3000` (or your specified PORT).

### Database Setup

The application automatically:

- Connects to MongoDB
- Seeds initial data (stops, routes, buses)
- Generates trip schedules
- Updates bus locations dynamically

## 📊 Data Models

### Bus Schema

```javascript
{
  regNo: String,        // Format: "XX-1234"
  operator: String,     // Bus operator name
  routeCode: String,    // Associated route code
  status: String,       // "on-duty", "off-duty", "maintenance"
  location: {
    lat: Number,       // Latitude
    lon: Number,        // Longitude
    updatedAt: Date     // Last location update
  }
}
```

### Route Schema

```javascript
{
  _id: String,          // Route code (e.g., "01", "02")
  origin: String,       // Starting point
  destination: String,  // End point
  distanceKm: Number,   // Route distance
  stops: [ObjectId]     // Array of stop references
}
```

### Trip Schema

```javascript
{
  routeId: String,      // Route reference
  busRegNo: String,     // Bus registration
  departureTime: Number, // Minutes since midnight
  arrivalTime: Number,   // Minutes since midnight
  date: String,         // "YYYY-MM-DD" format
  status: String        // "scheduled", "ongoing", "completed", "cancelled"
}
```

## 🔧 API Usage Examples

### Get All Buses

```bash
GET /api/buses
```

### Get Buses by Route

```bash
GET /api/buses?route=01
```

### Create a New Bus

```bash
POST /api/buses
Content-Type: application/json

{
  "regNo": "AB-1234",
  "operator": "City Transport",
  "routeCode": "01",
  "status": "on-duty",
  "location": {
    "lat": 6.9271,
    "lon": 79.8612
  }
}
```

### Update Bus Location

```bash
PUT /api/buses/:id
Content-Type: application/json

{
  "location": {
    "lat": 6.9280,
    "lon": 79.8620,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## 🎯 Key Features Explained

### Real-time Location Updates

The system includes an intelligent location update mechanism that:

- Simulates bus movement based on scheduled trips
- Updates locations to random stops along the route during active trips
- Maintains realistic positioning between trips
- Tracks trip status (scheduled → ongoing → completed)

### Data Seeding

Automatic data population includes:

- **Stops**: Predefined bus stops with GPS coordinates
- **Routes**: Transportation routes with stop sequences
- **Buses**: Fleet of buses assigned to different routes
- **Trips**: Generated trip schedules for the current day

### Validation

Comprehensive input validation using Joi schemas:

- Bus registration format validation (XX-1234)
- Required field validation
- Data type validation
- Enum value validation for status fields

## 🛠️ Development

### Project Structure

```
BusSiM/
├── constants/          # Static data files
│   ├── buses.json
│   ├── routes.json
│   ├── stops.json
│   └── trips.json
├── controllers/        # Route handlers
├── models/            # Mongoose schemas
├── routes/            # Express routes
├── utils/              # Helper functions
│   ├── helpers/       # Utility functions
│   └── seeders/       # Data seeding scripts
├── validations/       # Joi validation schemas
└── index.js           # Application entry point
```

### Adding New Features

1. Create model in `models/`
2. Add validation in `validations/`
3. Implement controller in `controllers/`
4. Define routes in `routes/`
5. Update main `index.js` with new routes

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 📝 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**BusSiM** - Simulating the future of public transportation! 🚌✨
