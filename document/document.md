# Gym Tracker - Fullstack Project Architecture & Plan

Tài liệu này định nghĩa cấu trúc, công nghệ và quy chuẩn cho dự án Gym Tracker. Mục tiêu là xây dựng một dự án Fullstack hoàn chỉnh, chuẩn mực để đưa vào CV, bao gồm đầy đủ CI/CD, Docker, cấu trúc file rõ ràng và type strict.

## 1. Công nghệ sử dụng (Tech Stack)

Dự án sử dụng kiến trúc **Monorepo** với NPM Workspaces.

### Frontend (`apps/web`)
- **Framework**: Next.js 14/15 (App Router).
- **Ngôn ngữ**: TypeScript (Strict mode).
- **Styling**: Vanilla CSS + CSS Modules (Đảm bảo tính linh hoạt và thiết kế UI/UX theo hướng hiện đại, responsive, không phụ thuộc framework ngoài trừ khi có yêu cầu).
- **Data Fetching/State**: React Query (@tanstack/react-query) & Zustand.
- **Form/Validation**: React Hook Form + Zod.

### Backend (`apps/api`)
- **Framework**: Node.js với Express.
- **Ngôn ngữ**: TypeScript.
- **Validation**: Zod (Dùng chung schema với frontend).
- **Database**: PostgreSQL.
- **ORM**: Prisma (Type-safe database client).
- **Authentication**: JWT (JSON Web Tokens) hoặc Session-based auth.

### Shared Packages (`packages/*`)
- `packages/shared`: Chứa Types, Zod Schemas dùng chung giữa frontend và backend.
- `packages/config`: Chứa cấu hình ESLint, Prettier, tsconfig chung.

## 2. Kiến trúc & Cấu trúc thư mục (Project Structure)

```text
gym-tracker/
├── apps/
│   ├── api/                 # Express Backend
│   │   ├── src/
│   │   │   ├── controllers/ # Xử lý logic API
│   │   │   ├── services/    # Xử lý business logic
│   │   │   ├── routes/      # Định nghĩa endpoints
│   │   │   ├── middlewares/ # Auth, Error handling, Logging
│   │   │   └── index.ts     # Entry point
│   │   └── Dockerfile
│   └── web/                 # Next.js Frontend
│       ├── src/
│       │   ├── app/         # Next.js App Router (Pages, Layouts)
│       │   ├── components/  # Reusable UI components
│       │   ├── lib/         # Utils, API clients (axios/fetch)
│       │   ├── hooks/       # Custom React hooks
│       │   └── styles/      # Global CSS, CSS Modules
│       └── Dockerfile
├── packages/
│   ├── shared/              # Common interfaces, DTOs, Zod schemas
│   └── config/              # ESLint, Prettier, TypeScript base configs
├── docker-compose.yml       # Local Dev (Postgres, Redis, Web, API)
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline cho GitHub Actions
└── package.json             # Root monorepo config
```

## 3. DevOps & CI/CD

### Docker
- **Local Development**: Sử dụng `docker-compose.yml` để dựng môi trường phát triển cục bộ bao gồm PostgreSQL database và có thể là Redis (nếu cần caching).
- **Productionization**: Cung cấp `Dockerfile` chuẩn cho cả `web` và `api` (multi-stage build để tối ưu kích thước image).

### CI/CD Pipeline (GitHub Actions)
Tạo pipeline `.github/workflows/ci.yml` tự động chạy trên mỗi Pull Request và commit vào nhánh `main`:
1. **Linting & Formatting**: Chạy ESLint và Prettier kiểm tra code.
2. **Type Checking**: Chạy `tsc --noEmit` trên toàn bộ monorepo.
3. **Testing**: Chạy Unit tests (nếu có).
4. **Build**: Đảm bảo cả `web` và `api` build thành công.
5. **Docker Build Test**: (Tùy chọn) Build thử Docker image để đảm bảo không lỗi khi deploy.

## 4. Coding Standards & Type Safety

- **Strict TypeScript**: Kích hoạt `strict: true` trong toàn bộ `tsconfig.json`. Không sử dụng `any`.
- **Schema Validation**: Dữ liệu từ API Request và Response phải được validate thông qua **Zod**.
- **Code Quality**: Áp dụng ESLint + Prettier.
- **Git Hooks**: Sử dụng `husky` và `lint-staged` để format và kiểm tra code tự động trước khi commit.

## 5. Kế hoạch triển khai (Phases)

**Phase 1: Setup cơ sở hạ tầng (Foundation)**
- [ ] Hoàn thiện setup monorepo cơ bản.
- [ ] Cấu hình ESLint, Prettier, Husky.
- [ ] Khởi tạo Prisma và cấu hình kết nối database cục bộ.
- [ ] Tạo `docker-compose.yml` cho Postgres.
- [ ] Cấu hình CI cơ bản với GitHub Actions.

**Phase 2: Backend Core & Shared Types**
- [ ] Setup Express + TypeScript boilerplate.
- [ ] Tạo package `shared` và chia sẻ Zod schema giữa hai apps.
- [ ] Xây dựng tính năng Authentication (Đăng ký, Đăng nhập, JWT).
- [ ] Viết API CRUD cơ bản cho Gym Tracker (Workouts, Exercises).

**Phase 3: Frontend Integration**
- [ ] Setup Next.js với CSS Modules và thiết kế UI chuẩn (Modern, Dynamic).
- [ ] Tích hợp React Query để gọi API và quản lý state.
- [ ] Xây dựng các trang: Auth, Dashboard, Workout Logging.

**Phase 4: Tối ưu & Dockerize**
- [ ] Viết Dockerfile cho Web và API.
- [ ] Hoàn thiện README để trình bày trên CV.

---
*Ghi chú: Vui lòng review tài liệu này và phản hồi nếu bạn đồng ý với cấu trúc và tech stack. Sau đó, chúng ta sẽ bắt đầu thực hiện Phase 1.*