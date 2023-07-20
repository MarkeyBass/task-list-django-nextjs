
# Task List App

This is a TODO-list web application that allows users to create, modify, reorder, and mark tasks as done. 
The app is built with Python Django as the backend, Next.js as the frontend, and uses SQLite as the database.

The app includes a change list feature that allows users to track changes between the database state and the current UI state. 
Note that this feature is still under development and will be improved in future updates.

When creating new task, it won't be added to the change list. The created task will be stored in the db first. 


## Run app on windows

### Server Setup

1. Before starting, please ensure you have Python 3, pip, nodejs and npm installed on your system.

2. From the root of the project, navigate to the "server" directory:

    ```cd server```

3. Create a new virtual environment:
  
    ```python -m venv venv``` 

4. Activate the virtual environment:
  
    ```source venv/Scripts/activate```

5. Install the required dependencies:
  
    ```pip install -r requirements.txt```

6. Start backend: 
  
    ``` python manage.py runserver ```
  
  The server will be available at http://localhost:8000

## Client Setup

7. From the root of the project, navigate to the "client" directory:
   
    ```cd client```

8. Install the required dependencies:

    ```npm install```

9. Run the client app:
   
    ```npm run dev```


The client app will be available at http://localhost:3000
