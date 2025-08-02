
# 🚗 Travel Dashboard Project

A full-stack travel logging admin dashboard built with **React.js (frontend)** and **Django REST Framework (backend)**. Users can register, log in, submit travel details, and view admin visualizations of data.

---

## 🌐 Live Demo

- **Frontend on Netlify:** [https://gleeful-tarsier-f66fb5.netlify.app](https://gleeful-tarsier-f66fb5.netlify.app)
- **GitHub Repository:** [https://github.com/Obulesh44/travel-dashboard-project](https://github.com/Obulesh44/travel-dashboard-project)

---

## 🧱 Project Structure

```
travel-dashboard-project/
├── backend/               # Django backend
│   ├── manage.py
│   ├── travel/            # Core app
│   ├── db.sqlite3
│   └── ...settings, urls, etc.
├── frontend/              # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md              # This file
```

---

## 🔒 Features

- User registration & login (JWT authentication)
- Submit travel logs: source, destination, distance, petrol used
- Admin dashboard: list of all user submissions + visualizations (charts)
- Token-based security for backend API access
- Responsive UI built using React + custom styling

---

## 🚀 Getting Started Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Obulesh44/travel-dashboard-project.git
cd travel-dashboard-project
```

---

### 2. 📦 Setup Backend (Django)

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate  # On Windows
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

- The backend runs at `http://localhost:8000`
- API base URL: `http://localhost:8000/api/`

---

### 3. ⚛️ Setup Frontend (React)

```bash
cd ../frontend
npm install
npm start
```

- React app will run on `http://localhost:3000`
- Make sure `axios` base URL points to your backend in development:
  ```js
  axios.post('http://localhost:8000/api/login/', data);
  ```

---

## 🧪 API Endpoints (Summary)

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/register/`      | Register new user        |
| POST   | `/api/login/`         | JWT login                |
| POST   | `/api/travel/submit/` | Submit travel data       |
| GET    | `/api/user/travel/`   | Get user's travel data   |
| GET    | `/api/admin/dashboard/` | Admin view of all data |

---

## 🔐 Auth

- Uses **JWT Authentication** (via `Simple JWT`)
- Tokens stored in browser `localStorage`
- Protected endpoints require the `Authorization: Bearer <access_token>` header

---

## 📊 Technologies Used

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Django
- Django REST Framework
- Simple JWT
- drf-spectacular (Swagger docs)

---

## 📁 Deployment

- **Frontend** deployed via [Netlify](https://netlify.com)
- **Backend** can be deployed via [Render](https://render.com), [Railway](https://railway.app), or VPS
- `.env` files should store secrets for production

---

## 👤 Author

- **Name:** Obulesh Boya
- **Email:** obuleshvalmiki417@gmail.com
- **GitHub:** [Obulesh44](https://github.com/Obulesh44)

---

## 📌 License

This project is open-source and available under the [MIT License](LICENSE).
