## Setup Instructions using Docker

### Prerequisites
1. **Docker**: Ensure you have Docker installed on your machine. You can download and install Docker from [here](https://www.docker.com/products/docker-desktop).

### Steps to Run the Project

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/findAkash/madkudu-task
   ```

2. **Navigate to Project Directory**:
   ```bash
   cd madkudu-task
   ```

3. **Start Docker Containers with building**:
   ```bash
   docker-compose up --buid
   ```

4. **Access the Application**:
   - Once the containers are up and running, you can access the application:
     - Frontend: Open your browser and go to `http://localhost:3000`
        ```
        ### To access the dashboard user need to login

        email: akash@madkudu.com
        password: password
        ```
     - Backend: The backend API will be available at `http://localhost:8000/api/v1`

5. **Stopping the Application**:
   - To stop the Docker containers, press `Ctrl + C` in the terminal where the containers are running.

### Additional Notes
- Make sure ports `3000` and `8000` are not occupied by any other applications running on your machine.
