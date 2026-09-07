# Backbonehub.in Workforce Portal

## Updated workforce rules
- Real username/password authentication backed by MongoDB users.
- No synthetic employee/intern/project/team/training/client records are seeded.
- The original prototype demo records are removed once on first startup; later records created by Admin are preserved.
- Employees and interns see only data belonging to their own account.
- Employees/interns can change their own password from **My Profile**.
- Admin can add, edit and remove employees/interns. Removing a person also revokes their login and removes their team/project associations.
- Admin can assign a project while creating a person and can manage project members later.
- Admin can create/delete projects and manage their members.
- Admin can create teams and add/remove people from teams.
- Employees/interns can see only their own team and can chat only with members of that team.
- Director has **People History** and **Clients & Projects**; the Director dashboard has been removed.
- Employee Reviews panel has been removed.

## System accounts
These are the only accounts created automatically:
- Admin: `admin` / `admin123`
- Director: `director` / `director123`

All employee/intern accounts must be created by Admin with a username and initial password.

## Run
1. Start MongoDB.
2. Configure `server/.env` from `server/.env.example`.
3. Install dependencies:
   - `npm install`
   - `npm --prefix client install`
   - `npm --prefix server install`
4. Run:
   - `npm run dev`
5. Open `http://localhost:5173` (or the Vite port shown in the terminal).

## Backend
- API: `http://localhost:5000`
- MongoDB default: `mongodb://127.0.0.1:27017/backbonehub`
- Authentication uses hashed passwords and in-memory session tokens for local development.
