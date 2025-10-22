# Reportify

Reportify is a simple web application that generates downloadable Word reports (`.docx`) based on user input. It has a lightweight **C# backend** (ASP.NET API) and a **static frontend** built with HTML, CSS, and JavaScript.

---

---

## 🧩 Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** C# (.NET 8)

---

## ⚙️ Setup

### 1. Clone the Repository
```bash
git clone https://github.com/a-deola/reportify.git
cd reportify
```
### 2. Backend Setup
```bash
cd server
dotnet restore
dotnet run
```
Server runs at: http://localhost:8080

## 🧾 API Endpoint

```bash
POST /api/generate-report
```
Request Body:
```json
{
  "ReportType": "P&L",
  "ClientNameOrID": "Client123"
}
```
Response: A downloadable .docx file

### 📸 Demo Links

- **Frontend (UI):** [https://reportify-ui.netlify.app](https://reportify-ui.netlify.app)  
- **Backend (API):** [https://reportify-api.onrender.com](https://reportify-api.onrender.com)
