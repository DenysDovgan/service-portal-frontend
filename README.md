# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Project Structure

```
.
├── app.vue
├── nuxt.config.ts
├── middleware/
│   ├── auth.global.ts         # Redirect if not logged in
│   └── role.ts                # Role-based route guards
│
├── layouts/
│   ├── default.vue            # App layout with sidebar, used after login
│   └── empty.vue              # Minimal layout for login
│
├── pages/
│   ├── login.vue              # Login screen
│   ├── dashboard.vue          # Role-based dashboard redirect
│   ├── account.vue            # My Account page
│   ├── issues/
│   │   ├── index.vue          # All issues (Manager/Admin), My issues (Client)
│   │   ├── [id].vue           # View issue detail + actions
│   │   └── create.vue         # New issue form (Client only)
│   ├── clients/
│   │   ├── index.vue          # List of clients (Manager/Admin)
│   │   └── add.vue            # Add new client (All except CLIENT)
│   └── technicians/
│       └── index.vue          # Technician list (Manager/Admin)
│
├── components/
│   ├── sidebar/               # Sidebar layout + links
│   ├── issue/                 # IssueCard.vue, IssueForm.vue, StatusBadge.vue
│   ├── media/                 # MediaUpload.vue, MediaPreview.vue
│   ├── form/                  # InputText.vue, Button.vue, Select.vue
│   └── shared/                # Header.vue, ConfirmDialog.vue, Toast.vue
│
├── composables/
│   ├── useAuth.ts             # Login, logout, auth store
│   ├── useIssues.ts           # CRUD for issues
│   ├── useUsers.ts            # Fetch clients/technicians
│   ├── useMedia.ts            # Upload/delete media
│   └── useRole.ts             # Role helpers for conditionals
│
├── stores/
│   └── auth.ts                # User data, JWT token, role
│
├── utils/
│   └── format.ts              # Format status, dates, sizes, etc.
│
├── assets/
│   └── css/
│       └── main.css           # Tailwind config / global styles
│
├── public/                    # Static images/icons
└── types/
    ├── dto.ts                 # DTOs from backend (IssueDto, UserDto, etc.)
    └── api.ts                 # API response types (ApiResponse<T>)
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

