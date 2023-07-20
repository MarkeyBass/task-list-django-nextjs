
# Task List App

This is a TODO-list web application that allows users to create, modify, reorder, and mark tasks as done. 
The app is built with Python Django as the backend, Next.js as the frontend, and uses SQLite as the database.

The app includes a change list feature that allows users to track changes between the database state and the current UI state. 
Note that this feature is still under development and will be improved in future updates.

When creating new task, it won't be added to the change list. The created task will be stored in the db first. 


## Run app on windows & Linux

* Before starting, please ensure you have Python 3.8 (or above), pip, venv, nodejs and npm installed on your system.

### Server Setup


1. From the root of the project, navigate to the "server" directory:

```bash 
cd server 
```

2. Create a new virtual environment:

  Windows:

```bash   
python -m venv venv 
```

  Linux:

```bash 
python3 -m venv venv 
```

3. Activate the virtual environment:
   
  Windows:
  
```bash 
source venv/Scripts/activate
```

Linux:

```bash
source venv/bin/activate 
```

4. Install the required dependencies:
  
```bash
pip install -r requirements.txt
```

5. Start backend: 
  
```bash
python manage.py runserver 
```
  
  The server will be available at http://localhost:8000

### Client Setup

6. From the root of the project, navigate to the "client" directory:
   
```bash
cd client
```

7. Install the required dependencies:

```bash
npm install
```

8. Run the client app:
   
```bash
npm run dev
```

The client app will be available at http://localhost:3000
